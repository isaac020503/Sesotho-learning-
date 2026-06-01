export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  completedLessons: number;
  country: 'Lesotho' | 'South Africa';
  location: string;
  bio: string;
  specialties: string[];
  availability: { [day: string]: string[] };
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  date: string;
  time: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Material {
  id: string;
  title: string;
  type: 'ebook' | 'audio' | 'flashcard' | 'grammar';
  description: string;
  author: string;
  price: number;
  rating: number;
  sales: number;
  image: string;
  isPurchased?: boolean;
}

export interface Phrase {
  id: string;
  category: string;
  sotho: string;
  english: string;
  pronunciation: string;
  breakdown: string;
  audioText: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  translation?: string;
  grammarTips?: string;
}
