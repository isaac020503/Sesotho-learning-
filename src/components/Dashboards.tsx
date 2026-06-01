import React, { useState } from 'react';
import { Booking, Material } from '../types.ts';
import { MATERIALS } from '../data.ts';
import { Star, Award, BookOpen, Clock, Calendar, CheckSquare, Save, Users, MapPin, DollarSign, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardsProps {
  userRole: 'student' | 'tutor';
  bookings: Booking[];
  purchasedMaterialIds: string[];
  userPoints: number;
}

export default function Dashboards({
  userRole,
  bookings,
  purchasedMaterialIds,
  userPoints
}: DashboardsProps) {
  
  // Tutor specific local states for standard mock registration
  const [tutorName, setTutorName] = useState('Thabo Khulu');
  const [tutorRole, setTutorRole] = useState('Native conversational teacher');
  const [tutorRate, setTutorRate] = useState(15);
  const [tutorBio, setTutorBio] = useState('Hello! I love Southern Sotho literature and would love to practice speak with beginners.');
  const [tutorCountry, setTutorCountry] = useState<'Lesotho' | 'South Africa'>('Lesotho');
  const [tutorDays, setTutorDays] = useState<string[]>(['Monday', 'Wednesday']);
  const [savingStatus, setSavingStatus] = useState(false);

  // Unlocked / purchased academic curriculum materials
  const unlockedMaterials = MATERIALS.filter(item => purchasedMaterialIds.includes(item.id));

  const handleSaveTutorProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStatus(true);
    setTimeout(() => {
      setSavingStatus(false);
      alert("Tutor listing updated successfully! Your slots are now live on the index list.");
    }, 1200);
  };

  const handleToggleDay = (day: string) => {
    if (tutorDays.includes(day)) {
      setTutorDays(tutorDays.filter(d => d !== day));
    } else {
      setTutorDays([...tutorDays, day]);
    }
  };

  const handleStartLessonSimulator = (tutorName: string) => {
    alert(`Connecting to global live room with ${tutorName}. Your camera output is opening in the frame!`);
  };

  if (userRole === 'tutor') {
    return (
      <div className="space-y-8" id="tutor-dashboard-workspace">
        <div>
          <h3 className="font-display font-extrabold text-2xl text-slate-950">Tutor Management Studio</h3>
          <p className="text-sm text-slate-500 mt-1">Configure your rates, available schedule days, and review incoming student bookings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left profile manager form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
              <h4 className="font-sans font-extrabold text-base text-slate-900 border-b pb-3">My Educator Profile Card</h4>
              
              <form onSubmit={handleSaveTutorProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-505 uppercase tracking-wide block mb-1">Display Name</label>
                    <input
                      type="text"
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      className="w-full rounded-xl border bg-slate-50/40 px-3 py-1.8 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-505 uppercase tracking-wide block mb-1">Teaching Focus</label>
                    <input
                      type="text"
                      value={tutorRole}
                      onChange={(e) => setTutorRole(e.target.value)}
                      className="w-full rounded-xl border bg-slate-50/40 px-3 py-1.8 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-505 uppercase tracking-wide block mb-1">Hourly Rate (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={tutorRate}
                        onChange={(e) => setTutorRate(Number(e.target.value))}
                        className="w-full rounded-xl border bg-slate-50/40 pl-7 pr-3 py-1.8 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-505 uppercase tracking-wide block mb-1">Location Origin</label>
                    <select
                      value={tutorCountry}
                      onChange={(e) => setTutorCountry(e.target.value as any)}
                      className="w-full rounded-xl border bg-slate-50/40 px-3 py-1.8 text-xs text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Lesotho">Lesotho 🇱🇸</option>
                      <option value="South Africa">South Africa 🇿🇦</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-505 uppercase tracking-wide block mb-1">Detailed Biography</label>
                  <textarea
                    rows={3}
                    value={tutorBio}
                    onChange={(e) => setTutorBio(e.target.value)}
                    className="w-full rounded-xl border bg-slate-50/40 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 leading-relaxed"
                    required
                  />
                </div>

                {/* Days checkboxes */}
                <div className="space-y-2 pt-2 border-t">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Configure Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                      const isSelected = tutorDays.includes(day);
                      return (
                        <button
                          type="button"
                          key={day}
                          onClick={() => handleToggleDay(day)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                            isSelected
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingStatus}
                    className="flex items-center space-x-1.5 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-900 transition"
                  >
                    <Save className="h-4 w-4 text-amber-500" />
                    <span>{savingStatus ? 'Saving Profile...' : 'Save Live Slots'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Incoming Bookings Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tutor metrics statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-white p-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Earnings</span>
                <span className="text-xl font-bold font-mono text-slate-900 block mt-1">$120.00</span>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Students</span>
                <span className="text-xl font-bold font-mono text-slate-900 block mt-1">4 Active</span>
              </div>
            </div>

            {/* Simulated booked Sotho classes */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-sm">
              <h4 className="font-sans font-extrabold text-sm text-slate-900 flex items-center space-x-1.5 border-b pb-3.5">
                <Users className="h-4 w-4 text-amber-500" />
                <span>Booked Student Classes</span>
              </h4>

              <div className="space-y-3">
                {[
                  { student: 'Jane Learner', topic: 'Basics & Intro Greetings', day: 'Wednesday', time: '14:00', fee: tutorRate },
                  { student: 'Keanu Reeves', topic: 'Phrases & Pronunciation Pack', day: 'Friday', time: '11:00', fee: tutorRate },
                ].map((booking, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border bg-slate-50/50 text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900">{booking.student}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Topic: {booking.topic}</p>
                      
                      <div className="flex items-center space-x-1 text-slate-400 text-[10px]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{booking.day} at {booking.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-emerald-600 font-bold block">+${booking.fee}</span>
                      <span className="text-[9px] uppercase text-slate-400 font-mono">Secured</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Learner Dashboard View - default student mode
  return (
    <div className="space-y-8" id="learner-dashboard-workspace">
      
      {/* Title block */}
      <div>
        <h3 className="font-display font-extrabold text-2xl text-slate-950">Student Learning Dashboard</h3>
        <p className="text-sm text-slate-500 mt-1">Monitor upcoming scheduled native lessons, unlock flashcard ebooks, and track grammar scores.</p>
      </div>

      {/* Progress Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="dashboard-stats-grid">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Award className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Gained Points</span>
            <span className="text-xl font-black font-mono text-slate-900 mt-1 block">{userPoints} LingoPts</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Booked Sessions</span>
            <span className="text-xl font-black font-mono text-slate-900 mt-1 block">{bookings.length} Classes</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckSquare className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Vocab List</span>
            <span className="text-xl font-black font-mono text-slate-900 mt-1 block">12 Essential Phrases</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Purchased Guides</span>
            <span className="text-xl font-black font-mono text-slate-900 mt-1 block">{unlockedMaterials.length} unlocked</span>
          </div>
        </div>
      </div>

      {/* Grid: Upcoming classes & study guide library */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Booked lessons list columns */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-sans font-bold text-sm text-slate-900 flex items-center space-x-1.5 border-b pb-3.5">
              <Calendar className="h-4.5 w-4.5 text-amber-500" />
              <span>Upcoming Scheduled Lessons</span>
            </h4>

            {bookings.length === 0 ? (
              <div className="py-12 border border-dashed border-slate-150 rounded-xl text-center text-slate-400 text-xs text-slate-500 space-y-2">
                <Clock className="h-8 w-8 text-slate-300 mx-auto" />
                <p>No active scheduled lessons. Tap the Find Tutors directory to book native lesson slots!</p>
              </div>
            ) : (
              <div className="space-y-3" id="booked-lessons-list">
                {bookings.map((book: Booking) => (
                  <div key={book.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-slate-50/40 text-xs gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500 text-white font-extrabold flex items-center justify-center shadow-sm text-sm shrink-0">
                        {book.tutorAvatar}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm leading-snug">{book.tutorName}</h5>
                        <p className="text-[10px] text-slate-500 font-medium">1 Hour Southern Sesotho Oral class</p>
                        
                        <div className="flex items-center space-x-2 mt-1.5 text-slate-400 text-[10px] font-medium font-mono">
                          <span className="bg-amber-50 rounded border border-amber-20px px-1.5 py-0.5 text-amber-800">{book.date}</span>
                          <span>at</span>
                          <span className="bg-slate-100 rounded px-1.5 py-0.5 text-slate-700">{book.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:justify-end self-end sm:self-center">
                      <div className="text-right max-sm:hidden">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Status</span>
                        <span className="text-amber-700 font-semibold text-[10px]">Reserved</span>
                      </div>
                      <button
                        onClick={() => handleStartLessonSimulator(book.tutorName)}
                        className="rounded-xl bg-amber-500 font-bold text-white px-3 py-2 hover:bg-amber-600 transition shadow-sm text-[11px]"
                      >
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Study Guide library unlocked */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 min-h-[250px]">
            <h4 className="font-sans font-bold text-sm text-slate-900 flex items-center space-x-1.5 border-b pb-3.5">
              <BookOpen className="h-4.5 w-4.5 text-amber-500" />
              <span>Purchased Study Deck ({unlockedMaterials.length})</span>
            </h4>

            {unlockedMaterials.length === 0 ? (
              <div className="py-12 text-center text-slate-450 text-xs border border-dashed border-slate-150 rounded-xl space-y-1 bg-slate-50/10">
                <BookOpen className="h-6 w-6 text-slate-300 mx-auto" strokeWidth={1.5} />
                <p className="font-semibold text-slate-500">Curriculum empty</p>
                <p className="text-[10px] text-slate-400 px-3 mt-1">Acquire guides inside the Study Store to unlocking ebooks or MP3 lesson assets immediately.</p>
              </div>
            ) : (
              <div className="space-y-3" id="unlocked-materials-list">
                {unlockedMaterials.map(mat => (
                  <div key={mat.id} className="flex items-center justify-between p-3 rounded-xl border bg-emerald-50/20 border-emerald-100 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl select-none">{mat.image}</span>
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{mat.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono italic">by {mat.author}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Launching curriculum database reader for ${mat.title}...`)}
                      className="rounded-xl border p-1 border-slate-200 text-slate-500 hover:bg-white hover:text-amber-600 transition"
                      title="Read Guide"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
