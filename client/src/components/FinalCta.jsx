import React from 'react';
import { Phone, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FinalCta({ onOpenDemo, onOpenCall }) {
  return (
    <section className="py-14 sm:py-24 bg-[#070C1E] text-white relative overflow-hidden border-t border-slate-800">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge matching Image 2 */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-6">
          <span>⚡ INSTANT FRONT-DESK TRANSFORMATION</span>
        </div>

        {/* Main Headline matching Image 2 */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Your Next Customer Could Be{' '}
          <span className="text-blue-500 block sm:inline">Calling Right Now.</span>
        </h2>

        {/* Subheadings */}
        <div className="mt-3 sm:mt-4 space-y-1">
          <p className="text-sm sm:text-lg text-slate-300 font-medium">
            Don't make them wait.
          </p>
          <p className="text-base sm:text-xl font-bold text-white">
            Give Your Business a 24/7 AI Receptionist.
          </p>
        </div>

        {/* Buttons matching Image 2 */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-center"
          >
            <span>Book Your Free Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCall}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-slate-700 hover:border-slate-600 bg-[#0B1224] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 text-center"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call Our AI</span>
          </button>
        </div>

        {/* Trust row below buttons matching Image 2 */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Setup in 3-5 Business Days
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            Keep Your Existing Phone Number
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            No Long-Term Contracts
          </span>
        </div>

        <div className="mt-6 text-xs text-slate-500 font-medium">
          Built by Vedanco AI
        </div>
      </div>
    </section>
  );
}
