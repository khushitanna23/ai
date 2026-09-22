import React from 'react';
import { UserX, Clock, Users, PhoneOff, Zap, CheckCircle } from 'lucide-react';

export default function ProblemHook({ onOpenDemo }) {
  const situations = [
    {
      icon: UserX,
      title: 'Receptionist is busy',
      desc: 'Greeting a walk-in or buried under administrative paperwork.',
    },
    {
      icon: Clock,
      title: 'Office is closed',
      desc: 'Evenings, weekends, and holidays when high-value prospects research options.',
    },
    {
      icon: Users,
      title: 'Nobody is available',
      desc: 'During team meetings, lunch breaks, or unexpected staff absences.',
    },
    {
      icon: PhoneOff,
      title: 'Team already on another call',
      desc: 'Peak call surges where secondary callers hear endless ringing or voicemail.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            The Inbound Reality
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Your Customers Don't Always Call During Business Hours.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            When a customer dials your business and reaches a voicemail box, 85% hang up and call your competitor.
          </p>
        </div>

        {/* 4 Situations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {situations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-bold text-lg text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* The Resolution Banner */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-electric-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-electric-600 flex items-center justify-center text-white shadow-lg shadow-electric-600/30 shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400">The Solution</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Vedanco AI answers instantly.
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">
                  Zero wait times. Zero missed revenue. Real conversational intelligence answering within milliseconds, 24 hours a day, 365 days a year.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDemo}
              className="shrink-0 px-6 py-3.5 bg-electric-600 hover:bg-electric-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              Experience Instant Answering
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
