import { GoogleGenAI } from '@google/genai';
import { InterestCategory, VoiceStyle, Tour, TourSection, Waypoint, AgentStepStatus } from '../types.ts';
import { calculateTimeAllocation, calculateWordBudget } from '../agents/planner.ts';
import { AGENT_INSTRUCTIONS, SYSTEM_PERSONAS } from '../agents/prompts.ts';
import { assembleTour, cleanSpokenParagraphs, countWords, SectionInput } from '../agents/parser.ts';

export interface GenerateTourParams {
  location: string;
  interests: InterestCategory[];
  durationMinutes: number;
  voiceStyle: VoiceStyle;
  userId?: string;
  onStepProgress?: (step: AgentStepStatus) => void;
}

export async function generateTourWithAgents(params: {
  location: string;
  interests: InterestCategory[];
  durationMinutes: number;
  voiceStyle: VoiceStyle;
  userId?: string;
  apiKey?: string;
  onStepProgress?: (step: AgentStepStatus) => void;
}): Promise<Tour> {
  const { location, durationMinutes, voiceStyle, userId, apiKey, onStepProgress } = params;
  const activeInterests = params.interests.length > 0 
    ? params.interests 
    : (['History', 'Architecture', 'Culture', 'Culinary'] as InterestCategory[]);

  const report = (id: string, name: string, role: string, status: AgentStepStatus['status'], message: string, preview?: string) => {
    if (onStepProgress) {
      onStepProgress({
        id,
        name,
        role,
        status,
        message,
        timestamp: Date.now(),
        outputPreview: preview,
      });
    }
  };

  // Step 1: Planner Agent
  report('step-planner', 'PlannerAgent', 'Time & Resource Allocator', 'running', `Analyzing "${location}" and allocating ${durationMinutes} minutes...`);
  
  const timeAllocation = calculateTimeAllocation(durationMinutes, activeInterests);
  const wordBudget = calculateWordBudget(durationMinutes, activeInterests);
  
  await delay(600);
  report('step-planner', 'PlannerAgent', 'Time & Resource Allocator', 'completed', 
    `Plan complete: ${wordBudget.totalWords} words budgeted across ${activeInterests.length} domains.`,
    `Intro: ${timeAllocation.introduction}m | Content: ${durationMinutes - timeAllocation.introduction - timeAllocation.conclusion}m | Outro: ${timeAllocation.conclusion}m`
  );

  const sectionsData: SectionInput[] = [];
  const waypoints: Waypoint[] = [];
  let waypointCounter = 1;

  // Add intro waypoint
  waypoints.push({
    id: `wp-${Date.now()}-1`,
    name: `${location} - Orientation Point`,
    category: 'Overview',
    description: `Starting orientation and journey outline for ${location}.`,
    stepNumber: waypointCounter++,
  });

  // Check if Gemini API Key is configured
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;
  const ai = effectiveKey ? new GoogleGenAI({ apiKey: effectiveKey }) : null;

  // Step 2: Specialist Agents Execution
  for (const category of activeInterests) {
    const agentName = `${category}Agent`;
    const targetWords = wordBudget.sectionWords[category.toLowerCase()] || Math.round(durationMinutes * 30);
    const stepId = `step-${category.toLowerCase()}`;

    report(stepId, agentName, `${category} Specialist`, 'running', `Generating conversational ${category.toLowerCase()} audio narration (~${targetWords} words)...`);

    let content = '';

    if (ai) {
      try {
        const prompt = AGENT_INSTRUCTIONS[category](location, targetWords, voiceStyle);
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        content = response.text || '';
      } catch (err) {
        console.warn(`[Agent ${agentName}] Gemini call failed, falling back to procedural generation:`, err);
        content = generateProceduralContent(location, category, targetWords, voiceStyle);
      }
    } else {
      await delay(700);
      content = generateProceduralContent(location, category, targetWords, voiceStyle);
    }

    const paragraphs = cleanSpokenParagraphs(content);
    const actualWords = countWords(content);
    
    sectionsData.push({
      category,
      agentName,
      title: `${category} of ${location}`,
      content: paragraphs.join('\n\n'),
      durationMinutes: parseFloat((actualWords / 150).toFixed(1)),
    });

    waypoints.push({
      id: `wp-${Date.now()}-${waypointCounter}`,
      name: `${location} ${category} Landmark`,
      category,
      description: `Key site highlighting ${category.toLowerCase()} heritage of ${location}.`,
      stepNumber: waypointCounter++,
    });

    report(stepId, agentName, `${category} Specialist`, 'completed', 
      `Generated ${actualWords} words for ${category}.`,
      paragraphs[0]?.slice(0, 140) + '...'
    );
  }

  // Step 3: Orchestrator Agent
  report('step-orchestrator', 'OrchestratorAgent', 'Lead Tour Guide & Director', 'running', 'Synthesizing introductions, narrative transitions, and concluding reflection...');

  let introContent = '';
  let outroContent = '';
  let tourTitle = `Walking Through Time: The Definitive Guide to ${location}`;
  let tourSummary = `An immersive self-guided audio tour exploring ${location} through its ${activeInterests.join(', ').toLowerCase()}.`;

  if (ai) {
    try {
      const orchestratorPrompt = AGENT_INSTRUCTIONS.Orchestrator(
        location,
        activeInterests,
        durationMinutes,
        voiceStyle,
        wordBudget.sectionWords.introduction,
        wordBudget.sectionWords.conclusion
      );

      const orchResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: orchestratorPrompt,
      });

      const responseText = orchResponse.text || '';
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.title) tourTitle = parsed.title;
        if (parsed.summary) tourSummary = parsed.summary;
        if (parsed.introduction) introContent = parsed.introduction;
        if (parsed.conclusion) outroContent = parsed.conclusion;
      } else {
        introContent = `Welcome to our personalized exploration of ${location}. Let's begin our journey.`;
        outroContent = `Thank you for exploring ${location} with us. May the stories of this place stay with you.`;
      }
    } catch (err) {
      console.warn('[OrchestratorAgent] Fallback to procedural orchestration:', err);
      introContent = getProceduralIntro(location, activeInterests, voiceStyle);
      outroContent = getProceduralOutro(location, voiceStyle);
    }
  } else {
    await delay(700);
    introContent = getProceduralIntro(location, activeInterests, voiceStyle);
    outroContent = getProceduralOutro(location, voiceStyle);
  }

  // Prepend Introduction and Append Conclusion
  const finalSections: SectionInput[] = [
    {
      category: 'Introduction',
      agentName: 'OrchestratorAgent',
      title: `Welcome to ${location}`,
      content: introContent,
      durationMinutes: timeAllocation.introduction,
    },
    ...sectionsData,
    {
      category: 'Conclusion',
      agentName: 'OrchestratorAgent',
      title: `Reflections on ${location}`,
      content: outroContent,
      durationMinutes: timeAllocation.conclusion,
    }
  ];

  // Add final waypoint
  waypoints.push({
    id: `wp-${Date.now()}-${waypointCounter}`,
    name: `${location} - Final Scenic Vista`,
    category: 'Wrap-up',
    description: `Closing viewpoint and quiet reflection spot overlooking ${location}.`,
    stepNumber: waypointCounter,
  });

  const tourId = `tour-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const assembled = assembleTour({
    id: tourId,
    title: tourTitle,
    location,
    summary: tourSummary,
    durationMinutes,
    interests: activeInterests,
    voiceStyle,
    sectionsData: finalSections,
    waypoints,
    userId,
  });

  report('step-orchestrator', 'OrchestratorAgent', 'Lead Tour Guide & Director', 'completed', 
    `Tour assembled successfully with ${assembled.sections.length} audio chapters!`,
    `Total duration ~${assembled.durationMinutes} min (${assembled.audioDurationSeconds}s audio)`
  );

  return assembled;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getProceduralIntro(location: string, interests: InterestCategory[], voiceStyle: VoiceStyle): string {
  const personaIntro = voiceStyle === 'Enthusiastic & Energetic'
    ? `Welcome! Take a deep breath and open your senses—we are standing right here in ${location}, one of the most electric, storied places in the world!`
    : voiceStyle === 'Professional & Detailed'
    ? `Welcome to ${location}. Today we undertake a structured architectural and cultural examination of this historic urban enclave.`
    : `Welcome to ${location}! It’s fantastic to be here walking with you today.`;

  return `${personaIntro} Over the course of our tour, we’re going to weave together stories of ${interests.join(' and ')}. Look around you—every doorway, street corner, and weathered brick holds memories waiting to be unlocked. Let's step forward together.`;
}

function getProceduralOutro(location: string, voiceStyle: VoiceStyle): string {
  if (voiceStyle === 'Enthusiastic & Energetic') {
    return `What an unforgettable adventure here in ${location}! As you take in this final panoramic view, carry these vibrant stories and flavors with you. Until our next journey together, keep exploring with wonder!`;
  }
  return `As our audio tour of ${location} draws to a close, take a quiet moment to absorb the atmosphere. Places like this remind us that cities are living tapestries made of human dreams, craftsmanship, and memory. Thank you for walking with me today.`;
}

function generateProceduralContent(location: string, category: InterestCategory, targetWords: number, voiceStyle: VoiceStyle): string {
  switch (category) {
    case 'Architecture':
      return `Look closely at the facades and silhouettes surrounding you here in ${location}. Notice how the masonry tells an intricate story of regional materials, changing aesthetic movements, and civic engineering. The arches and structural spans you see were designed to balance gravitational loads while inviting natural daylight into interior courtyards. Observe the delicate craftsmanship around the window moldings and cornices, where local stonecutters left their enduring marks. When you step back and view the roofline against the sky, you can perceive the rhythm of proportion that gives ${location} its unforgettable identity.`;

    case 'History':
      return `To truly understand ${location}, we have to roll back the clock. Centuries ago, this ground witnessed pivotal gatherings, intense trade rivalries, and moments of profound human transformation. Generation after generation walked these very stones, each leaving behind archival records, personal letters, and enduring urban legends. From the early settlement founders to the visionaries who defended this community through turbulent eras, the spirit of perseverance is etched into the foundations of every building you pass.`;

    case 'Culture':
      return `Feel the living rhythm of ${location}. Beyond the grand monuments, the soul of this place resides in the everyday customs, community gatherings, and musical cadences echoing down the streets. Notice the local artisans working in small ateliers, the banter between neighbors greeting one another at morning cafes, and the reverence with which seasonal celebrations are honored. In ${location}, tradition is not a museum piece—it is a living, breathing dialogue that welcomes every curious traveler who takes the time to listen.`;

    case 'Culinary':
      return `Now let your senses guide you as the enticing aromas of ${location} fill the air. The local culinary heritage here is deeply rooted in the surrounding land and water, celebrating recipes passed down across generations. Whether it is crusty bread fresh from morning bakeries, savory slow-simmered regional stews, or delicate pastries scented with citrus zest, every dish tells a story of survival, abundance, and family pride. Be sure to stop by a neighborhood market stall or family-run trattoria to taste the authentic flavors that define daily life in ${location}.`;
  }
}
