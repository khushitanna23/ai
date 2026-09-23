import React from 'react';
import {
  Stethoscope,
  Wrench,
  Scale,
  HeartPulse,
  Building2,
  Car,
  Sparkles,
  Key,
  ArrowRight,
  Check,
} from 'lucide-react';
import { industries } from '../data/industries';

const iconMap = {
  Stethoscope,
  Wrench,
  Scale,
  HeartPulse,
  Building2,
  Car,
  Sparkles,
  Key,
};

export default function IndustriesSection({ onOpenDemo }) {
  return (
    <section id="industries" className="py-14 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
              Specialized Industry Flows
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
              Built for Businesses That Depend on Phone Calls.
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-charcoal-600">
              Pre-trained on thousands of industry-specific conversations, vocabulary, emergency keywords, and scheduling workflows.
            </p>
          </div>

          <button
            onClick={onOpenDemo}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm shadow-md transition-all self-stretch md:self-end active:scale-95 text-center"
          >
            <span>Find Your Use Case →</span>
          </button>
        </div>

        {/* 8 Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {industries.map((ind) => {
            const Icon = iconMap[ind.icon] || Building2;
            return (
              <div
                key={ind.id}
                className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-electric-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-electric-50 text-electric-600 group-hover:bg-navy-900 group-hover:text-white flex items-center justify-center transition-colors shadow-sm shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {ind.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-1.5">{ind.name}</h3>
                  <p className="text-xs font-medium text-electric-700 mb-3 sm:mb-4">{ind.description}</p>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-charcoal-600">
                    {ind.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-electric-600 group-hover:text-navy-900 transition-colors">
                  <span>Customizable Call Flow</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
