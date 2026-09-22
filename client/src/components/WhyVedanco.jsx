import React from 'react';
import { Layers, Network, TrendingUp, Headphones } from 'lucide-react';

export default function WhyVedanco() {
  const pillars = [
    {
      id: 'SETUP',
      title: 'SETUP',
      heading: 'Engineered For Your Brand',
      desc: 'We understand your business and build your customized call flow, script guidelines, and voice persona.',
      icon: Layers,
    },
    {
      id: 'INTEGRATION',
      title: 'INTEGRATION',
      heading: 'Full Ecosystem Sync',
      desc: 'We connect your existing phone lines, calendar, CRM, and communication workflows where supported.',
      icon: Network,
    },
    {
      id: 'OPTIMIZATION',
      title: 'OPTIMIZATION',
      heading: 'Continuous Performance Tuning',
      desc: 'We continuously improve your AI experience based on real conversations, caller queries, and business feedback.',
      icon: TrendingUp,
    },
    {
      id: 'SUPPORT',
      title: 'SUPPORT',
      heading: 'Dedicated Management',
      desc: 'Our technical engineering team remains available to manage prompts, update hours, and support your system.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            The Vedanco Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            More Than an AI Voice.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            Vedanco doesn't simply give you a phone bot. We build and manage a complete AI receptionist system around your business.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-electric-400 hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-electric-50 text-electric-600 flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold tracking-widest text-slate-400 uppercase font-mono">
                      {pillar.title}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">{pillar.heading}</h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-electric-600">
                  Managed By Vedanco AI
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
