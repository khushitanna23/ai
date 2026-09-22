import React from 'react';
import { XCircle, CheckCircle, ArrowDown, ArrowRight } from 'lucide-react';

export default function RoiSection({ onOpenDemo }) {
  const withoutSteps = [
    'Customer calls',
    'Nobody answers (Busy / Closed / Voicemail)',
    'Customer hangs up and calls your competitor',
  ];

  const withSteps = [
    'Customer calls',
    'AI answers instantly (< 1 ring)',
    'Customer gets answers & immediate help',
    'Lead is captured & qualified',
    'Appointment booked / call transferred',
    'Your team gets notified with full summary',
  ];

  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Measurable Business Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Turn More Calls Into Opportunities.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            The difference between lost revenue and a booked client comes down to who answers the phone first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Flow 1: WITHOUT VEDANCO AI */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-rose-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 uppercase tracking-wide">
                  WITHOUT VEDANCO AI
                </h3>
              </div>

              <div className="space-y-4">
                {withoutSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs sm:text-sm font-medium text-rose-900 flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-xs flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                    {idx < withoutSteps.length - 1 && (
                      <div className="flex justify-center text-rose-300">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-100 text-center text-xs font-semibold text-rose-600">
              Outcome: Lost Revenue & Damaged Brand Reputation
            </div>
          </div>

          {/* Flow 2: WITH VEDANCO AI */}
          <div className="lg:col-span-7 bg-navy-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  WITH VEDANCO AI
                </h3>
              </div>

              <div className="space-y-2.5">
                {withSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-slate-100 flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-electric-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                    {idx < withSteps.length - 1 && (
                      <div className="flex justify-center text-electric-400/50">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-emerald-400">
                Outcome: 100% Lead Capture & Immediate Conversion
              </span>
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
              >
                <span>See Vedanco AI in Action →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
