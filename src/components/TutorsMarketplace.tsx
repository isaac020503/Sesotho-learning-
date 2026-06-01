import React, { useState, useMemo } from 'react';
import { TUTORS } from '../data.ts';
import { Tutor } from '../types.ts';
import { Star, MapPin, DollarSign, Search, Calendar, MessageSquare, Award, GraduationCap } from 'lucide-react';
import BookingModal from './BookingModal.tsx';
import { motion } from 'motion/react';

interface TutorsMarketplaceProps {
  onBookingCreated: (booking: {
    id: string;
    tutorId: string;
    tutorName: string;
    tutorAvatar: string;
    date: string;
    time: string;
    price: number;
    status: 'upcoming';
  }) => void;
}

export default function TutorsMarketplace({ onBookingCreated }: TutorsMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [maxPrice, setMaxPrice] = useState(25);
  const [bookingTutor, setBookingTutor] = useState<Tutor | null>(null);

  // Specialties categories extracted from all tutors
  const specialtiesList = useMemo(() => {
    const specs = new Set<string>();
    TUTORS.forEach(t => t.specialties.forEach(s => specs.add(s)));
    return ['All', ...Array.from(specs)];
  }, []);

  // Filter tutors based on criteria
  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tutor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tutor.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === 'All' || tutor.specialties.includes(selectedSpecialty);
      
      const matchesCountry = selectedCountry === 'All' || 
                             (selectedCountry === 'Lesotho' && tutor.country === 'Lesotho') ||
                             (selectedCountry === 'South Africa' && (tutor.country as string) === 'South_Africa' || tutor.country === 'South Africa');
      
      const matchesPrice = tutor.hourlyRate <= maxPrice;

      return matchesSearch && matchesSpecialty && matchesCountry && matchesPrice;
    });
  }, [searchTerm, selectedSpecialty, selectedCountry, maxPrice]);

  const handleBookSuccess = (date: string, time: string, price: number) => {
    if (!bookingTutor) return;
    
    // Pass booking information up to parent state to persist
    onBookingCreated({
      id: `b-${Date.now()}`,
      tutorId: bookingTutor.id,
      tutorName: bookingTutor.name,
      tutorAvatar: bookingTutor.avatar,
      date,
      time,
      price,
      status: 'upcoming'
    });

    setBookingTutor(null);
  };

  return (
    <div className="space-y-8" id="tutors-marketplace">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold text-2xl text-slate-950">Find your Native Sesotho Tutor</h3>
          <p className="text-sm text-slate-500 mt-1">Book personalized lessons with verified teachers from key Southern African communities.</p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tutor name, background, bio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 hover:bg-slate-50 transition"
              id="search-input"
            />
          </div>

          {/* Specialty Select */}
          <div className="md:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-amber-500 transition cursor-pointer"
              id="filter-specialty"
            >
              {specialtiesList.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'All' ? 'All Specialties' : spec}
                </option>
              ))}
            </select>
          </div>

          {/* Country Select */}
          <div className="md:col-span-2">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-amber-500 transition cursor-pointer"
              id="filter-country"
            >
              <option value="All">All Locations</option>
              <option value="Lesotho">Lesotho 🇱🇸</option>
              <option value="South Africa">South Africa 🇿🇦</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1">
              <span>Max Rate</span>
              <span className="text-amber-600">${maxPrice}/hr</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              step="1"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
              id="filter-price"
            />
          </div>
        </div>

        {/* Floating Fast Tags */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Fast Filters:</span>
          {specialtiesList.slice(1, 6).map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(isSelected ? 'All' : spec)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-transparent'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Results */}
      {filteredTutors.length === 0 ? (
        <div className="rounded-2xl border border-dashed text-center py-16 px-4 space-y-3 bg-white" id="no-tutor-results">
          <GraduationCap className="h-10 w-10 text-slate-300 mx-auto" />
          <h4 className="font-sans font-bold text-slate-900">No Matching Tutors Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clarifying your search criteria, widening the rate spectrum, or switching location filters.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('All');
              setSelectedCountry('All');
              setMaxPrice(25);
            }}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="tutors-grid">
          {filteredTutors.map((tutor) => (
            <motion.div
              layout
              key={tutor.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              id={`tutor-card-${tutor.id}`}
            >
              <div className="space-y-4">
                {/* Tutor Profile Header */}
                <div className="flex items-start justify-between">
                  {/* Photo & Identity details */}
                  <div className="flex items-center space-x-4">
                    {/* Generates dynamic avatar colored background */}
                    <div className="h-14 w-14 rounded-2xl bg-amber-500 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
                      {tutor.avatar}
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-950 text-base">{tutor.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{tutor.role}</p>
                      
                      <div className="flex items-center space-x-1.5 mt-1 text-slate-500 text-xs">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{tutor.location}</span>
                        <span>{tutor.country === 'Lesotho' ? '🇱🇸' : '🇿🇦'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hourly Rate Label */}
                  <div className="text-right">
                    <div className="font-sans font-black text-lg text-slate-900 flex items-center justify-end">
                      <span className="text-xs font-medium text-slate-400 mr-0.5">$</span>
                      <span>{tutor.hourlyRate}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Per hour</span>
                  </div>
                </div>

                {/* Rating details & Completed hours count */}
                <div className="flex items-center space-x-4 border-y border-slate-100 py-2.5 text-xs">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span>{tutor.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-medium font-mono">({tutor.reviewsCount} reviews)</span>
                  </div>
                  <div className="h-3 w-px bg-slate-200" />
                  <div className="flex items-center space-x-1 text-slate-600 font-semibold">
                    <Award className="h-4 w-4 text-slate-400" />
                    <span>{tutor.completedLessons} Lessons</span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-1">
                  "{tutor.bio}"
                </p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {tutor.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-lg bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600 font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer action button */}
              <div className="flex gap-2.5 mt-6 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  id={`btn-chat-tutor-${tutor.id}`}
                  onClick={() => alert(`Connecting securely with ${tutor.name}. Sanya is also available on Sanya AI tab to practice speaking!`)}
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
                  title="Send Message"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  id={`btn-book-tutor-${tutor.id}`}
                  onClick={() => setBookingTutor(tutor)}
                  className="flex-1 flex items-center justify-center space-x-2 rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white shadow-md hover:bg-slate-800 hover:shadow-lg transition"
                >
                  <Calendar className="h-4 w-4 text-amber-500" />
                  <span>Book Session</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Modal render overlay under root */}
      {bookingTutor && (
        <BookingModal
          tutor={bookingTutor}
          onClose={() => setBookingTutor(null)}
          onBookSuccess={handleBookSuccess}
        />
      )}
    </div>
  );
}
