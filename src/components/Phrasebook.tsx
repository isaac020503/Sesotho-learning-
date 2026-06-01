import React, { useState } from 'react';
import { PHRASES } from '../data.ts';
import { Phrase } from '../types.ts';
import { Volume2, Play, Search, Map, RefreshCw, Sparkles, HelpCircle, BookOpen, Languages, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Syllabary data mirroring user-provided Lesotho vowel sounds and phonetic transformations
const SYLLABARY_GROUPS = [
  {
    title: "1. Core Vowels (Meloli ya Sehlooho)",
    description: "Southern Sesotho has 5 core vowel symbols expressing distinct visual qualities. Pronunciation remains pure and crisp.",
    items: [
      { id: 'v1', syllable: 'a', approxSound: '[ah] as in father', example: 'amana', exampleMeaning: 'to relate / touch' },
      { id: 'v2', syllable: 'e', approxSound: '[eh] as in red or [ay] in say', example: 'leoto', exampleMeaning: 'leg / foot' },
      { id: 'v3', syllable: 'i', approxSound: '[ee] as in meet', example: 'phiri', exampleMeaning: 'hyena' },
      { id: 'v4', syllable: 'o', approxSound: '[oh] as in slow or [oo] as in put', example: 'ho lora', exampleMeaning: 'to dream' },
      { id: 'v5', syllable: 'u', approxSound: '[oo] as in food', example: 'pula', exampleMeaning: 'rain' },
    ]
  },
  {
    title: "2. The S-Series (Moloko wa Thaba tsa S)",
    description: "Sibilant s-consonant combinations merged with the five core Sotho vowels.",
    items: [
      { id: 's1', syllable: 'sa', approxSound: '[sah] as in sun', example: 'Sanya', exampleMeaning: 'Sanya (our AI companion)' },
      { id: 's2', syllable: 'se', approxSound: '[seh] as in sell', example: 'selo', exampleMeaning: 'object / thing' },
      { id: 's3', syllable: 'si', approxSound: '[see] as in seed', example: 'sika', exampleMeaning: 'boundary' },
      { id: 's4', syllable: 'so', approxSound: '[soh] as in soul', example: 'sona', exampleMeaning: 'it (class pronoun)' },
      { id: 's5', syllable: 'su', approxSound: '[soo] as in soup', example: 'ho sunya', exampleMeaning: 'to insert / slip in' },
    ]
  },
  {
    title: "3. The L-Series (Series ya L - Standard Lesotho)",
    description: "CRITICAL: Lesotho standard orthography writes 'l' before 'u' and 'i' (e.g. 'lumela', 'lijo', 'lu'). South African orthography replaces these with 'd' (e.g. 'dumela', 'dijo', 'du'). We use 'lu' instead of 'du'!",
    items: [
      { id: 'l1', syllable: 'la', approxSound: '[lah] as in laugh', example: 'lapeng', exampleMeaning: 'at home' },
      { id: 'l2', syllable: 'le', approxSound: '[leh] as in let', example: 'leleme', exampleMeaning: 'tongue / language' },
      { id: 'l3', syllable: 'li', approxSound: '[lee] (not "di")', example: 'lijo', exampleMeaning: 'food' },
      { id: 'l4', syllable: 'lo', approxSound: '[loh] as in low', example: 'ho lora', exampleMeaning: 'to dream' },
      { id: 'l5', syllable: 'lu', approxSound: '[loo] (not "du")', example: 'Lumela', exampleMeaning: 'hello / greet' },
    ]
  },
  {
    title: "4. The O-Series Mergers",
    description: "Vowel blends and glide combinations beginning with 'o', acting like an English 'w' glide.",
    items: [
      { id: 'o1', syllable: 'oa', approxSound: '[wah] as in wash', example: 'ho oa', exampleMeaning: 'to fall' },
      { id: 'o2', syllable: 'oe', approxSound: '[weh] as in wet', example: 'oela', exampleMeaning: 'to fall into' },
      { id: 'o3', syllable: 'oi', approxSound: '[wee] as in week', example: 'koila', exampleMeaning: 'to twist / strain' },
      { id: 'o4', syllable: 'oo', approxSound: '[oh-oh] or [oo-oo]', example: 'looba', exampleMeaning: 'to hide / conceal' },
      { id: 'o5', syllable: 'ou', approxSound: '[oh-oo] blended', example: 'poutla', exampleMeaning: 'to puff / blow' },
    ]
  },
  {
    title: "5. The U-Series Mergers",
    description: "Close-vowel glide combinations beginning with the standard 'u' sound.",
    items: [
      { id: 'u1', syllable: 'ua', approxSound: '[ooh-ah] blended', example: 'ho rua', exampleMeaning: 'to possess / own' },
      { id: 'u2', syllable: 'ue', approxSound: '[ooh-eh] blended', example: 'luela', exampleMeaning: 'to advocate for' },
      { id: 'u3', syllable: 'ui', approxSound: '[ooh-ee] blended', example: 'kuiqa', exampleMeaning: 'to squeeze tightly' },
      { id: 'u4', syllable: 'uo', approxSound: '[ooh-oh] blended', example: 'ruuoa', exampleMeaning: 'to be owned' },
      { id: 'u5', syllable: 'uu', approxSound: '[ooh-ooh] lengthened', example: 'ruuu', exampleMeaning: 'smooth whisper sound' },
    ]
  },
  {
    title: "6. The E-Series Mergers",
    description: "Vowel blends starting with 'e', frequently sounding as a light 'y' semi-vocalic glide.",
    items: [
      { id: 'e1', syllable: 'ea', approxSound: '[yah] as in yard', example: 'eena', exampleMeaning: 'he / she' },
      { id: 'e2', syllable: 'ee', approxSound: '[eh-eh] lengthened', example: 'eela', exampleMeaning: 'to flow / clear up' },
      { id: 'e3', syllable: 'ei', approxSound: '[ay-ee] blended', example: 'leipone', exampleMeaning: 'mirror' },
      { id: 'e4', syllable: 'eo', approxSound: '[yaw] as in yawn', example: 'leoto', exampleMeaning: 'leg / foot' },
      { id: 'e5', syllable: 'eu', approxSound: '[ay-oo] blended', example: 'loeu', exampleMeaning: 'white colour' },
    ]
  },
  {
    title: "7. The A-Series Mergers",
    description: "Open vowel glide combinations launching with 'a' and merging into smooth diphthongs.",
    items: [
      { id: 'a1', syllable: 'aa', approxSound: '[ah-ah] double length', example: 'ho baala', exampleMeaning: 'readers' },
      { id: 'a2', syllable: 'ae', approxSound: '[eye] as in nice', example: 'kae', exampleMeaning: 'where' },
      { id: 'a3', syllable: 'ai', approxSound: '[ah-ee] blended', example: 'ho kaila', exampleMeaning: 'to cry out loud' },
      { id: 'a4', syllable: 'ao', approxSound: '[ow] as in cow', example: 'tsao', exampleMeaning: 'yours (plural)' },
      { id: 'a5', syllable: 'au', approxSound: '[ow] as in loud', example: 'tau', exampleMeaning: 'lion' },
    ]
  }
];

export default function Phrasebook() {
  const [activeTab, setActiveTab] = useState<'phrases' | 'syllabary'>('phrases');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speakingSyllableId, setSpeakingSyllableId] = useState<string | null>(null);

  const categories = ['All', 'Greetings & Basics', 'Travel & Dining', 'Asking for Help', 'Numbers & Shopping'];

  const filteredPhrases = PHRASES.filter(phrase => {
    const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
    const matchesSearch = phrase.sotho.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phrase.breakdown.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (phrase: Phrase) => {
    setSpeakingId(phrase.id);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(phrase.audioText);
      utterance.rate = 0.85; // Natural slow teaching tempo
      
      const voices = window.speechSynthesis.getVoices();
      const localizedVoice = voices.find(voice => 
        voice.lang.includes('st-ZA') || 
        voice.lang.includes('ns-ZA') || 
        voice.lang.includes('zu-ZA') || 
        voice.lang.includes('en-ZA')
      );
      
      if (localizedVoice) {
        utterance.voice = localizedVoice;
      }

      utterance.onend = () => {
        setSpeakingId(null);
      };

      utterance.onerror = () => {
        setSpeakingId(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setSpeakingId(null);
      }, 1500);
    }
  };

  const handlePlaySyllable = (id: string, syllable: string, example: string) => {
    setSpeakingSyllableId(id);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Spell the sound combination slowly, then say the example word
      const utterance = new SpeechSynthesisUtterance(`${syllable}. For example, ${example}`);
      utterance.rate = 0.70; // extra clear and slow for syllables
      
      const voices = window.speechSynthesis.getVoices();
      const localizedVoice = voices.find(voice => 
        voice.lang.includes('st-ZA') || 
        voice.lang.includes('ns-ZA') || 
        voice.lang.includes('zu-ZA') || 
        voice.lang.includes('en-ZA')
      );
      
      if (localizedVoice) {
        utterance.voice = localizedVoice;
      }

      utterance.onend = () => {
        setSpeakingSyllableId(null);
      };

      utterance.onerror = () => {
        setSpeakingSyllableId(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setSpeakingSyllableId(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8" id="phrasebook-workspace">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold text-2xl text-slate-950">Essential Sesotho Phrasebook & sound training</h3>
          <p className="text-sm text-slate-500 mt-1">Master pronunciation with native audio synthesis and standard spelling patterns.</p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex border-b border-slate-200" id="phrasebook-main-tabs">
        <button
          onClick={() => setActiveTab('phrases')}
          className={`flex items-center space-x-2 pb-4 pt-1 px-4 font-sans text-sm font-extrabold transition-all border-b-2 relative ${
            activeTab === 'phrases'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
          id="tab-btn-phrases"
        >
          <BookOpen className="h-4.5 w-4.5" />
          <span>Everyday Phrases</span>
        </button>
        <button
          onClick={() => setActiveTab('syllabary')}
          className={`flex items-center space-x-2 pb-4 pt-1 px-4 font-sans text-sm font-extrabold transition-all border-b-2 relative ${
            activeTab === 'syllabary'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
          id="tab-btn-syllabary"
        >
          <Languages className="h-4.5 w-4.5" />
          <span>Vowel & Sound Masterclass</span>
          <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90">SYLLABLES</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'phrases' ? (
          <motion.div
            key="phrases-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Southern Sesotho Orthography Guide Banner */}
            <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/60 border border-amber-200/40 rounded-2xl p-5" id="orthography-guide-banner">
              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 self-start shrink-0">
                  <Map className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans font-extrabold text-sm text-slate-900 flex items-center gap-1.5 wrap flex-wrap">
                    <span>Standard Southern Sesotho (Lesotho Orthography)</span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Standardized</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This application strictly implements <strong>Southern Sesotho</strong> in its original written form (Lesotho standard). Southern Sesotho makes a strict orthographic distinction between certain pronouns and plurals compared to the South African variant:
                  </p>
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-500/5">
                      <span className="text-[10px] text-slate-400 block font-mono font-bold tracking-tight">HELLO</span>
                      <span className="text-xs text-amber-900 font-extrabold block mt-0.5">Lumela <span className="text-slate-400 font-normal">vs.</span> dumela</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-500/5">
                      <span className="text-[10px] text-slate-400 block font-mono font-bold tracking-tight">HOW / WHEN</span>
                      <span className="text-xs text-amber-900 font-extrabold block mt-0.5">joang <span className="text-slate-400 font-normal">vs.</span> jwang</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-500/5">
                      <span className="text-[10px] text-slate-400 block font-mono font-bold tracking-tight">YOU (ABSOLUTE)</span>
                      <span className="text-xs text-amber-900 font-extrabold block mt-0.5">uena <span className="text-slate-400 font-normal">vs.</span> wena</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-500/5">
                      <span className="text-[10px] text-slate-400 block font-mono font-bold tracking-tight">YOU (2ND PERSON)</span>
                      <span className="text-xs text-amber-900 font-extrabold block mt-0.5">u <span className="text-slate-400 font-normal">vs.</span> o</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-500/5">
                      <span className="text-[10px] text-slate-400 block font-mono font-bold tracking-tight font-semibold tracking-tight">PLURAL PREFIXES</span>
                      <span className="text-xs text-amber-900 font-extrabold block mt-0.5">lijo, libuka <span className="text-slate-400 font-normal">vs.</span> dijo, dibuka</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">
                    Notice that standard Lesotho orthography writes "u" for "you" (2nd person singular Concord) while reserving "o" for class 1 pronouns (he/she). It also retains "li-/lib-" class plural prefixes instead of converting them to "di-/dib-".
                  </p>
                </div>
              </div>
            </div>

            {/* Control panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search words, English translation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 hover:bg-slate-50 transition"
                  id="phrasebook-search"
                />
              </div>

              {/* Categories togglers row */}
              <div className="md:col-span-8 flex overflow-x-auto gap-2 pb-1" id="phrasebook-categories">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap border shrink-0 transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 border-amber-500 text-white shadow-sm shadow-amber-500/25'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of cards */}
            {filteredPhrases.length === 0 ? (
              <div className="rounded-2xl border border-dashed text-center py-16 px-4 bg-white" id="no-phrase-results">
                <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <h4 className="font-sans font-bold text-slate-900">No Phrases Match Your Query</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Try resetting the selection criteria or simplify your search keyword.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="phrases-grid">
                {filteredPhrases.map((phrase: Phrase) => {
                  const isSpeaking = speakingId === phrase.id;
                  return (
                    <div
                      key={phrase.id}
                      className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      id={`phrase-card-${phrase.id}`}
                    >
                      <div>
                        {/* Card category tags */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                            {phrase.category}
                          </span>
                          {isSpeaking && (
                            <div className="flex items-center space-x-0.5" id="audio-waveform-simulation">
                              <span className="h-2 w-0.5 rounded bg-amber-500 animate-[pulse_0.4s_infinite_alternate]" />
                              <span className="h-4 w-0.5 rounded bg-amber-500 animate-[pulse_0.3s_infinite_alternate_0.1s]" />
                              <span className="h-3 w-0.5 rounded bg-amber-500 animate-[pulse_0.5s_infinite_alternate_0.2s]" />
                              <span className="h-1.5 w-0.5 rounded bg-amber-500 animate-[pulse_0.4s_infinite_alternate_0.1s]" />
                            </div>
                          )}
                        </div>

                        {/* Sotho bold text */}
                        <div className="mt-3">
                          <h4 className="font-sans text-lg font-extrabold text-slate-950 flex items-center justify-between">
                            <span className="text-amber-800">{phrase.sotho}</span>
                          </h4>
                          <p className="text-xs text-slate-500 font-medium font-mono italic mt-0.5">
                            Phonetic: [{phrase.pronunciation}]
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="my-3 border-t border-slate-100" />

                        {/* English Translation */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-semibold block">English</span>
                          <p className="text-xs text-slate-800 font-semibold">{phrase.english}</p>
                        </div>

                        {/* Word-by-word Breakdown */}
                        <div className="mt-3.5 rounded-lg bg-orange-50/45 p-2.5 border border-orange-500/10">
                          <div className="flex items-center space-x-1">
                            <Sparkles className="h-3 w-3 text-amber-600" />
                            <span className="text-[9px] text-amber-900 font-mono font-bold uppercase tracking-wide">Structural Breakdown</span>
                          </div>
                          <p className="text-[10px] text-slate-600 font-medium leading-relaxed mt-1">
                            {phrase.breakdown}
                          </p>
                        </div>
                      </div>

                      {/* Speaker play overlay button */}
                      <div className="mt-5 border-t border-slate-100 pt-3 flex justify-end">
                        <button
                          onClick={() => handleSpeak(phrase)}
                          className={`flex items-center space-x-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition ${
                            isSpeaking
                              ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {isSpeaking ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              <span>Speaking...</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3.5 w-3.5 text-amber-500 group-hover:scale-110 transition shrink-0" />
                              <span>Listen Aloud</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="syllabary-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Explanatory introduction block */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden" id="syllabary-intro">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Music className="h-32 w-32" />
              </div>
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Interactive Sesotho Vowel Guideline</span>
                </div>
                <h4 className="font-sans font-extrabold text-xl tracking-tight text-white">
                  Sesotho Vowel Combinations & Phonetic Grid Map
                </h4>
                <p className="text-xs text-slate-350 leading-relaxed">
                  Southern Sesotho utilizes five core phonetic vowels (<em>a, e, i, o, u</em>) that blend beautifully with consonant classes like <strong>S</strong> and <strong>L</strong>.
                  It also features classic semi-vocalic vowels (like <code className="bg-slate-800 text-amber-300 font-mono px-1 rounded">oa</code> and <code className="bg-slate-800 text-amber-300 font-mono px-1 rounded">ea</code>) that glide together cleanly. Click any card below to listen to its pronunciation and understand standard Lesotho spelling structure.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span>L-Series: strictly <strong>"lu"</strong> (not "du")</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Greetings: strictly <strong>"Lumela"</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Syllable Classifications */}
            <div className="space-y-10" id="syllables-hierarchy">
              {SYLLABARY_GROUPS.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-4" id={`syllables-group-${groupIdx}`}>
                  <div className="border-l-4 border-amber-500 pl-4 py-0.5">
                    <h5 className="font-sans font-extrabold text-base text-slate-900">{group.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{group.description}</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {group.items.map((item) => {
                      const isSyllableSpeaking = speakingSyllableId === item.id;
                      return (
                        <div
                          key={item.id}
                          className={`group p-4 bg-white border rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                            isSyllableSpeaking
                              ? 'border-amber-500 ring-2 ring-amber-500/10'
                              : 'border-slate-250 hover:border-amber-500/30'
                          }`}
                          onClick={() => handlePlaySyllable(item.id, item.syllable, item.example)}
                          id={`syllable-card-${item.id}`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Sound Unit</span>
                              <div className={`p-1.5 rounded-lg transition ${
                                isSyllableSpeaking ? 'bg-amber-500/15 text-amber-600' : 'bg-slate-55 hover:bg-slate-100 text-slate-400 group-hover:text-amber-500'
                              }`}>
                                <Volume2 className="h-3.5 w-3.5" />
                              </div>
                            </div>

                            <div className="mt-2">
                              <span className="text-3xl font-extrabold text-slate-900 tracking-tight block">
                                {item.syllable}
                              </span>
                              <span className="text-[10px] text-slate-500 block font-mono mt-1 font-semibold">
                                {item.approxSound}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 border-t border-slate-100 pt-3">
                            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-bold">Example Word</span>
                            <span className="text-xs text-amber-800 font-extrabold block">
                              {item.example}
                            </span>
                            <span className="text-[10px] text-slate-500 block leading-tight mt-0.5 font-medium">
                              "{item.exampleMeaning}"
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
