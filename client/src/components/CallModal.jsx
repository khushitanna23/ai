import React from 'react';
import { X, Phone, Bot, ArrowRight, Sparkles, Volume2, Shield } from 'lucide-react';

export default function CallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleJumpToLiveDemo = () => {
    onClose();
    const demoElement = document.getElementById('live-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-navy-900 text-white p-6 sm:p-8 shadow-2xl border border-slate-800 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-electric-600/20 border border-electric-500/40 text-electric-400 flex items-center justify-center mx-auto mb-5 shadow-lg">
          <Phone className="w-8 h-8 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-electric-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Receptionist</span>
        </div>

        <h3 className="text-2xl font-black text-white">
          Experience Live AI Receptionist
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mt-2 mb-6 leading-relaxed max-w-sm mx-auto">
          Test our natural conversational engine directly in your browser. You can type any question, test dental or contracting scenarios, and toggle real voice audio!
        </p>

        {/* Feature summary */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left space-y-2 mb-6 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Voice Latency:</span>
            <span className="text-emerald-400 font-mono">Under 400ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Availability:</span>
            <span className="text-slate-200">24/7/365</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">● Telephony Integration:</span>
            <span className="text-electric-400">Twilio / SIP Ready</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleJumpToLiveDemo}
            className="w-full py-3.5 px-6 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm shadow-lg shadow-electric-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Open Interactive Demo Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
