import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data.ts';
import { QuizQuestion } from '../types.ts';
import { Award, CheckCircle, XCircle, ArrowRight, RotateCcw, HelpCircle, Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LanguageQuizProps {
  onScoreIncrement: (points: number) => void;
}

export default function LanguageQuiz({ onScoreIncrement }: LanguageQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [gainedPoints, setGainedPoints] = useState(0);

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setGainedPoints(prev => prev + 50);
      onScoreIncrement(50); // Fire callback up to root to persist user points
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setQuizComplete(false);
    setGainedPoints(0);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8" id="quiz-workspace">
      <div>
        <h3 className="font-display font-extrabold text-2xl text-slate-950">Grammar & Cultural Challenge</h3>
        <p className="text-sm text-slate-500 mt-1">Test your Sesotho proficiency, master grammar rules, and earn extra LingoPts!</p>
      </div>

      <AnimatePresence mode="wait">
        {!quizComplete ? (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
            id={`quiz-step-${currentIndex}`}
          >
            {/* Progress Bar & Scores Header */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 font-mono">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Correct: {correctCount} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Visual indicator bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question label text */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-600 font-bold flex items-center space-x-1">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>MULTIPLE CHOICE</span>
              </span>
              <h4 className="font-sans font-extrabold text-lg text-slate-900 leading-snug">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 gap-3" id="quiz-options">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentQuestion.correctAnswer;
                
                let buttonStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';
                let indicatorIcon = null;

                if (isAnswered) {
                  if (isCorrectOption) {
                    buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    indicatorIcon = <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />;
                  } else if (isSelected) {
                    buttonStyle = 'bg-red-50 border-red-400 text-red-900 font-bold';
                    indicatorIcon = <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
                  } else {
                    buttonStyle = 'bg-slate-50/50 border-slate-100 text-slate-400 pointer-events-none opacity-60';
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isAnswered}
                    className={`flex items-center justify-between rounded-xl border p-4 text-xs font-semibold text-left transition-all ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {indicatorIcon}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation Sheet */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-xl bg-slate-50 border p-4 space-y-2 text-xs leading-relaxed"
                id="quiz-explanation"
              >
                <div className="flex items-center space-x-1.5 font-bold text-slate-800 uppercase tracking-wider text-[10px] font-mono">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>Grammar Explanation</span>
                </div>
                <p className="text-slate-600 font-medium">
                  {currentQuestion.explanation}
                </p>
                <div className="flex justify-between items-center text-[10px] text-amber-800 font-bold pt-2 border-t border-slate-200/50">
                  <span>Reward: {selectedOption === currentQuestion.correctAnswer ? '+50 Points Gained!' : '+0 Points'}</span>
                  <span>Click next to proceed</span>
                </div>
              </motion.div>
            )}

            {/* Next Action button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  id="btn-quiz-next"
                  className="flex items-center space-x-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
                >
                  <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'Finish Quiz' : 'Next Question'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="quiz-completion"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6 text-center"
            id="quiz-summary-card"
          >
            <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm shadow-amber-100">
              <Trophy className="h-8 w-8 text-amber-500" />
            </div>

            <div className="space-y-2">
              <h4 className="font-sans font-extrabold text-2xl text-slate-900">Quiz Completed!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Excellent perseverance! You have completed the introductory Sotho grammar and culture assessment.
              </p>
            </div>

            {/* Visual Score Card */}
            <div className="grid grid-cols-2 gap-4 rounded-xl border bg-slate-50 p-4 max-w-sm mx-auto font-mono text-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Final Score</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {correctCount} <span className="text-xs text-slate-400 font-semibold">/ {QUIZ_QUESTIONS.length}</span>
                </span>
              </div>
              <div className="border-l">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LingoPts Earned</span>
                <span className="text-2xl font-black text-amber-600 mt-1 block">+{gainedPoints}</span>
              </div>
            </div>

            {/* Badge / Certificate layout decoration */}
            <div className="rounded-xl border border-dashed border-slate-200 p-4 font-sans text-xs text-slate-600 bg-amber-50/10">
              <span className="font-bold text-slate-800">🎖️ Sesotho Novice Certificate Unlocked!</span>
              <p className="text-[10px] text-slate-400 mt-1">You can now display your linguistic status in Sotho language chats.</p>
            </div>

            {/* Reset buttons */}
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handleRestart}
                id="btn-quiz-retry"
                className="flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Practice Again</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
