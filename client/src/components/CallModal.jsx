import React from 'react';
import { X, Phone, ArrowRight, Sparkles, Calendar, Zap } from 'lucide-react';

export default function CallModal({ isOpen, onClose, onOpenDemo }) {
  if (!isOpen) return null;

  const handleJumpToLiveDemo = () => {
    onClose();
    const demoElement = document.getElementById('live-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookDemoCall = () => {
    onClose();
    if (onOpenDemo) {
      onOpenDemo();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B1120] text-white p-5 sm:p-8 shadow-2xl border border-slate-800 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg">
          <Phone className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-blue-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Receptionist</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white">
          Experience Live AI Receptionist
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 mb-5 sm:mb-6 leading-relaxed max-w-sm mx-auto">
          Test our natural conversational voice engine right in your browser, or schedule a customized live demo call with our specialist.
        </p>

        {/* Feature summary */}
        <div className="bg-[#070C1E] rounded-2xl p-4 border border-slate-800 text-left space-y-2 mb-6 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Voice Response Latency:</span>
            <span className="text-emerald-400 font-mono">Under 400ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Availability:</span>
            <span className="text-slate-200">24/7/365 Non-stop</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Scheduling Integration:</span>
            <span className="text-blue-400 font-mono">Calendly Ready</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleBookDemoCall}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Call (Pick Date & Time)</span>
          </button>

          <button
            onClick={handleJumpToLiveDemo}
            className="w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Test In-Browser Audio Demo</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
