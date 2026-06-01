import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types.ts';
import { Send, Sparkles, MessageSquare, User, Loader2, Play, Volume2, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiPartnerChatProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isGenerating: boolean;
  apiKeyError: string | null;
}

export default function AiPartnerChat({
  messages,
  onSendMessage,
  isGenerating,
  apiKeyError
}: AiPartnerChatProps) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    
    onSendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (phraseText: string) => {
    if (isGenerating) return;
    onSendMessage(phraseText);
  };

  // Speaks aloud the Sotho part of Sanya's response using standard SpeechSynthesis Utterance
  const speakSothoPart = (fullText: string) => {
    // Typically Sanya returns Sotho first, followed by [English translation]
    // Let's grab the text prior to any brackets
    const sothoPart = fullText.split('[')[0].trim() || fullText;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sothoPart);
      utterance.rate = 0.85;
      
      const voices = window.speechSynthesis.getVoices();
      const localizedVoice = voices.find(v => 
        v.lang.includes('st-ZA') || 
        v.lang.includes('ns-ZA') || 
        v.lang.includes('en-ZA')
      );
      if (localizedVoice) {
        utterance.voice = localizedVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert("TTS speaker not fully supported in this browser. You can read the phonetic translation!");
    }
  };

  // Floating fast phrases user can tap to chat
  const quickChips = [
    "Lumela Sanya! U phela joang?", // Hello Sanya! How are you?
    "Ke batla ho ithuta Sesotho",    // I want to learn Sesotho
    "Nka bua joang 'How are you'?", // How do I say 'How are you'?
    "Ke kopa motho ho nkhothatsa",  // Please support/encourage me
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden" id="ai-chat-interface">
      {/* Bot Header details */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 flex items-center justify-center font-bold text-slate-950">
              👩🏽
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-slate-900" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-white flex items-center space-x-1.5">
              <span>Sanya</span>
              <span className="text-[10px] bg-amber-500/25 border border-amber-500/35 text-amber-300 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded font-mono">
                AI Sotho Tutor
              </span>
            </h4>
            <span className="text-[10px] text-slate-350 font-normal">Active Practice Partner • Corrects Grammar & Pronounces</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-1 border border-slate-700 rounded-full px-2.5 py-1 bg-slate-800/40 font-mono text-[9px] text-slate-350">
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Active Practice (3.5 Flash)</span>
        </div>
      </div>

      {/* Chat Conversation Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40" id="ai-chat-scroller">
        
        {/* Welcome message bubble */}
        <div className="flex gap-3 max-w-[85%]">
          <div className="h-8 w-8 rounded-full bg-amber-500/10 text-xs flex items-center justify-center shrink-0">
            👩🏽
          </div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm text-slate-800 text-xs space-y-2 leading-relaxed">
            <p className="font-bold text-slate-950">Khotso! (Greetings!)</p>
            <p>
              I am <strong>Sanya</strong>, your dedicated Southern Sesotho companion. Feel free to say <em>"Lumela"</em>, share sentences in Sotho, or ask any grammar questions. I will correct your mistakes and guide you with translated outputs!
            </p>
            <p className="text-[10px] text-slate-400 font-semibold font-mono">Suggested: Tap a fast response card below to kickstart!</p>
          </div>
        </div>

        {/* Dialogue history bubbles list */}
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              id={`chat-bubble-${m.id}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                isUser ? 'bg-slate-900 text-white' : 'bg-amber-500/10 text-slate-800'
              }`}>
                {isUser ? <User className="h-4 w-4" /> : '👩🏽'}
              </div>
              
              <div className={`rounded-2xl border p-4 shadow-sm text-xs leading-relaxed ${
                isUser 
                  ? 'bg-slate-900 border-slate-900 text-white font-medium' 
                  : 'bg-white border-slate-205 text-slate-800 space-y-3'
              }`}>
                {/* Parse lines beautifully */}
                <div className="whitespace-pre-line prose max-w-none text-xs">
                  {m.text}
                </div>

                {!isUser && (
                  <div className="flex justify-between items-center border-t border-slate-100 pt-2 bg-slate-50/50 rounded p-1">
                    <span className="text-[9px] text-slate-450 uppercase font-mono tracking-wider">Pronunciation Voice Synthesis</span>
                    <button
                      onClick={() => speakSothoPart(m.text)}
                      className="inline-flex items-center space-x-1 text-[10px] text-amber-700 font-bold hover:text-amber-800"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>Speak Phrase</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading generation placeholder state */}
        {isGenerating && (
          <div className="flex gap-3 max-w-[85%]" id="loading-bubbles">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              👩🏽
            </div>
            <div className="rounded-2xl border bg-white p-4 shadow-sm text-slate-505 flex items-center space-x-2 text-xs">
              <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />
              <span className="text-slate-500">Sanya is thinking & speaking...</span>
            </div>
          </div>
        )}

        {/* Gemini API Key missing error alert box */}
        {apiKeyError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 max-w-md mx-auto space-y-3 shadow-sm text-xs" id="api-key-error-card">
            <div className="flex items-start space-x-2.5">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-red-950 font-sans">Gemini API Key Missing</h5>
                <p className="text-red-800 mt-1">
                  The artificial Sello brain is offline because there is no API key configured. Sanya will still listen, but to receive responses, verify your environment.
                </p>
                <div className="rounded bg-white/70 border border-red-100/50 p-2 text-[10px] font-mono text-red-900 mt-2 font-medium">
                  Define GEMINI_API_KEY in the Secrets / Settings dashboard.
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Option chips row */}
      <div className="border-t border-slate-150 px-3 py-2 bg-slate-50/50 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0" id="ai-chat-quick-chips">
        {quickChips.map((phrase) => (
          <button
            key={phrase}
            onClick={() => handleChipClick(phrase)}
            disabled={isGenerating}
            className="rounded-lg bg-white border px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 transition-all cursor-pointer shrink-0"
          >
            {phrase}
          </button>
        ))}
      </div>

      {/* Input controls form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 flex gap-2 shrink-0 bg-white" id="ai-chat-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isGenerating ? "Please wait..." : "Type message in Sotho or English..."}
          disabled={isGenerating}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-amber-500 disabled:opacity-60 transition"
          id="chat-input-field"
        />
        <button
          type="submit"
          disabled={isGenerating || !inputText.trim()}
          className={`rounded-xl p-2.5 text-white shadow-md transition-all flex items-center justify-center ${
            inputText.trim() && !isGenerating
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/10 hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
          id="chat-send-btn"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
