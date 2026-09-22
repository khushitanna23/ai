import React from 'react';
import { ShieldCheck, MessageSquarePlus, Sparkles } from 'lucide-react';

export default function TestimonialSection({ onOpenDemo }) {
  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Enterprise Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Built for Businesses Ready for 24/7 Customer Communication.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            Engineered from day one for high-volume US service companies, healthcare clinics, and fast-growing businesses.
          </p>
        </div>

        {/* Clean, authentic design area for verified client testimonials */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-electric-50 text-electric-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3">
            Verified Partner Onboarding in Progress
          </h3>

          <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Vedanco AI is currently rolling out dedicated receptionist deployments across selected US dental, legal, home service, and real estate pilot partners. Early metrics and verified case studies will be published here upon study completion.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenDemo}
              className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95"
            >
              Request Early Partner Access
            </button>
            <span className="text-xs text-slate-400">
              ● Strictly Verified Deployments Only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
