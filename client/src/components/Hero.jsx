import React, { useState, useEffect } from 'react';
import { Phone, Clock, Zap, User, Sparkles, CheckCircle2, Quote } from 'lucide-react';

export default function Hero({ onOpenDemo, onOpenCall }) {
  const [callSeconds, setCallSeconds] = useState(1498); // 24:58 start

  useEffect(() => {
    const timer = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  const handleScrollToLiveDemo = () => {
    const el = document.getElementById('live-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCall();
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Pill Badge matching Image 2 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>24/7 AI RECEPTIONIST FOR US BUSINESSES</span>
            </div>

            {/* Main Headline matching Image 2 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Never Miss Another <span className="text-blue-600">Customer Call.</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Your AI Receptionist answers calls 24/7, handles customer questions, captures leads, qualifies prospects, books appointments, and transfers important calls to your team.
            </p>

            {/* Buttons matching Image 2 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:shadow-blue-600/25 transition-all transform active:scale-95"
              >
                <span>Book a Free Demo →</span>
              </button>

              <button
                onClick={onOpenCall}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all shadow-sm active:scale-95"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call Our AI →</span>
              </button>
            </div>

            {/* Trust Badges matching Image 2 */}
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 pt-4 border-t border-slate-100 w-full">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>24/7 Availability</span>
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Instant Response</span>
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span>Human Handoff</span>
              </span>
            </div>
          </div>

          {/* Right Column: Premium AI Phone-Call / Dashboard UI exactly matching Image 2 */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full rounded-3xl bg-[#0B1120] text-white p-6 shadow-2xl border border-slate-800/90 space-y-4">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold tracking-wider uppercase text-white">
                    VEDANCO AI
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live Call Active</span>
                </div>
              </div>

              {/* Caller Card */}
              <div className="bg-[#131C31] rounded-2xl p-3.5 border border-slate-800/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-inner">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Sarah M.</span>
                      <span className="text-[10px] text-blue-300 font-medium bg-blue-950/80 border border-blue-500/40 px-2 py-0.5 rounded">
                        New Customer
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">+1 (555) 234-1921</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    DURATION
                  </div>
                  <div className="font-mono text-xs font-bold text-white mt-0.5">
                    {formatTime(callSeconds)}
                  </div>
                </div>
              </div>

              {/* Transcript snippet */}
              <div className="bg-[#0e172a] rounded-xl p-3 border border-slate-800/80 flex items-start gap-2.5">
                <Quote className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "I'd like to book an appointment for tomorrow morning if possible..."
                </p>
              </div>

              {/* Voice Engine & Waveform */}
              <div className="bg-[#0e172a] rounded-xl p-3.5 border border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">AI Receptionist Voice Engine</span>
                  <span className="text-blue-400 font-medium text-[11px]">Ultra-low Latency (420ms)</span>
                </div>

                {/* Animated Waveform Bars */}
                <div className="bg-[#0B1224] rounded-lg p-2.5 border border-slate-800/80 flex items-center justify-between gap-1 h-10 px-3">
                  {[6, 12, 20, 8, 26, 16, 10, 22, 14, 24, 18, 12, 28, 16, 22, 10, 18, 14, 20, 8, 12, 6].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-waveform"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${(i % 5) * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Automated Workflow Actions */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between px-1 text-[10px] font-bold tracking-wider">
                  <span className="text-slate-400 uppercase">AUTOMATED WORKFLOW ACTIONS</span>
                  <span className="text-emerald-400 uppercase">3/3 COMPLETED</span>
                </div>

                {/* Row 1 */}
                <div className="bg-[#131C31] rounded-xl px-3.5 py-2.5 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lead Qualified</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Intent: Emergency Dental</span>
                </div>

                {/* Row 2 */}
                <div className="bg-[#131C31] rounded-xl px-3.5 py-2.5 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Appointment Booked</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Tue 11:15 AM</span>
                </div>

                {/* Row 3 */}
                <div className="bg-[#131C31] rounded-xl px-3.5 py-2.5 border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>CRM Updated</span>
                  </div>
                  <span className="text-slate-300 text-[11px]">Synced + SMS Sent</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 px-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">Want to test this live?</span>
                <button
                  onClick={handleScrollToLiveDemo}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Launch Live Call Demo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
