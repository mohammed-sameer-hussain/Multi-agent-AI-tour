import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanSpokenParagraphs, countWords, assembleTour } from './parser.ts';

test('cleanSpokenParagraphs strips markdown headers and bolding', () => {
  const raw = `## Architecture
Welcome to the cathedral. Notice the **flying buttresses** supporting the nave.

Look closely at the stained glass above the western portal.`;

  const paragraphs = cleanSpokenParagraphs(raw);
  assert.equal(paragraphs.length, 2);
  assert.ok(!paragraphs[0].includes('## Architecture'));
  assert.ok(paragraphs[0].includes('flying buttresses'));
  assert.ok(!paragraphs[0].includes('**'));
});

test('countWords accurately counts tokens', () => {
  assert.equal(countWords('hello world from audio tour'), 5);
  assert.equal(countWords('   '), 0);
  assert.equal(countWords(''), 0);
});

test('assembleTour creates complete Tour structure with sections', () => {
  const tour = assembleTour({
    id: 'tour-123',
    title: 'Rome Odyssey',
    location: 'Rome, Italy',
    summary: 'A short tour of the ancient forum.',
    durationMinutes: 10,
    interests: ['History'],
    voiceStyle: 'Friendly & Casual',
    sectionsData: [
      {
        category: 'Introduction',
        agentName: 'Orchestrator',
        title: 'Welcome to Rome',
        content: 'Welcome to the Eternal City. Let us step onto the cobblestones.',
        durationMinutes: 1
      },
      {
        category: 'History',
        agentName: 'HistoricalAgent',
        title: 'The Roman Forum',
        content: 'Two thousand years ago, this basin was the epic center of civic life.',
        durationMinutes: 8
      },
      {
        category: 'Conclusion',
        agentName: 'Orchestrator',
        title: 'Closing Thoughts',
        content: 'Thank you for exploring with me today.',
        durationMinutes: 1
      }
    ],
    waypoints: [
      {
        id: 'wp-1',
        name: 'Roman Forum Plaza',
        category: 'History',
        description: 'Center of civic life',
        stepNumber: 1
      }
    ]
  });

  assert.equal(tour.id, 'tour-123');
  assert.equal(tour.sections.length, 3);
  assert.ok(tour.fullScript.length > 0);
  assert.equal(tour.waypoints.length, 1);
});
