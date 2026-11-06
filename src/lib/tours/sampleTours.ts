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
        latitude: 41.3842,
        longitude: 2.1772,
        stepNumber: 1
      },
      {
        id: 'wp-bcn-2',
        name: 'Barcelona Cathedral (La Seu)',
        category: 'Architecture',
        description: 'Neo-Gothic facade, gargoyles, and cloister with 13 white geese.',
        latitude: 41.3839,
        longitude: 2.1762,
        stepNumber: 2
      },
      {
        id: 'wp-bcn-3',
        name: 'Pont del Bisbe (Bishop\'s Bridge)',
        category: 'History',
        description: 'The famed neo-Gothic marble bridge adorned with a skull and dagger.',
        latitude: 41.3831,
        longitude: 2.1768,
        stepNumber: 3
      },
      {
        id: 'wp-bcn-4',
        name: 'Mercat de Santa Caterina',
        category: 'Culinary',
        description: 'Undulating mosaic roof harboring Jamón Ibérico, Manchego, and escalivada.',
        latitude: 41.3861,
        longitude: 2.1788,
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
        latitude: 35.0037,
        longitude: 135.7785,
        stepNumber: 1
      },
      {
        id: 'wp-kyo-2',
        name: 'Hanamikoji Dori Machiya',
        category: 'Architecture',
        description: 'Latticed wooden koushi facades and bamboo inuyarai curved screens.',
        latitude: 35.0028,
        longitude: 135.7750,
        stepNumber: 2
      },
      {
        id: 'wp-kyo-3',
        name: 'Kennin-ji Zen Temple',
        category: 'Culture',
        description: 'The oldest Zen temple in Kyoto with the Twin Dragons ceiling painting.',
        latitude: 34.9997,
        longitude: 135.7739,
        stepNumber: 3
      },
      {
        id: 'wp-kyo-4',
        name: 'Shirakawa Canal Path',
        category: 'Wrap-up',
        description: 'Willow trees dipping into crystalline stone canals beside historic teahouses.',
        latitude: 35.0062,
        longitude: 135.7735,
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
        latitude: 43.7731,
        longitude: 11.2560,
        stepNumber: 1
      },
      {
        id: 'wp-flr-2',
        name: 'Piazza della Signoria & Palazzo Vecchio',
        category: 'History',
        description: 'Center of Florentine political power and public sculpture.',
        latitude: 43.7696,
        longitude: 11.2561,
        stepNumber: 2
      },
      {
        id: 'wp-flr-3',
        name: 'Vasari Corridor & Ponte Vecchio',
        category: 'Culture',
        description: 'Secret Medici elevated walkway above historic goldsmith shops.',
        latitude: 43.7680,
        longitude: 11.2532,
        stepNumber: 3
      },
      {
        id: 'wp-flr-4',
        name: 'Mercato Centrale & San Lorenzo',
        category: 'Culinary',
        description: 'Lampredotto, Bistecca alla Fiorentina, and Chianti wine bar.',
        latitude: 43.7766,
        longitude: 11.2536,
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
  },
  {
    id: 'tour-jaipur-city-palace',
    title: 'The Pink Citadel: Royal Splendors of Jaipur’s City Palace & Hawa Mahal',
    location: 'Jaipur, Rajasthan, India',
    summary: 'Step inside the astronomical courtyards, Peacock Gates, and 953 honeycombed jharokhas of the Kachhwaha Rajput rulers, paired with royal ghewar and dal baati flavors.',
    durationMinutes: 15,
    interests: ['History', 'Architecture', 'Culture', 'Culinary'],
    voiceStyle: 'Enthusiastic & Energetic',
    createdAt: '2026-03-04T11:00:00.000Z',
    audioGenerated: true,
    audioDurationSeconds: 885,
    estimatedListeningTime: '15 min',
    waypoints: [
      {
        id: 'wp-jpr-1',
        name: 'Hawa Mahal (Palace of Winds)',
        category: 'Architecture',
        description: 'Five-story pink sandstone honeycomb facade with 953 carved jharokha bay windows.',
        latitude: 26.9239,
        longitude: 75.8267,
        stepNumber: 1
      },
      {
        id: 'wp-jpr-2',
        name: 'Pritam Niwas Chowk (Peacock Gate)',
        category: 'Culture',
        description: 'Inner courtyard featuring four vibrant gateways depicting the four seasons.',
        latitude: 26.9258,
        longitude: 75.8236,
        stepNumber: 2
      },
      {
        id: 'wp-jpr-3',
        name: 'Diwan-i-Khas & The Sterling Silver Gangajalis',
        category: 'History',
        description: 'Private audience hall housing the world\'s largest sterling silver urns (Guinness Record).',
        latitude: 26.9255,
        longitude: 75.8242,
        stepNumber: 3
      },
      {
        id: 'wp-jpr-4',
        name: 'Johari Bazaar & Sweet Guilds',
        category: 'Culinary',
        description: 'Historic jewelers\' bazaar famous for freshly fried pyaaz kachoris and honeycomb ghewar.',
        latitude: 26.9205,
        longitude: 75.8248,
        stepNumber: 4
      }
    ],
    sections: [
      {
        id: 'sec-jpr-intro',
        title: 'Welcome to the Pink City of Kings',
        category: 'Introduction',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.5,
        wordCount: 225,
        paragraphs: [
          'Welcome to Jaipur, the legendary Pink City of Rajasthan. As you step onto Sireh Deori Bazaar, look up at the warm terracotta-pink facades rising around you. In 1876, Maharaja Ram Singh painted the entire walled capital this rosy hue—a traditional desert symbol of royal hospitality—to welcome the Prince of Wales, and by royal decree, the color has been preserved ever since.',
          'Over the next fifteen minutes, we will walk the marble corridors of Rajput warrior-scholars, gaze through the breezy stone lattices of Hawa Mahal, uncover the astronomical genius of the royal astronomers, and inhale the intoxicating scents of cardamom, roasted lentils, and saffron sweets.'
        ],
        keyHighlights: ['Pink terracotta hospitality decree', 'Maharaja Sawai Jai Singh II legacy', 'Desert royalty atmosphere'],
        content: 'Welcome to Jaipur, the legendary Pink City of Rajasthan. As you step onto Sireh Deori Bazaar, look up at the warm terracotta-pink facades rising around you. In 1876, Maharaja Ram Singh painted the entire walled capital this rosy hue—a traditional desert symbol of royal hospitality—to welcome the Prince of Wales, and by royal decree, the color has been preserved ever since.\n\nOver the next fifteen minutes, we will walk the marble corridors of Rajput warrior-scholars, gaze through the breezy stone lattices of Hawa Mahal, uncover the astronomical genius of the royal astronomers, and inhale the intoxicating scents of cardamom, roasted lentils, and saffron sweets.'
      },
      {
        id: 'sec-jpr-arch',
        title: 'Latticed Breezes: The 953 Windows of Hawa Mahal',
        category: 'Architecture',
        agentName: 'ArchitectureAgent',
        durationMinutes: 4.5,
        wordCount: 630,
        paragraphs: [
          'Stand before the Hawa Mahal, the Palace of Winds, constructed in 1799 by Maharaja Sawai Pratap Singh. Notice how its five-story pyramid-like facade mimics the crown of Lord Krishna, whom the king devoutly worshipped. What appears to be an immense palace is actually a marvelously thin screen, barely one room deep at the top.',
          'Examine the 953 delicately carved casements, known as jharokhas. Each one is fitted with miniature sandstone lattices that function as natural air conditioners using the Venturi effect: hot desert breezes enter the tiny apertures, compress, and accelerate into a cool refreshing draft inside.',
          'This architectural ingenuity allowed royal purdah ladies to observe bustling street processions, elephant parades, and lively bazaars without ever being seen by the public below. As sunlight strikes the pink and red sandstone, the entire facade seems to glow with the rhythm of desert poetry.'
        ],
        keyHighlights: ['Crown of Krishna facade design', 'Venturi effect natural cooling', 'Intricate purdah jharokha screens'],
        content: 'Stand before the Hawa Mahal, the Palace of Winds, constructed in 1799 by Maharaja Sawai Pratap Singh. Notice how its five-story pyramid-like facade mimics the crown of Lord Krishna, whom the king devoutly worshipped. What appears to be an immense palace is actually a marvelously thin screen, barely one room deep at the top.\n\nExamine the 953 delicately carved casements, known as jharokhas. Each one is fitted with miniature sandstone lattices that function as natural air conditioners using the Venturi effect: hot desert breezes enter the tiny apertures, compress, and accelerate into a cool refreshing draft inside.\n\nThis architectural ingenuity allowed royal purdah ladies to observe bustling street processions, elephant parades, and lively bazaars without ever being seen by the public below. As sunlight strikes the pink and red sandstone, the entire facade seems to glow with the rhythm of desert poetry.'
      },
      {
        id: 'sec-jpr-hist',
        title: 'Chivalry & Silver: The Kachhwaha Rajput Dynasties',
        category: 'History',
        agentName: 'HistoricalAgent',
        durationMinutes: 4.0,
        wordCount: 560,
        paragraphs: [
          'Pass through the grand Tripolia Gate into the central courtyard of the City Palace complex. When Maharaja Sawai Jai Singh II founded Jaipur in 1727, he did what almost no ruler had done for centuries: he shifted his capital down from the fortified cliffs of Amer into the plains, planning the city on ancient Vedic Vastu Shastra grid principles.',
          'In the open marble pavilion of Diwan-i-Khas, look at the two enormous sterling silver vessels standing on pedestals. These are the Gangajalis. In 1902, when Maharaja Madho Singh II travelled to London for the coronation of King Edward VII, as an orthodox Hindu he refused to drink foreign water. He commissioned local silversmiths to melt 14,000 silver coins without a single joint or solder, creating vessels that held 4,000 liters of holy Ganges water for his voyage. They remain the world\'s largest single sterling silver objects.'
        ],
        keyHighlights: ['Vedic Vastu Shastra urban grid in 1727', 'Record-holding Gangajalis silver urns', 'Voyage of Maharaja Madho Singh II'],
        content: 'Pass through the grand Tripolia Gate into the central courtyard of the City Palace complex. When Maharaja Sawai Jai Singh II founded Jaipur in 1727, he did what almost no ruler had done for centuries: he shifted his capital down from the fortified cliffs of Amer into the plains, planning the city on ancient Vedic Vastu Shastra grid principles.\n\nIn the open marble pavilion of Diwan-i-Khas, look at the two enormous sterling silver vessels standing on pedestals. These are the Gangajalis. In 1902, when Maharaja Madho Singh II travelled to London for the coronation of King Edward VII, as an orthodox Hindu he refused to drink foreign water. He commissioned local silversmiths to melt 14,000 silver coins without a single joint or solder, creating vessels that held 4,000 liters of holy Ganges water for his voyage. They remain the world\'s largest single sterling silver objects.'
      },
      {
        id: 'sec-jpr-cul',
        title: 'Royal Feasts: Pyaaz Kachori & Honeycomb Ghewar',
        category: 'Culinary',
        agentName: 'CulinaryAgent',
        durationMinutes: 4.0,
        wordCount: 520,
        paragraphs: [
          'Now follow the irresistible aroma of roasting spices toward Johari Bazaar. Rajasthani culinary culture was shaped by the desert: ingredients that could last for days during long camel expeditions without spoiling. At legendary stalls like Rawat Mishtan Bhandar, witness cooks dropping golden pastry discs into bubbling vats of pure ghee to craft the famous pyaaz kachori—flaky crust stuffed with caramelized onions, fennel, and crushed coriander.',
          'For dessert, behold the royal crown of Rajasthani sweets: ghewar. Prepared during the monsoon and festive seasons, this disc of clarified butter and flour is dripped from height into boiling ghee, creating an intricate edible honeycomb matrix that is soaked in aromatic saffron-cardamom sugar syrup and topped with thick malai rabri and silver leaf.'
        ],
        keyHighlights: ['Rawat pyaaz kachori in pure ghee', 'Honeycomb saffron ghewar with rabri', 'Desert preservation cooking traditions'],
        content: 'Now follow the irresistible aroma of roasting spices toward Johari Bazaar. Rajasthani culinary culture was shaped by the desert: ingredients that could last for days during long camel expeditions without spoiling. At legendary stalls like Rawat Mishtan Bhandar, witness cooks dropping golden pastry discs into bubbling vats of pure ghee to craft the famous pyaaz kachori—flaky crust stuffed with caramelized onions, fennel, and crushed coriander.\n\nFor dessert, behold the royal crown of Rajasthani sweets: ghewar. Prepared during the monsoon and festive seasons, this disc of clarified butter and flour is dripped from height into boiling ghee, creating an intricate edible honeycomb matrix that is soaked in aromatic saffron-cardamom sugar syrup and topped with thick malai rabri and silver leaf.'
      },
      {
        id: 'sec-jpr-outro',
        title: 'Twilight over the Amber Ridge',
        category: 'Conclusion',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.0,
        wordCount: 160,
        paragraphs: [
          'As the sun dips behind the rugged Aravali hills, temple bells echo across the Pink City and evening pigeons flutter from the jharokhas. The City Palace of Jaipur is not merely a monument; the royal descendants still reside in the Chandra Mahal, keeping the eternal flame of Rajput heritage alive.',
          'Take a seat at a rooftop cafe overlooking the illuminated facade of Hawa Mahal, sip a cup of saffron-spiced chai, and enjoy the magical desert dusk. Padharo Mhare Desh—welcome to our land!'
        ],
        keyHighlights: ['Aravali hills sunset', 'Living royal residence at Chandra Mahal', 'Warm Padharo Mhare Desh farewell'],
        content: 'As the sun dips behind the rugged Aravali hills, temple bells echo across the Pink City and evening pigeons flutter from the jharokhas. The City Palace of Jaipur is not merely a monument; the royal descendants still reside in the Chandra Mahal, keeping the eternal flame of Rajput heritage alive.\n\nTake a seat at a rooftop cafe overlooking the illuminated facade of Hawa Mahal, sip a cup of saffron-spiced chai, and enjoy the magical desert dusk. Padharo Mhare Desh—welcome to our land!'
      }
    ],
    fullScript: 'Welcome to Jaipur, the legendary Pink City of Rajasthan...'
  },
  {
    id: 'tour-mysore-palace',
    title: 'Jewel of Karnataka: The Golden Splendor of Mysore’s Amba Vilas Palace',
    location: 'Mysore, Karnataka, India',
    summary: 'An opulent journey through the Wadiyar dynasty’s Indo-Saracenic masterpiece, illuminated by 100,000 royal lamps, octagonal stained-glass pavilions, and fragrant sandalwood.',
    durationMinutes: 15,
    interests: ['Architecture', 'History', 'Culture', 'Culinary'],
    voiceStyle: 'Friendly & Casual',
    createdAt: '2026-03-05T09:30:00.000Z',
    audioGenerated: true,
    audioDurationSeconds: 880,
    estimatedListeningTime: '15 min',
    waypoints: [
      {
        id: 'wp-mys-1',
        name: 'Gombe Thotti (Doll\'s Pavilion) & Silver Door',
        category: 'Overview',
        description: 'Entry gallery showcasing royal palanquins and the celebrated 84-kilo golden howdah.',
        latitude: 12.3052,
        longitude: 76.6552,
        stepNumber: 1
      },
      {
        id: 'wp-mys-2',
        name: 'Kalyana Mantapa (Marriage Pavilion)',
        category: 'Architecture',
        description: 'Octagonal hall crowned by peacock-motif stained glass domes crafted in Glasgow, Scotland.',
        latitude: 12.3050,
        longitude: 76.6550,
        stepNumber: 2
      },
      {
        id: 'wp-mys-3',
        name: 'The Grand Durbar Hall',
        category: 'History',
        description: 'Vast ceremonial hall with gold-leaf pillars, sculpted ceilings, and views of Chamundi Hill.',
        latitude: 12.3055,
        longitude: 76.6554,
        stepNumber: 3
      },
      {
        id: 'wp-mys-4',
        name: 'Devaraja Market & Guru Sweets',
        category: 'Culinary',
        description: 'Centuries-old market fragrant with Mysore jasmine, betel leaves, and the birthplace of Mysore Pak.',
        latitude: 12.3089,
        longitude: 76.6528,
        stepNumber: 4
      }
    ],
    sections: [
      {
        id: 'sec-mys-intro',
        title: 'Entering the City of Palaces and Sandalwood',
        category: 'Introduction',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.5,
        wordCount: 220,
        paragraphs: [
          'Welcome to Mysore, the cultural capital of Karnataka. As you walk through the ornamental arched gates of the Amba Vilas Palace, you are entering one of the most visited monuments on earth, second in India only to the Taj Mahal.',
          'For over six hundred years, the Wadiyar dynasty ruled this fertile kingdom, fostering classical Carnatic music, Sanskrit learning, silk weaving, and architectural grandeur. Today, we will step across glazed English tiles, gaze into stained-glass domes commissioned from Glasgow, learn the sacred rituals of the Mysore Dasara festival, and taste the velvety sweetness of original royal Mysore Pak.'
        ],
        keyHighlights: ['Wadiyar royal heritage', 'Amba Vilas Palace gates', 'Sandalwood and silk traditions'],
        content: 'Welcome to Mysore, the cultural capital of Karnataka. As you walk through the ornamental arched gates of the Amba Vilas Palace, you are entering one of the most visited monuments on earth, second in India only to the Taj Mahal.\n\nFor over six hundred years, the Wadiyar dynasty ruled this fertile kingdom, fostering classical Carnatic music, Sanskrit learning, silk weaving, and architectural grandeur. Today, we will step across glazed English tiles, gaze into stained-glass domes commissioned from Glasgow, learn the sacred rituals of the Mysore Dasara festival, and taste the velvety sweetness of original royal Mysore Pak.'
      },
      {
        id: 'sec-mys-arch',
        title: 'Indo-Saracenic Masterpiece: Stained Glass & Golden Foliage',
        category: 'Architecture',
        agentName: 'ArchitectureAgent',
        durationMinutes: 4.5,
        wordCount: 640,
        paragraphs: [
          'After the old wooden palace burned down during a royal wedding in 1897, Maharani Kempananjammanni commissioned the British architect Lord Henry Irwin to construct this stone palace in the majestic Indo-Saracenic style—a harmonious fusion of Hindu, Mughal, Rajput, and Gothic architecture.',
          'Notice the three-story granite edifice crowned by deep pink marble domes and a 145-foot central five-story tower. As you step into the Kalyana Mantapa, or Marriage Pavilion, look up into the soaring octagonal ceiling. The iron pillars and stained-glass ceiling were fabricated in Glasgow, Scotland, featuring a vibrant peacock motif arranged in circular stained-glass rings that bathe the marble floor in multicolored sunlight.',
          'Every pillar in the public Durbar Hall is sculpted with intricate foliage and painted with real gold leaf. On Sunday evenings and during the Dasara festival, the entire palace exterior is illuminated by nearly 100,000 incandescent light bulbs, transforming the stone fortress into a shimmering celestial palace of gold.'
        ],
        keyHighlights: ['Henry Irwin Indo-Saracenic design', 'Glasgow-crafted peacock stained glass', '100,000 incandescent illumination bulbs'],
        content: 'After the old wooden palace burned down during a royal wedding in 1897, Maharani Kempananjammanni commissioned the British architect Lord Henry Irwin to construct this stone palace in the majestic Indo-Saracenic style—a harmonious fusion of Hindu, Mughal, Rajput, and Gothic architecture.\n\nNotice the three-story granite edifice crowned by deep pink marble domes and a 145-foot central five-story tower. As you step into the Kalyana Mantapa, or Marriage Pavilion, look up into the soaring octagonal ceiling. The iron pillars and stained-glass ceiling were fabricated in Glasgow, Scotland, featuring a vibrant peacock motif arranged in circular stained-glass rings that bathe the marble floor in multicolored sunlight.\n\nEvery pillar in the public Durbar Hall is sculpted with intricate foliage and painted with real gold leaf. On Sunday evenings and during the Dasara festival, the entire palace exterior is illuminated by nearly 100,000 incandescent light bulbs, transforming the stone fortress into a shimmering celestial palace of gold.'
      },
      {
        id: 'sec-mys-hist',
        title: 'The Golden Howdah and the Grand Dasara',
        category: 'History',
        agentName: 'HistoricalAgent',
        durationMinutes: 4.0,
        wordCount: 540,
        paragraphs: [
          'Stand in the vast ceremonial courtyard and imagine the annual Vijayadashami procession. For centuries, the Wadiyars celebrated the triumph of Goddess Chamundeshwari over the buffalo demon Mahishasura, from whose name the city of Mysuru is derived.',
          'The centerpiece of the royal treasury is the Golden Howdah, or Chinnada Ambari, an elephant saddle made of 84 kilograms of pure gold. During the Dasara procession, this golden throne is mounted atop the lead tusker elephant, carrying the idol of the goddess through crowds of hundreds of thousands of spectators line the royal streets.',
          'The Wadiyars were renowned as progressive monarchs: they pioneered compulsory primary education, built Asia\'s first major hydroelectric power station at Shivanasamudra, and transformed Mysore into a model princely state.'
        ],
        keyHighlights: ['84-kg pure gold elephant howdah', 'Legend of Goddess Chamundeshwari', 'Progressive legacy of the Wadiyars'],
        content: 'Stand in the vast ceremonial courtyard and imagine the annual Vijayadashami procession. For centuries, the Wadiyars celebrated the triumph of Goddess Chamundeshwari over the buffalo demon Mahishasura, from whose name the city of Mysuru is derived.\n\nThe centerpiece of the royal treasury is the Golden Howdah, or Chinnada Ambari, an elephant saddle made of 84 kilograms of pure gold. During the Dasara procession, this golden throne is mounted atop the lead tusker elephant, carrying the idol of the goddess through crowds of hundreds of thousands of spectators line the royal streets.\n\nThe Wadiyars were renowned as progressive monarchs: they pioneered compulsory primary education, built Asia\'s first major hydroelectric power station at Shivanasamudra, and transformed Mysore into a model princely state.'
      },
      {
        id: 'sec-mys-cul',
        title: 'Sweet Inventions: Royal Mysore Pak & Crisp Dosas',
        category: 'Culinary',
        agentName: 'CulinaryAgent',
        durationMinutes: 4.0,
        wordCount: 530,
        paragraphs: [
          'Just a short stroll from the palace gates lies the bustling Devaraja Market. In 1935, inside the royal palace kitchen, royal sweetmaker Kakasura Madappa was experimenting with roasted gram flour, boiling sugar syrup, and lashings of pure clarified butter. When the king, Maharaja Krishnaraja Wadiyar IV, tasted the heavenly melt-in-mouth confection, he named it "Mysore Pak"—the sweet of Mysore.',
          'To this day, Madappa’s great-grandsons operate Guru Sweets on Sayyaji Rao Road, crafting the traditional fudge according to the original royal recipe. Pair this with a plate of crisp Mylari masala dosa—fermented rice crepes grilled with homemade white butter and stuffed with soft spiced onion potato mash—washed down with aromatic South Indian filter coffee frothed in traditional brass dabarah tumblers.'
        ],
        keyHighlights: ['Invention of Mysore Pak by royal chef Madappa in 1935', 'Original Guru Sweet Mart recipe', 'Mylari white-butter dosa & filter coffee'],
        content: 'Just a short stroll from the palace gates lies the bustling Devaraja Market. In 1935, inside the royal palace kitchen, royal sweetmaker Kakasura Madappa was experimenting with roasted gram flour, boiling sugar syrup, and lashings of pure clarified butter. When the king, Maharaja Krishnaraja Wadiyar IV, tasted the heavenly melt-in-mouth confection, he named it "Mysore Pak"—the sweet of Mysore.\n\nTo this day, Madappa’s great-grandsons operate Guru Sweets on Sayyaji Rao Road, crafting the traditional fudge according to the original royal recipe. Pair this with a plate of crisp Mylari masala dosa—fermented rice crepes grilled with homemade white butter and stuffed with soft spiced onion potato mash—washed down with aromatic South Indian filter coffee frothed in traditional brass dabarah tumblers.'
      },
      {
        id: 'sec-mys-outro',
        title: 'Golden Twilight on the Chamundi Hills',
        category: 'Conclusion',
        agentName: 'OrchestratorAgent',
        durationMinutes: 1.0,
        wordCount: 160,
        paragraphs: [
          'As twilight turns the Karnataka sky to deep indigo, look back toward the palace. The gentle fragrance of Mysore mallige jasmine and incense drifts on the evening breeze, while the silhouettes of temple gopurams stand serenely against Chamundi Hill.',
          'Mysore reminds us that royal majesty endures not in armies, but in culture, architecture, and the sweetness of shared hospitality. Thank you for walking through this golden kingdom today. Banni matte sigona—until we meet again!'
        ],
        keyHighlights: ['Mysore mallige jasmine evening breeze', 'Chamundi Hill twilight panorama', 'Warm Kannada hospitality'],
        content: 'As twilight turns the Karnataka sky to deep indigo, look back toward the palace. The gentle fragrance of Mysore mallige jasmine and incense drifts on the evening breeze, while the silhouettes of temple gopurams stand serenely against Chamundi Hill.\n\nMysore reminds us that royal majesty endures not in armies, but in culture, architecture, and the sweetness of shared hospitality. Thank you for walking through this golden kingdom today. Banni matte sigona—until we meet again!'
      }
    ],
    fullScript: 'Welcome to Mysore, the cultural capital of Karnataka...'
  }
];
