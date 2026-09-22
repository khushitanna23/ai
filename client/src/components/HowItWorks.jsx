import React from 'react';
import { PhoneCall, Bot, BrainCircuit, Sparkles, UserCheck, Database } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Customer Calls',
      desc: 'A customer calls your business phone number at any hour of the day or night.',
      icon: PhoneCall,
      highlight: 'Instant Trigger',
    },
    {
      num: '02',
      title: 'Vedanco AI Answers',
      desc: 'The AI answers immediately using your customized greeting and brand tone.',
      icon: Bot,
      highlight: '< 1 Ring',
    },
    {
      num: '03',
      title: 'AI Understands',
      desc: 'It understands what the customer needs using advanced conversational intelligence.',
      icon: BrainCircuit,
      highlight: 'Natural Voice',
    },
    {
      num: '04',
      title: 'AI Takes Action',
      desc: 'It answers questions, captures information, qualifies the lead or books an appointment.',
      icon: Sparkles,
      highlight: 'Automated Tasks',
    },
    {
      num: '05',
      title: 'Human Handoff',
      desc: 'Important calls, VIP inquiries, or emergencies can be transferred live to your team.',
      icon: UserCheck,
      highlight: 'Warm Transfer',
    },
    {
      num: '06',
      title: 'Your Team Gets the Details',
      desc: 'Call summaries, transcripts, and captured lead data are sent to your configured CRM & email.',
      icon: Database,
      highlight: 'Instant Sync',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Simple 6-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            From Incoming Call to Qualified Lead.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            A seamless automated journey engineered to convert every inbound dial into an actionable business outcome.
          </p>
        </div>

        {/* 6 Steps Grid with connecting timeline visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-electric-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-electric-600 transition-colors font-mono">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-electric-50 text-electric-600 flex items-center justify-center group-hover:bg-electric-600 group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">Step {step.num}</span>
                  <span className="font-semibold text-electric-600 bg-electric-50 px-2 py-0.5 rounded">
                    {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
