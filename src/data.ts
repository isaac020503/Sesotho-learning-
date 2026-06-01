import { Tutor, Material, Phrase, QuizQuestion } from './types.ts';

export const TUTORS: Tutor[] = [
  {
    id: 't1',
    name: 'Lerato Mofokeng',
    avatar: 'LM',
    role: 'Certified Linguist & Native Speaker',
    rating: 4.9,
    reviewsCount: 42,
    hourlyRate: 15,
    completedLessons: 184,
    country: 'Lesotho',
    location: 'Maseru, Lesotho',
    bio: 'Lumela! I am Lerato, a professional linguist with over 5 years of experience teaching Southern Sotho (Sesotho) to expats, travelers, and kids. My lessons are highly energetic and focused on oral communication and grammatical accuracy.',
    specialties: ['Conversational', 'Grammar', 'Kids Course', 'Academic Sotho'],
    availability: {
      Monday: ['09:00', '11:00', '14:00', '16:00'],
      Wednesday: ['10:00', '14:00', '15:00', '17:00'],
      Friday: ['09:00', '11:00', '15:00', '16:00'],
      Saturday: ['10:00', '12:00']
    }
  },
  {
    id: 't2',
    name: 'Sello Ndlovu',
    avatar: 'SN',
    role: 'Sesotho Idioms & Modern Vocab Coach',
    rating: 4.8,
    reviewsCount: 29,
    hourlyRate: 18,
    completedLessons: 97,
    country: 'Lesotho',
    location: 'Quthing, Lesotho',
    bio: 'Greetings! I grew up in the rich heritage hills of southern Lesotho. I love sharing correct pronunciation and idiomatic expressions that make you sound like a local. If you want to master common slang or local folklore, I am your guide!',
    specialties: ['Accent Reduction', 'Idioms & Proverbs', 'Conversational', 'Travel Prep'],
    availability: {
      Tuesday: ['09:00', '13:00', '15:00', '18:00'],
      Thursday: ['09:00', '13:00', '15:00', '18:00'],
      Saturday: ['09:00', '11:00', '14:00']
    }
  },
  {
    id: 't3',
    name: 'Mpho Khumalo',
    avatar: 'MK',
    role: 'Bilingual Corporate Sesotho Tutor',
    rating: 4.7,
    reviewsCount: 16,
    hourlyRate: 16,
    completedLessons: 41,
    country: 'South_Africa' as any, // Standardize to type
    location: 'Johannesburg, South Africa',
    bio: 'Unlocking language is unlocking doors! Representing South Africa\'s vibrant Sotho-speaking communities, I specialize in professional Sesotho used in business settings, government, and urban communication. Ideal for advanced learners.',
    specialties: ['Business Sotho', 'Professional Vocabulary', 'Adult Beginners'],
    availability: {
      Monday: ['17:00', '18:00', '19:00'],
      Tuesday: ['17:00', '18:00', '19:00'],
      Thursday: ['17:00', '18:00', '19:00'],
      Friday: ['16:00', '17:00', '18:00']
    }
  },
  {
    id: 't4',
    name: 'Tshepo Moloi',
    avatar: 'TM',
    role: 'Primary School Teacher & Child Educator',
    rating: 5.0,
    reviewsCount: 56,
    hourlyRate: 20,
    completedLessons: 312,
    country: 'South Africa',
    location: 'Phuthaditjhaba, South Africa',
    bio: 'Khotso! I have been a high school Sesotho teacher for 12 years. I know all the common grammatical roadblocks and have designed simple learning frameworks to overcome them. I welcome all novice speakers from ground zero.',
    specialties: ['Absolute Beginners', 'Grammar Essentials', 'Literature & Reading', 'Kids Course'],
    availability: {
      Wednesday: ['13:00', '15:00', '17:00', '19:00'],
      Friday: ['13:00', '15:00', '17:00', '19:00'],
      Sunday: ['10:00', '13:00', '15:00']
    }
  },
  {
    id: 't5',
    name: 'Kekeletso Makhetha',
    avatar: 'KM',
    role: 'Friendly Conversationalist & Tour Guide',
    rating: 4.9,
    reviewsCount: 23,
    hourlyRate: 12,
    completedLessons: 68,
    country: 'Lesotho',
    location: 'Leribe, Lesotho',
    bio: 'Lumela! As a local eco-tour guide, I communicate with people daily. I have a relaxed, conversational approach to teaching. We will talk about Sotho food, breathtaking mountain hikes, and traditional music while mastering real, practical Sotho.',
    specialties: ['Conversational', 'Sotho Culture & Arts', 'Travel & Dining Sotho'],
    availability: {
      Monday: ['09:00', '10:00', '12:00', '15:00'],
      Tuesday: ['09:00', '10:00', '13:00', '14:00'],
      Wednesday: ['09:00', '10:00', '14:00', '15:00'],
      Thursday: ['10:00', '11:00', '13:00', '15:00']
    }
  }
];

export const MATERIALS: Material[] = [
  {
    id: 'm1',
    title: 'Everyday Sesotho Handbook',
    type: 'ebook',
    description: 'The ultimate survival handbook for Southern Sotho. Contains practical checklists, grammatical references, and custom vocabulary tables for immediate deployment in Maseru and the Free State.',
    author: 'Lerato Mofokeng',
    price: 9.99,
    rating: 4.8,
    sales: 142,
    image: '📘'
  },
  {
    id: 'm2',
    title: 'Standard Pronunciation Masterclass (Audio MP3 Pack)',
    type: 'audio',
    description: 'Listen and repeat! Includes 18 crystal-clear, high-quality native recordings walking through phonetic vowels, clicks, and tricky sibilants that define Sotho accent clarity.',
    author: 'Sello Ndlovu',
    price: 14.50,
    rating: 4.9,
    sales: 89,
    image: '🎧'
  },
  {
    id: 'm3',
    title: 'Sotho cultural proverbs & idiomatic flashcards',
    type: 'flashcard',
    description: 'Get deep in the culture. A physical and interactive digital set of 60 common "Maele" (proverbs) with English equivalence explanations and animal representations.',
    author: 'Sello Ndlovu',
    price: 6.99,
    rating: 5.0,
    sales: 104,
    image: '🎴'
  },
  {
    id: 'm4',
    title: 'Sesotho Grammar Blueprint (Step-by-Step)',
    type: 'grammar',
    description: 'Understand Sotho verb conjugations, noun classes (with prefix rules!), and sentence structure. Demystifies grammar with side-by-side comparative translations.',
    author: 'Tshepo Moloi',
    price: 11.99,
    rating: 4.7,
    sales: 65,
    image: '📝'
  }
];

export const PHRASES: Phrase[] = [
  {
    id: 'p1',
    category: 'Greetings & Basics',
    sotho: 'Lumela, u phela joang?',
    english: 'Hello, how are you?',
    pronunciation: 'loo-meh-lah, oo peh-lah joahng?',
    breakdown: 'Lumela (Hello) + u (you) + phela (live/are) + joang (how)',
    audioText: 'Lumela, u phela joang?'
  },
  {
    id: 'p2',
    category: 'Greetings & Basics',
    sotho: 'Ke phela hantle, le uena?',
    english: 'I live well, and you?',
    pronunciation: 'keh peh-lah han-tleh, leh ueh-nah?',
    breakdown: 'Ke (I) + phela (live) + hantle (well) + le (and/with) + uena (you)',
    audioText: 'Ke phela hantle, le uena?'
  },
  {
    id: 'p3',
    category: 'Greetings & Basics',
    sotho: 'Ke a leboha',
    english: 'Thank you',
    pronunciation: 'keh ah leh-boh-hah',
    breakdown: 'Ke (I) + a (verb marker) + leboha (thank/appreciate)',
    audioText: 'Ke a leboha'
  },
  {
    id: 'p4',
    category: 'Greetings & Basics',
    sotho: 'Lebitso la ka ke Thabo',
    english: 'My name is Thabo',
    pronunciation: 'leh-bee-tsoh lah kah keh tah-boh',
    breakdown: 'Lebitso (Name) + la ka (my) + ke (is) + Thabo (name)',
    audioText: 'Lebitso la ka ke Thabo'
  },
  {
    id: 'p5',
    category: 'Travel & Dining',
    sotho: 'Ke kopa metsi a rona',
    english: 'I request water for us / May I please have some water',
    pronunciation: 'keh koh-pah meh-tsee ah roh-nah',
    breakdown: 'Ke (I) + kopa (ask/request) + metsi (water) + a rona (our/for us)',
    audioText: 'Ke kopa metsi a rona'
  },
  {
    id: 'p6',
    category: 'Travel & Dining',
    sotho: 'Lijo tsena li monate haholo!',
    english: 'This food is very delicious!',
    pronunciation: 'lee-joh tseh-nah lee moh-nah-teh hah-hoh-loh!',
    breakdown: 'Lijo (Food) + tsena (this) + li (verb linker) + monate (tasty) + haholo (very much)',
    audioText: 'Lijo tsena li monate haholo!'
  },
  {
    id: 'p7',
    category: 'Travel & Dining',
    sotho: 'Habeli, ke kopa chelete ea ka ea phetoho',
    english: 'Excuse me, may I please have my change',
    pronunciation: 'hah-beh-lee, keh koh-pah cheh-leh-teh eh-ah kah eh-ah peh-toh-hoh',
    breakdown: 'Habeli (Excuse me) + ke kopa (I request) + chelete (money) + ea ka (my) + ea phetoho (of change)',
    audioText: 'Ke kopa chelete ea ka ea phetoho'
  },
  {
    id: 'p8',
    category: 'Asking for Help',
    sotho: 'Ke kopa thuso, ke lahlehile',
    english: 'I request help, I am lost',
    pronunciation: 'keh koh-pah too-soh, keh lah-leh-hee-leh',
    breakdown: 'Ke kopa (I request) + thuso (help) + ke (I) + lahlehile (lost/mislaid)',
    audioText: 'Ke kopa thuso, ke lahlehile'
  },
  {
    id: 'p9',
    category: 'Asking for Help',
    sotho: 'Na u bua Se-English?',
    english: 'Do you speak English?',
    pronunciation: 'nah oo boo-ah seh-eeng-glesh?',
    breakdown: 'Na (Question particle) + u (you) + bua (speak) + Se-English (English language)',
    audioText: 'Na u bua Se-English?'
  },
  {
    id: 'p10',
    category: 'Asking for Help',
    sotho: 'Ke kopa u bue butle, hle',
    english: 'Please speak slowly, please',
    pronunciation: 'keh koh-pah oo boo-eh boo-tleh, hleh',
    breakdown: 'Ke kopa (I request) + u bue (you speak) + butle (slowly) + hle (please - emphatic)',
    audioText: 'Ke kopa u bue butle, hle'
  },
  {
    id: 'p11',
    category: 'Numbers & Shopping',
    sotho: 'Sena se ja bokae?',
    english: 'How much does this cost?',
    pronunciation: 'seh-nah seh jah boh-ka-eh?',
    breakdown: 'Sena (this) + se ja (it consumes/eats) + bokae (how much)',
    audioText: 'Sena se ja bokae?'
  },
  {
    id: 'p12',
    category: 'Numbers & Shopping',
    sotho: 'Ke kopa ho reka sena',
    english: 'I want to buy this',
    pronunciation: 'keh koh-pah hoh reh-kah seh-nah',
    breakdown: 'Ke kopa (I ask/wish) + ho reka (to buy) + sena (this)',
    audioText: 'Ke kopa ho reka sena'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'How do you say "Hello" to a group of people in Sesotho?',
    options: ['Lumela', 'Lumelang', 'Sala hantle', 'Khotso hantle'],
    correctAnswer: 'Lumelang',
    explanation: '"Lumela" is singular (to one person). Adding the suffix "-ng" makes it plural: "Lumelang" is used when greeting a group.'
  },
  {
    id: 'q2',
    question: 'What is the literal meaning of the common cost query "Sena se ja bokae"?',
    options: ['Where is this located?', 'Who cooked this?', 'How much does this eat?', 'Do you have another of this?'],
    correctAnswer: 'How much does this eat?',
    explanation: 'In Sesotho, the phrase "se ja bokae" literally translates to "how much does it eat/consume", referring to the financial depletion (price) of buying it!'
  },
  {
    id: 'q3',
    question: 'If you are leaving a friend\'s house, what is the polite way to say goodbye to them while they stay?',
    options: ['Tsamaea hantle', 'U phela joang', 'Ke phela hantle', 'Sala hantle'],
    correctAnswer: 'Sala hantle',
    explanation: '"Sala hantle" literally translates to "remain well". If you are the one leaving and they are staying, you say "Sala hantle". If they are leaving, you say "Tsamaea hantle" (Go well).'
  },
  {
    id: 'q4',
    question: 'What is "Ke kopa thuso" in English?',
    options: ['I want to buy bread', 'I request assistance / please help me', 'I am going home', 'Thank you very much'],
    correctAnswer: 'I request assistance / please help me',
    explanation: '"Ke kopa" means "I ask/request" and "thuso" means "help". Together, it creates the essential survival phrase "Please help me".'
  },
  {
    id: 'q5',
    question: 'What does the word "Metsi" mean?',
    options: ['Food', 'Road', 'Water', 'Money'],
    correctAnswer: 'Water',
    explanation: '"Metsi" means water, highly essential in Lesotho\'s pristine high lands!'
  }
];
