import React from 'react';
import { BookOpen, Award, User, GraduationCap, MapPin } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'student' | 'tutor';
  setUserRole: (role: 'student' | 'tutor') => void;
  userPoints: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  userPoints,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md" id="app-header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('marketplace')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-slate-900 sm:text-xl">
              Puisano <span className="text-amber-600 font-extrabold">Sesotho</span>
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 font-mono">
              Language Marketplace
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex space-x-1" aria-label="Main Navigation">
          {[
            { id: 'marketplace', label: 'Find Tutors', icon: GraduationCap },
            { id: 'materials', label: 'Study Store', icon: BookOpen },
            { id: 'phrasebook', label: 'Useful Phrases', icon: MapPin },
            { id: 'practice', label: 'Interactive Quiz', icon: Award },
            { id: 'ai-chat', label: 'AI Tutor Sanya', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-100/50 text-amber-900 shadow-sm border border-amber-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Points & Role Selector */}
        <div className="flex items-center space-x-3">
          {/* Points badge */}
          <div className="flex items-center space-x-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm shadow-amber-100">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>{userPoints} LingoPts</span>
          </div>

          {/* Account Role Selector Toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5" id="role-selector">
            <button
              onClick={() => setUserRole('student')}
              id="role-student-btn"
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                userRole === 'student'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setUserRole('tutor')}
              id="role-tutor-btn"
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                userRole === 'tutor'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Teach
            </button>
          </div>

          {/* Profile Tab Link */}
          <button
            onClick={() => setCurrentTab('dashboard')}
            id="nav-dashboard-btn"
            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-slate-600 transition-colors ${
              currentTab === 'dashboard'
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
            title="My Dashboard"
          >
            <User className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
