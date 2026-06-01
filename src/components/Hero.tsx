import React from 'react';
import { ShieldCheck, Users, Star, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-900 py-16 text-white rounded-3xl" id="hero-banner">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/30 via-slate-900 to-slate-900" />
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[linear-gradient(to_left,rgba(245,158,11,0.05),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400">
                <span>Southern Sotho Language Platform</span>
              </span>
              
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
                Master <span className="text-amber-400">Sesotho</span> with Expert Native Tutors
              </h2>
              
              <p className="mt-4 text-base text-slate-300 max-w-xl sm:text-lg">
                Connect with professional educators from Lesotho and South Africa. Discover structured books, pronunciation playbacks, custom quizzes, and practice real conversation with our advanced AI tutor Sanya.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300 border-t border-slate-800/80 pt-6">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>100% Verified Tutors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>Active student community</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>Interactive local study guides</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 lg:col-span-5 lg:mt-0 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-md rounded-2xl bg-slate-800/50 border border-slate-700/80 p-6 backdrop-blur-sm relative"
            >
              {/* Traditional Sotho basotho hat mockup decoration inside banner */}
              <div className="absolute -top-6 -right-6 h-16 w-16 bg-amber-500 rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-slate-900 pointer-events-none">
                👑
              </div>

              <h3 className="font-sans font-bold text-lg text-amber-400">Sesotho Fact Sheet</h3>
              
              <div className="mt-4 space-y-4 text-sm text-slate-300">
                <p>
                  Southern Sotho (<span className="italic">Sesotho</span>) is a major Bantu language spoken by over 6 million people. It is the national language of <strong>Lesotho</strong> and one of the official languages of <strong>South Africa</strong>.
                </p>
                
                <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-700/50">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 font-semibold block mb-1">Interactive Lesson of the Day</span>
                  <p className="text-slate-200 font-medium">Hello? (Singular Form)</p>
                  <p className="text-xl font-bold text-white mt-1">"Lumela"</p>
                  <p className="text-xs text-slate-400 mt-1 italic">Response: "Ke phela hantle" (I live well)</p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-700/50 pt-3">
                  <span>Noun Class System</span>
                  <span>Phonetic Stress</span>
                  <span>Tone Pitch</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
