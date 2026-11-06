import { Tour } from '../types.ts';

export const SAMPLE_TOURS: Tour[] = [
  {
    id: 'tour-barcelona-gothic',
    title: 'Shadows & Spires: Gothic Quarter & Modernist Dreams',
    location: 'Barcelona, Spain',
    summary: 'An evocative audio journey through the serpentine Roman-Gothic alleys of the Barri Gòtic and the undulating ironwork of Catalan Modernisme.',
    durationMinutes: 15,
    interests: ['Architecture', 'History', 'Culinary'],
    voiceStyle: 'Enthusiastic & Energetic',
    createdAt: '2026-03-01T10:00:00.000Z',
    audioGenerated: true,
    audioDurationSeconds: 880,
    estimatedListeningTime: '15 min',
    waypoints: [
      {
        id: 'wp-bcn-1',
        name: 'Plaça del Rei',
        category: 'Overview',
        description: 'Medieval courtyard surrounded by the Palace of the Kings of Aragon.',
        stepNumber: 1
      },
      {
        id: 'wp-bcn-2',
        name: 'Barcelona Cathedral (La Seu)',
        category: 'Architecture',
        description: 'Neo-Gothic facade, gargoyles, and cloister with 13 white geese.',
        stepNumber: 2
      },
      {
        id: 'wp-bcn-3',
        name: 'Pont del Bisbe (Bishop\'s Bridge)',
        category: 'History',
        description: 'The famed neo-Gothic marble bridge adorned with a skull and dagger.',
        stepNumber: 3
      },
      {
        id: 'wp-bcn-4',
        name: 'Mercat de Santa Caterina',
        category: 'Culinary',
        description: 'Undulating mosaic roof harboring Jamón Ibérico, Manchego, and escalivada.',
        stepNumber: 4
      }
    ],
    sections: [
      {
        id: 'sec-bcn-intro',
        title: 'Welcome to the Labyrinth of the Barri Gòtic',
        category: 'Introduction',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.5,
        wordCount: 220,
        paragraphs: [
          'Welcome to Barcelona. Step beneath the arched Roman stones into the whispering maze of the Gothic Quarter. You can feel the sea breeze filtering through alleys barely three strides wide, where over two thousand years of Mediterranean life have smoothed down the stone thresholds.',
          'Over the next fifteen minutes, we are embarking on a sensory stroll through Catalan history, soaring vault ribs, and the sizzling aromas of olive oil and smoked paprika. Keep your eyes tilted upward and let your imagination walk beside centuries of merchants, stonecutters, and poets.'
        ],
        keyHighlights: ['Roman stone walls', 'Gothic Quarter atmosphere', 'Centuries of merchant history'],
        content: 'Welcome to Barcelona. Step beneath the arched Roman stones into the whispering maze of the Gothic Quarter. You can feel the sea breeze filtering through alleys barely three strides wide, where over two thousand years of Mediterranean life have smoothed down the stone thresholds.\n\nOver the next fifteen minutes, we are embarking on a sensory stroll through Catalan history, soaring vault ribs, and the sizzling aromas of olive oil and smoked paprika. Keep your eyes tilted upward and let your imagination walk beside centuries of merchants, stonecutters, and poets.'
      },
      {
        id: 'sec-bcn-arch',
        title: 'Stone, Light, and the Catalan Gothic Feat',
        category: 'Architecture',
        agentName: 'ArchitectureAgent',
        durationMinutes: 4.5,
        wordCount: 650,
        paragraphs: [
          'Look at the facade of the Cathedral of the Holy Cross and Saint Eulalia rising before you. Unlike northern French Gothic, which reaches violently toward the clouds with sharp spires and steep roofs, Catalan Gothic emphasizes horizontal breadth, austere planar surfaces, and deep interior shadows.',
          'Notice how the octagonal bell towers anchor the building to the bedrock. When you glance up at the gargoyles carved into the rain gutters, observe their whimsical forms—mythical chimeras, unicorns, and lions designed to ward away malevolent spirits while channeling heavy autumn downpours away from the porous Montjuïc sandstone.',
          'As you follow Carrer del Bisbe, you come upon the iconic Pont del Bisbe, the elevated marble bridge connecting the Palau de la Generalitat to the Casa dels Canonges. While it looks medieval, it was actually designed in 1928 by Joan Rubió i Bellver, a disciple of Antoni Gaudí. Look directly under the archway: carved beneath the balustrade is a solitary skull pierced by a dagger—a master artisan\'s cryptic signature that still sparks urban legends.'
        ],
        keyHighlights: ['Catalan Gothic breadth', 'Montjuïc sandstone gargoyles', 'Gaudí disciple\'s Pont del Bisbe'],
        content: 'Look at the facade of the Cathedral of the Holy Cross and Saint Eulalia rising before you. Unlike northern French Gothic, which reaches violently toward the clouds with sharp spires and steep roofs, Catalan Gothic emphasizes horizontal breadth, austere planar surfaces, and deep interior shadows.\n\nNotice how the octagonal bell towers anchor the building to the bedrock. When you glance up at the gargoyles carved into the rain gutters, observe their whimsical forms—mythical chimeras, unicorns, and lions designed to ward away malevolent spirits while channeling heavy autumn downpours away from the porous Montjuïc sandstone.\n\nAs you follow Carrer del Bisbe, you come upon the iconic Pont del Bisbe, the elevated marble bridge connecting the Palau de la Generalitat to the Casa dels Canonges. While it looks medieval, it was actually designed in 1928 by Joan Rubió i Bellver, a disciple of Antoni Gaudí. Look directly under the archway: carved beneath the balustrade is a solitary skull pierced by a dagger—a master artisan\'s cryptic signature that still sparks urban legends.'
      },
      {
        id: 'sec-bcn-hist',
        title: 'Plaça del Rei & The Maritime Empire',
        category: 'History',
        agentName: 'HistoricalAgent',
        durationMinutes: 4.5,
        wordCount: 640,
        paragraphs: [
          'Step into the enclosed stone sanctuary of Plaça del Rei. Stand in the center and listen. This quiet square was once the pulsing heart of the Crown of Aragon, an empire whose galleys dominated the Mediterranean from Naples to Athens.',
          'The sweeping fan staircase to your right leads into the Saló del Tinell, built in 1370 under King Peter the Ceremonious. Beneath the immense diaphragm arches, royal feasts celebrated maritime conquests, and in April 1493, King Ferdinand and Queen Isabella received Christopher Columbus here upon his return from the Americas.',
          'Beneath the flagstones where you stand lie four thousand square meters of excavated Roman Barcino. Olive oil presses, wine fermenting vats, and fish-salting installations from the 2nd century AD remain intact, proving that long before kings held court here, ancient artisans were already shipping Catalan goods across the classical world.'
        ],
        keyHighlights: ['Crown of Aragon maritime empire', 'Saló del Tinell royal receptions', 'Roman Barcino excavations'],
        content: 'Step into the enclosed stone sanctuary of Plaça del Rei. Stand in the center and listen. This quiet square was once the pulsing heart of the Crown of Aragon, an empire whose galleys dominated the Mediterranean from Naples to Athens.\n\nThe sweeping fan staircase to your right leads into the Saló del Tinell, built in 1370 under King Peter the Ceremonious. Beneath the immense diaphragm arches, royal feasts celebrated maritime conquests, and in April 1493, King Ferdinand and Queen Isabella received Christopher Columbus here upon his return from the Americas.\n\nBeneath the flagstones where you stand lie four thousand square meters of excavated Roman Barcino. Olive oil presses, wine fermenting vats, and fish-salting installations from the 2nd century AD remain intact, proving that long before kings held court here, ancient artisans were already shipping Catalan goods across the classical world.'
      },
      {
        id: 'sec-bcn-cul',
        title: 'Tasting the City: Pa amb Tomàquet & Salt Air',
        category: 'Culinary',
        agentName: 'CulinaryAgent',
        durationMinutes: 3.5,
        wordCount: 500,
        paragraphs: [
          'Now inhale deeply as we near the edge of the quarter. The scent of toasted bread, garlic, and cured ham wafts from vintage vermuterias. The cornerstone of every Catalan table is pa amb tomàquet: crusty country bread rubbed vigorously with halved hanging tomatoes, drizzled with peppery extra virgin olive oil, and sprinkled with flaky sea salt.',
          'At the nearby Mercat de Santa Caterina, with its wave-like mosaic roof of 325,000 colored ceramic tiles, stallholders call out the catch of the morning—calamarsons, chipirones, and red gambes from Palamós. Don\'t leave without savoring a slice of tortilla de patatas with a chilled glass of sparkling cava.'
        ],
        keyHighlights: ['Pa amb tomàquet ritual', 'Mercat de Santa Caterina mosaic roof', 'Fresh Palamós prawns & cava'],
        content: 'Now inhale deeply as we near the edge of the quarter. The scent of toasted bread, garlic, and cured ham wafts from vintage vermuterias. The cornerstone of every Catalan table is pa amb tomàquet: crusty country bread rubbed vigorously with halved hanging tomatoes, drizzled with peppery extra virgin olive oil, and sprinkled with flaky sea salt.\n\nAt the nearby Mercat de Santa Caterina, with its wave-like mosaic roof of 325,000 colored ceramic tiles, stallholders call out the catch of the morning—calamarsons, chipirones, and red gambes from Palamós. Don\'t leave without savoring a slice of tortilla de patatas with a chilled glass of sparkling cava.'
      },
      {
        id: 'sec-bcn-outro',
        title: 'Farewell Beneath the Catalan Sky',
        category: 'Conclusion',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.0,
        wordCount: 150,
        paragraphs: [
          'As our audio stroll comes to a close, pause for a moment in the evening twilight. The Gothic Quarter has survived Roman legions, medieval plagues, civil wars, and modern reinvention, yet its stone heart beats as passionately as ever.',
          'Take a seat at an outdoor plaza terrace, order a coffee or a vermut, and let the timeless rhythm of Barcelona wash over you. ¡Fins aviat, and happy wandering!'
        ],
        keyHighlights: ['Twilight reflection', 'Timeless Catalan rhythm'],
        content: 'As our audio stroll comes to a close, pause for a moment in the evening twilight. The Gothic Quarter has survived Roman legions, medieval plagues, civil wars, and modern reinvention, yet its stone heart beats as passionately as ever.\n\nTake a seat at an outdoor plaza terrace, order a coffee or a vermut, and let the timeless rhythm of Barcelona wash over you. ¡Fins aviat, and happy wandering!'
      }
    ],
    fullScript: 'Welcome to Barcelona. Step beneath the arched Roman stones into the whispering maze of the Gothic Quarter...'
  },
  {
    id: 'tour-kyoto-ancient',
    title: 'Whispering Cedars: Kyoto’s Shrines & Zen Pathways',
    location: 'Kyoto, Japan',
    summary: 'A meditative audio exploration of Gion’s machiya teahouses, moss-draped temple gardens, and culinary kaiseki traditions.',
    durationMinutes: 15,
    interests: ['Culture', 'Architecture', 'History'],
    voiceStyle: 'Professional & Detailed',
    createdAt: '2026-03-02T14:30:00.000Z',
    audioGenerated: true,
    audioDurationSeconds: 870,
    estimatedListeningTime: '15 min',
    waypoints: [
      {
        id: 'wp-kyo-1',
        name: 'Yasaka Shrine (Gion-san)',
        category: 'Overview',
        description: 'Lantern-lit vermilion gates guarding the eastern gateway to Kyoto.',
        stepNumber: 1
      },
      {
        id: 'wp-kyo-2',
        name: 'Hanamikoji Dori Machiya',
        category: 'Architecture',
        description: 'Latticed wooden koushi facades and bamboo inuyarai curved screens.',
        stepNumber: 2
      },
      {
        id: 'wp-kyo-3',
        name: 'Kennin-ji Zen Temple',
        category: 'Culture',
        description: 'The oldest Zen temple in Kyoto with the Twin Dragons ceiling painting.',
        stepNumber: 3
      },
      {
        id: 'wp-kyo-4',
        name: 'Shirakawa Canal Path',
        category: 'Wrap-up',
        description: 'Willow trees dipping into crystalline stone canals beside historic teahouses.',
        stepNumber: 4
      }
    ],
    sections: [
      {
        id: 'sec-kyo-intro',
        title: 'Entering the Ancient Capital of Ten Thousand Temples',
        category: 'Introduction',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.5,
        wordCount: 210,
        paragraphs: [
          'Welcome to Kyoto, the thousand-year imperial seat of Japan. As you walk along these flagstone paths, you are stepping into a city constructed on geomantic principles of Feng Shui, bounded by mountains on three sides and flanked by pure mountain waters.',
          'During our journey together, we will discover the refined timber engineering of traditional merchant machiya, the spiritual discipline of Rinzai Zen Buddhism, and the living arts of tea ceremonies preserved within the geiko district of Gion.'
        ],
        keyHighlights: ['Heian-kyo imperial layout', 'Feng Shui mountain alignment', 'Gion tea ceremony tradition'],
        content: 'Welcome to Kyoto, the thousand-year imperial seat of Japan. As you walk along these flagstone paths, you are stepping into a city constructed on geomantic principles of Feng Shui, bounded by mountains on three sides and flanked by pure mountain waters.\n\nDuring our journey together, we will discover the refined timber engineering of traditional merchant machiya, the spiritual discipline of Rinzai Zen Buddhism, and the living arts of tea ceremonies preserved within the geiko district of Gion.'
      },
      {
        id: 'sec-kyo-arch',
        title: 'Mastery of Wood: Machiya Joinery and Bamboo Screens',
        category: 'Architecture',
        agentName: 'ArchitectureAgent',
        durationMinutes: 4.5,
        wordCount: 620,
        paragraphs: [
          'Look closely at the historic wooden townhouses, known as kyo-machiya, lining Hanamikoji. These structures were built completely without metal nails, utilizing kigumi—mortise and tenon timber joinery that flexes gently during seismic tremors.',
          'Notice the elegant wooden latticework known as koushi across the front windows. These were precision-engineered so residents inside could see the street clearly while preventing passersby outside from peering in. At the building foundation, observe the curved bamboo guards called inuyarai, designed to prevent rain splash and bicycle scuffs from degrading the precious cypress cedar posts.'
        ],
        keyHighlights: ['Kigumi nail-less timber joinery', 'Koushi privacy lattice', 'Inuyarai bamboo foundation shields'],
        content: 'Look closely at the historic wooden townhouses, known as kyo-machiya, lining Hanamikoji. These structures were built completely without metal nails, utilizing kigumi—mortise and tenon timber joinery that flexes gently during seismic tremors.\n\nNotice the elegant wooden latticework known as koushi across the front windows. These were precision-engineered so residents inside could see the street clearly while preventing passersby outside from peering in. At the building foundation, observe the curved bamboo guards called inuyarai, designed to prevent rain splash and bicycle scuffs from degrading the precious cypress cedar posts.'
      },
      {
        id: 'sec-kyo-cult',
        title: 'The Way of Zen and Living Heritage',
        category: 'Culture',
        agentName: 'CulturalAgent',
        durationMinutes: 4.5,
        wordCount: 630,
        paragraphs: [
          'As you enter the precinct of Kennin-ji, the oldest Zen Buddhist temple in Kyoto, you encounter the rock garden known as the Circle, Triangle, and Square garden. In Zen philosophy, these geometric forms represent the fundamental elements of the universe: water, fire, and earth.',
          'The discipline of mindful presence, or ichigo ichie—treasure every encounter as a once-in-a-lifetime moment—permeates every facet of Kyoto life. It guides how matcha whisked from Uji tea fields is handed to a guest, how kimono silk is naturally dyed with persimmon tannins, and how temple gardens are raked each dawn into clean concentric ripple patterns.'
        ],
        keyHighlights: ['Kennin-ji Zen philosophy', 'Ichigo Ichie presence', 'Uji matcha & tea ritual'],
        content: 'As you enter the precinct of Kennin-ji, the oldest Zen Buddhist temple in Kyoto, you encounter the rock garden known as the Circle, Triangle, and Square garden. In Zen philosophy, these geometric forms represent the fundamental elements of the universe: water, fire, and earth.\n\nThe discipline of mindful presence, or ichigo ichie—treasure every encounter as a once-in-a-lifetime moment—permeates every facet of Kyoto life. It guides how matcha whisked from Uji tea fields is handed to a guest, how kimono silk is naturally dyed with persimmon tannins, and how temple gardens are raked each dawn into clean concentric ripple patterns.'
      },
      {
        id: 'sec-kyo-hist',
        title: 'Samurai, Shoguns, and the Fire of Ōnin',
        category: 'History',
        agentName: 'HistoricalAgent',
        durationMinutes: 3.5,
        wordCount: 510,
        paragraphs: [
          'In the 15th century, the devastating Ōnin War engulfed Kyoto in flames for a decade, reducing immense palace complexes to ashes. Yet from that profound devastation arose the aesthetic of wabi-sabi—finding sublime beauty in impermanence, aged cedar, and rustic simplicity.',
          'Under the Ashikaga shogunate, warrior lords turned from battlefield campaigns toward calligraphy, landscape architecture, and Zen contemplation. That paradoxical union of samurai martial discipline and delicate refinement remains Kyoto\'s eternal signature.'
        ],
        keyHighlights: ['Ōnin War rebirth', 'Origins of Wabi-sabi aesthetics', 'Ashikaga shogunate patron of arts'],
        content: 'In the 15th century, the devastating Ōnin War engulfed Kyoto in flames for a decade, reducing immense palace complexes to ashes. Yet from that profound devastation arose the aesthetic of wabi-sabi—finding sublime beauty in impermanence, aged cedar, and rustic simplicity.\n\nUnder the Ashikaga shogunate, warrior lords turned from battlefield campaigns toward calligraphy, landscape architecture, and Zen contemplation. That paradoxical union of samurai martial discipline and delicate refinement remains Kyoto\'s eternal signature.'
      },
      {
        id: 'sec-kyo-outro',
        title: 'The Evening Bells of Gion',
        category: 'Conclusion',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.0,
        wordCount: 160,
        paragraphs: [
          'As darkness settles over Kyoto, bronze lanterns flicker to life along the Shirakawa Canal. The sound of water cascading over worn river pebbles accompanies the soft click of wooden geta sandals.',
          'May the stillness and grace of Kyoto remain with you as you continue your journey. Arigatou gozaimasu, and safe travels.'
        ],
        keyHighlights: ['Shirakawa canal twilight', 'Peaceful Zen closure'],
        content: 'As darkness settles over Kyoto, bronze lanterns flicker to life along the Shirakawa Canal. The sound of water cascading over worn river pebbles accompanies the soft click of wooden geta sandals.\n\nMay the stillness and grace of Kyoto remain with you as you continue your journey. Arigatou gozaimasu, and safe travels.'
      }
    ],
    fullScript: 'Welcome to Kyoto, the thousand-year imperial seat of Japan...'
  },
  {
    id: 'tour-florence-renaissance',
    title: 'The Medici Spark: Renaissance Wonders of Florence',
    location: 'Florence, Italy',
    summary: 'Walk in the footsteps of Brunelleschi, Michelangelo, and the Medici dynasty through Piazza del Duomo, the Uffizi corridor, and Ponte Vecchio.',
    durationMinutes: 15,
    interests: ['History', 'Architecture', 'Culture', 'Culinary'],
    voiceStyle: 'Friendly & Casual',
    createdAt: '2026-03-03T09:15:00.000Z',
    audioGenerated: true,
    audioDurationSeconds: 890,
    estimatedListeningTime: '15 min',
    waypoints: [
      {
        id: 'wp-flr-1',
        name: 'Piazza del Duomo & Santa Maria del Fiore',
        category: 'Architecture',
        description: 'Brunelleschi\'s revolutionary self-supporting brick dome.',
        stepNumber: 1
      },
      {
        id: 'wp-flr-2',
        name: 'Piazza della Signoria & Palazzo Vecchio',
        category: 'History',
        description: 'Center of Florentine political power and public sculpture.',
        stepNumber: 2
      },
      {
        id: 'wp-flr-3',
        name: 'Vasari Corridor & Ponte Vecchio',
        category: 'Culture',
        description: 'Secret Medici elevated walkway above historic goldsmith shops.',
        stepNumber: 3
      },
      {
        id: 'wp-flr-4',
        name: 'Mercato Centrale & San Lorenzo',
        category: 'Culinary',
        description: 'Lampredotto, Bistecca alla Fiorentina, and Chianti wine bar.',
        stepNumber: 4
      }
    ],
    sections: [
      {
        id: 'sec-flr-intro',
        title: 'Where the Modern World Was Reborn',
        category: 'Introduction',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.5,
        wordCount: 215,
        paragraphs: [
          'Welcome to Florence, the cradle of the Italian Renaissance. Stand here in the morning sun and take a look around: almost every paving stone, marble portal, and bronze door within sight was touched by geniuses whose names are carved into human history.',
          'Together, we will uncover how an ambitious banker family, a bold goldsmith who solved an impossible architectural puzzle, and a passionate culinary tradition forged the soul of Tuscany.'
        ],
        keyHighlights: ['Cradle of Renaissance', 'Medici legacy', 'Tuscan soul'],
        content: 'Welcome to Florence, the cradle of the Italian Renaissance. Stand here in the morning sun and take a look around: almost every paving stone, marble portal, and bronze door within sight was touched by geniuses whose names are carved into human history.\n\nTogether, we will uncover how an ambitious banker family, a bold goldsmith who solved an impossible architectural puzzle, and a passionate culinary tradition forged the soul of Tuscany.'
      },
      {
        id: 'sec-flr-arch',
        title: 'Brunelleschi’s Impossible Dome',
        category: 'Architecture',
        agentName: 'ArchitectureAgent',
        durationMinutes: 3.5,
        wordCount: 520,
        paragraphs: [
          'Cast your eyes up to the dome of Santa Maria del Fiore. In the year 1418, this cathedral stood open to the sky for decades because no engineer in Europe knew how to build a dome spanning 143 feet without wooden centering scaffolding, which would have required an entire forest.',
          'Filippo Brunelleschi stepped forward with an unprecedented design: an inner and outer shell constructed with a herringbone brickwork pattern, known as spina di pesce. This ingenious arrangement allowed the bricks to support themselves as the masonry climbed 300 feet into the Florentine sky. No scaffolding, no external buttresses—just pure mathematical genius.'
        ],
        keyHighlights: ['143-foot unsupported span', 'Herringbone spina di pesce brickwork', 'Double-shell dome innovation'],
        content: 'Cast your eyes up to the dome of Santa Maria del Fiore. In the year 1418, this cathedral stood open to the sky for decades because no engineer in Europe knew how to build a dome spanning 143 feet without wooden centering scaffolding, which would have required an entire forest.\n\nFilippo Brunelleschi stepped forward with an unprecedented design: an inner and outer shell constructed with a herringbone brickwork pattern, known as spina di pesce. This ingenious arrangement allowed the bricks to support themselves as the masonry climbed 300 feet into the Florentine sky. No scaffolding, no external buttresses—just pure mathematical genius.'
      },
      {
        id: 'sec-flr-hist',
        title: 'The Medici Ambition and the Republic',
        category: 'History',
        agentName: 'HistoricalAgent',
        durationMinutes: 3.5,
        wordCount: 510,
        paragraphs: [
          'As we walk toward Piazza della Signoria, we enter the theater of Medici power. Cosimo the Elder and later Lorenzo the Magnificent realized that political dominance could be achieved not just through mercenary armies, but by cultivating artists, philosophers, and humanists.',
          'In this square, citizens gathered to debate laws, Michelangelo\'s David stood as an embodiment of the youthful Republic defending against tyrants, and in 1497, the fiery monk Girolamo Savonarola held the infamous Bonfire of the Vanities.'
        ],
        keyHighlights: ['Lorenzo the Magnificent patron', 'Michelangelo\'s David symbolism', 'Bonfire of the Vanities in 1497'],
        content: 'As we walk toward Piazza della Signoria, we enter the theater of Medici power. Cosimo the Elder and later Lorenzo the Magnificent realized that political dominance could be achieved not just through mercenary armies, but by cultivating artists, philosophers, and humanists.\n\nIn this square, citizens gathered to debate laws, Michelangelo\'s David stood as an embodiment of the youthful Republic defending against tyrants, and in 1497, the fiery monk Girolamo Savonarola held the infamous Bonfire of the Vanities.'
      },
      {
        id: 'sec-flr-cul',
        title: 'Tuscan Truffles, Chianti, and Lampredotto',
        category: 'Culinary',
        agentName: 'CulinaryAgent',
        durationMinutes: 3.5,
        wordCount: 490,
        paragraphs: [
          'Cross toward the Arno river and pause at a street trippaio cart. Florence’s culinary DNA is cucina povera—humble ingredients transformed into extraordinary delicacies. The quintessential street specialty is lampredotto: slow-braised fourth beef stomach simmered in broth with herbs, chopped into a crusty semelle bun, and finished with salsa verde and spicy chili oil.',
          'For dinner, Florentines head to rustic osterias for Bistecca alla Fiorentina—thick Chianina beef grilled over olive wood embers, served rare with cannellini beans drizzled in fresh Novello olive oil and paired with a bold Chianti Classico.'
        ],
        keyHighlights: ['Cucina povera philosophy', 'Historic lampredotto panini', 'Bistecca alla Fiorentina with Chianti'],
        content: 'Cross toward the Arno river and pause at a street trippaio cart. Florence’s culinary DNA is cucina povera—humble ingredients transformed into extraordinary delicacies. The quintessential street specialty is lampredotto: slow-braised fourth beef stomach simmered in broth with herbs, chopped into a crusty semelle bun, and finished with salsa verde and spicy chili oil.\n\nFor dinner, Florentines head to rustic osterias for Bistecca alla Fiorentina—thick Chianina beef grilled over olive wood embers, served rare with cannellini beans drizzled in fresh Novello olive oil and paired with a bold Chianti Classico.'
      },
      {
        id: 'sec-flr-outro',
        title: 'Sunset over the Ponte Vecchio',
        category: 'Conclusion',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.0,
        wordCount: 155,
        paragraphs: [
          'As the Arno reflects the golden amber hues of the Tuscan sunset, the goldsmith shops of Ponte Vecchio shutter their wooden doors. Florence does not dwell merely in the past; it breathes inspiration into anyone who walks its stones.',
          'Take your time crossing the river into the Oltrarno neighborhood, and enjoy every step of your Italian voyage. Buona serata!'
        ],
        keyHighlights: ['Arno golden hour', 'Oltrarno artisan quarters'],
        content: 'As the Arno reflects the golden amber hues of the Tuscan sunset, the goldsmith shops of Ponte Vecchio shutter their wooden doors. Florence does not dwell merely in the past; it breathes inspiration into anyone who walks its stones.\n\nTake your time crossing the river into the Oltrarno neighborhood, and enjoy every step of your Italian voyage. Buona serata!'
      }
    ],
    fullScript: 'Welcome to Florence, the cradle of the Italian Renaissance...'
  }
];
