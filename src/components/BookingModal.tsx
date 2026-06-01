import React, { useState } from 'react';
import { Tutor } from '../types.ts';
import { X, Calendar, Clock, CreditCard, CheckCircle, Sparkles, Loader2, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  tutor: Tutor;
  onClose: () => void;
  onBookSuccess: (date: string, time: string, price: number) => void;
}

export default function BookingModal({ tutor, onClose, onBookSuccess }: BookingModalProps) {
  const [selectedDay, setSelectedDay] = useState<string>(Object.keys(tutor.availability)[0] || 'Monday');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'details' | 'paying' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [paypalEmail, setPaypalEmail] = useState('isackomota@gmail.com');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardName, setCardName] = useState('Jane Learner');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  const availableTimes = tutor.availability[selectedDay] || [];

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) return;
    
    // Animate payment server processing
    setPaymentStep('paying');
    // PayPal has 0.8s fast transaction speed while card has 1.8s
    const processDelay = paymentMethod === 'paypal' ? 850 : 1800;
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        // Date mapping for simplicity: "Next Monday" or similar
        const dateStr = `Next ${selectedDay}`;
        onBookSuccess(dateStr, selectedTime, tutor.hourlyRate);
      }, 1500);
    }, processDelay);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-sm p-4 animate-fade-in" id="booking-modal-outer">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100" id="booking-modal-inner">
        
        {/* Modal Close */}
        <button
          onClick={onClose}
          id="btn-close-modal"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {paymentStep === 'details' && (
          <div className="p-6">
            <h3 className="font-display font-bold text-xl text-slate-900 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>Book a Lesson with {tutor.name}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">Select a day, time slot, and confirm checkout to reserve your lesson slot.</p>

            <form onSubmit={handleBookingConfirm} className="mt-6 space-y-5">
              
              {/* Day Selection Slider */}
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide block mb-2">1. Choose Day</label>
                <div className="flex gap-2 overflow-x-auto pb-1" id="booking-day-selector">
                  {Object.keys(tutor.availability).map((day) => {
                    const isSelected = selectedDay === day;
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedTime('');
                        }}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium border shrink-0 transition-all ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide block mb-2">2. Available Slots ({selectedDay})</label>
                {availableTimes.length === 0 ? (
                  <p className="text-xs text-amber-600">No time slots configured on this day.</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2" id="booking-time-selector">
                    {availableTimes.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center space-x-1 rounded-lg py-2 border text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          <span>{time}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Billing Summary */}
              <div className="rounded-xl bg-slate-50 border p-4 text-xs space-y-2 mt-2">
                <span className="font-semibold text-slate-700">Billing Summary</span>
                <div className="flex justify-between text-slate-600">
                  <span>1 Hour Session Rate</span>
                  <span className="font-medium">${tutor.hourlyRate.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <span>Booking Platform Fee</span>
                  <span className="font-medium">$1.00 USD</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-1">
                  <span>Total Amount Due</span>
                  <span className="text-amber-600">${(tutor.hourlyRate + 1.00).toFixed(2)} USD</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide block">3. Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3" id="payment-method-tabs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex items-center justify-center space-x-2 rounded-xl py-3 px-4 border text-xs font-extrabold transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-600 bg-blue-50/45 text-blue-950 ring-2 ring-blue-500/15'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <span className="text-blue-600 font-extrabold font-sans">Pay</span>
                      <span className="text-sky-500 font-extrabold font-sans">Pal</span>
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 flex items-center gap-0.5">
                      <Zap className="h-2 w-2 fill-amber-500" />
                      <span>Fast</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center space-x-2 rounded-xl py-3 px-4 border text-xs font-semibold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-slate-900 bg-slate-50 text-slate-900 ring-2 ring-slate-900/10'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="h-4 w-4 text-slate-600" />
                    <span>Credit Card</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Fields */}
              <div className="space-y-3">
                {paymentMethod === 'paypal' ? (
                  <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/20 to-sky-50/20 p-4 space-y-3" id="paypal-express-details">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-850 font-extrabold text-xs tracking-tight font-sans">PayPal Fast Checkout</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wide">Secure Link</span>
                      </div>
                      <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Settle your lesson instantly with single-click billing. PayPal automatically links your pre-authorized learning budget for lightning fast processing.
                    </p>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">PayPal Account Email</label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                        placeholder="your-paypal-email@example.com"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/40" id="card-details-fields">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-mono text-slate-500">Secure card transaction simulator</span>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-12">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full rounded-lg border bg-white px-3 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full rounded-lg border bg-white px-3 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full rounded-lg border bg-white px-3 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                {paymentMethod === 'paypal' ? (
                  <button
                    type="submit"
                    disabled={!selectedTime}
                    className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-extrabold text-blue-950 transition-all shadow-lg ${
                      selectedTime 
                        ? 'bg-amber-400 hover:bg-amber-500 shadow-amber-400/10'
                        : 'bg-slate-300 pointer-events-none cursor-not-allowed text-slate-500'
                    }`}
                    id="btn-paypal-express-pay"
                  >
                    <Zap className="h-4 w-4 fill-blue-950 text-blue-950" />
                    <span>Pay with PayPal</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!selectedTime}
                    className={`flex-1 flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-semibold text-white shadow-lg transition-all ${
                      selectedTime 
                        ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/10'
                        : 'bg-slate-300 pointer-events-none cursor-not-allowed'
                    }`}
                    id="btn-card-pay"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Pay & Reserve Slot</span>
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

        {paymentStep === 'paying' && (
          <div className="py-20 px-8 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
            <h4 className="mt-4 font-sans font-bold text-lg text-slate-900">Processing Payment...</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs text-center">Contacting our secured gateway to reserve {tutor.name} on {selectedDay}s at {selectedTime}.</p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="py-16 px-8 flex flex-col items-center justify-center bg-emerald-50">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
            <h4 className="mt-4 font-sans font-extrabold text-xl text-emerald-950">Booking Confirmed!</h4>
            <p className="text-xs text-emerald-800 mt-2 text-center max-w-sm">
              Your hour session with <strong>{tutor.name}</strong> has been booked and charged successfully. Check your dashboard to view active sessions.
            </p>
            <div className="mt-6 flex flex-col items-center space-y-1.5 p-4 rounded-xl bg-white/90 border border-emerald-100 shadow-sm w-full font-mono text-xs text-emerald-950">
              <div className="flex justify-between w-full">
                <span>Tutor:</span>
                <span className="font-semibold">{tutor.name}</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Date:</span>
                <span className="font-semibold">Next {selectedDay}</span>
              </div>
              <div className="flex justify-between w-full">
                <span>Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex justify-between w-full border-t border-emerald-100/50 pt-1.5 mt-1">
                <span>Total charged:</span>
                <span className="font-bold text-amber-700">${(tutor.hourlyRate + 1).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 text-emerald-700 flex items-center space-x-1 justify-center animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Session locked in</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
