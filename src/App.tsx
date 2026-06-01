import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import TutorsMarketplace from './components/TutorsMarketplace.tsx';
import MaterialsMarketplace from './components/MaterialsMarketplace.tsx';
import Phrasebook from './components/Phrasebook.tsx';
import LanguageQuiz from './components/LanguageQuiz.tsx';
import AiPartnerChat from './components/AiPartnerChat.tsx';
import Dashboards from './components/Dashboards.tsx';
import { Booking, Message } from './types.ts';
import { GraduationCap, BookOpen, Award, User, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Default preloaded mock states
const INITIAL_BOOKING: Booking = {
  id: 'b-default',
  tutorId: 't2',
  tutorName: 'Sello Ndlovu',
  tutorAvatar: 'SN',
  date: 'Next Tuesday',
  time: '13:00',
  price: 18,
  status: 'upcoming'
};

const INITIAL_MESSAGES: Message[] = [];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('marketplace');
  const [userRole, setUserRole] = useState<'student' | 'tutor'>('student');
  
  // Persistent localStorage sync states
  const [userPoints, setUserPoints] = useState<number>(() => {
    const cached = localStorage.getItem('sotho_user_points');
    return cached ? parseInt(cached, 10) : 150;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const cached = localStorage.getItem('sotho_bookings');
    return cached ? JSON.parse(cached) : [INITIAL_BOOKING];
  });

  const [purchasedMaterialIds, setPurchasedMaterialIds] = useState<string[]>(() => {
    const cached = localStorage.getItem('sotho_purchased_materials');
    return cached ? JSON.parse(cached) : ['m1']; // pre-unlock first ebook m1 for premium feel!
  });

  const [chatMessages, setChatMessages] = useState<Message[]>(() => {
    const cached = localStorage.getItem('sotho_chat_messages');
    return cached ? JSON.parse(cached) : INITIAL_MESSAGES;
  });

  // API Call state
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  // Sync states to local storage
  useEffect(() => {
    localStorage.setItem('sotho_user_points', userPoints.toString());
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('sotho_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('sotho_purchased_materials', JSON.stringify(purchasedMaterialIds));
  }, [purchasedMaterialIds]);

  useEffect(() => {
    localStorage.setItem('sotho_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleScoreIncrement = (score: number) => {
    setUserPoints(prev => prev + score);
  };

  const handleBookingCreated = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    // Also reward 30 points for booking a real native class slot!
    setUserPoints(prev => prev + 30);
  };

  const handlePurchased = (materialId: string) => {
    if (!purchasedMaterialIds.includes(materialId)) {
      setPurchasedMaterialIds(prev => [...prev, materialId]);
      // Reward 20 points!
      setUserPoints(prev => prev + 20);
    }
  };

  const handleSendMessage = async (inputText: string) => {
    const userMsg: Message = {
      id: `m-u-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setIsGenerating(true);
    setApiKeyError(null);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || errData.details || 'Connection failed.');
      }

      const data = await response.json();
      
      const sanyaMsg: Message = {
        id: `m-s-${Date.now()}`,
        sender: 'gemini',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, sanyaMsg]);
      // Give a small bonus point encouragement (+5 LingoPts) for conversation practice!
      setUserPoints(prev => prev + 5);

    } catch (err: any) {
      console.error('Chat routing error:', err);
      setApiKeyError(err.message || 'Unable to establish secure connection to Sanya.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" id="app-root-container">
      {/* Header bar component */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        userPoints={userPoints}
      />

      {/* Main Container contents */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in" id="workspace-main">
        
        {/* Banner Section - only visible in Find Tutors and Store tabs */}
        {(currentTab === 'marketplace' || currentTab === 'materials') && (
          <Hero />
        )}

        {/* Tab content workspace wrapper */}
        <div className="transition-all duration-300">
          <AnimatePresence mode="wait">
            {currentTab === 'marketplace' && (
              <motion.div
                key="marketplace-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <TutorsMarketplace onBookingCreated={handleBookingCreated} />
              </motion.div>
            )}

            {currentTab === 'materials' && (
              <motion.div
                key="materials-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <MaterialsMarketplace
                  purchasedMaterialIds={purchasedMaterialIds}
                  onPurchased={handlePurchased}
                />
              </motion.div>
            )}

            {currentTab === 'phrasebook' && (
              <motion.div
                key="phrasebook-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <Phrasebook />
              </motion.div>
            )}

            {currentTab === 'practice' && (
              <motion.div
                key="practice-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <LanguageQuiz onScoreIncrement={handleScoreIncrement} />
              </motion.div>
            )}

            {currentTab === 'ai-chat' && (
              <motion.div
                key="ai-chat-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <AiPartnerChat
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  isGenerating={isGenerating}
                  apiKeyError={apiKeyError}
                />
              </motion.div>
            )}

            {currentTab === 'dashboard' && (
              <motion.div
                key="dashboard-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <Dashboards
                  userRole={userRole}
                  bookings={bookings}
                  purchasedMaterialIds={purchasedMaterialIds}
                  userPoints={userPoints}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-200 bg-white py-6" id="app-footer">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs font-medium text-slate-500 font-mono">
            Puisano Sesotho Marketplace Protocol • 2026-05-31
          </p>
          <p className="text-[10px] text-slate-400">
            Connecting Lesotho and South Africa Sotho linguistic societies. Supported by server side Gemini 3.5 AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
