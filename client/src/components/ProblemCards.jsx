import React from 'react';
import { PhoneMissed, Moon, HelpCircle, Hourglass, BatteryCharging } from 'lucide-react';

export default function ProblemCards() {
  const problems = [
    {
      id: 1,
      title: 'Missed Calls',
      desc: "Your team can't answer every call.",
      detail: 'Front desk staff step away, phone lines get jammed, and callers refuse to leave voicemails.',
      icon: PhoneMissed,
      tag: 'Lost Revenue',
    },
    {
      id: 2,
      title: 'After-Hours Inquiries',
      desc: 'Potential customers may call outside your working hours.',
      detail: 'Over 40% of inbound service inquiries originate in the evening or over the weekend.',
      icon: Moon,
      tag: 'Untapped Leads',
    },
    {
      id: 3,
      title: 'Repetitive Questions',
      desc: 'Your staff spends valuable time answering the same questions.',
      detail: 'Hours are wasted daily answering basic questions about hours, pricing, directions, and services.',
      icon: HelpCircle,
      tag: 'Wasted Hours',
    },
    {
      id: 4,
      title: 'Slow Response',
      desc: 'A delayed response can mean a lost opportunity.',
      detail: 'Speed to lead is critical. If you take 30 minutes to call back, the customer has hired someone else.',
      icon: Hourglass,
      tag: 'Competitor Advantage',
    },
    {
      id: 5,
      title: 'Overloaded Staff',
      desc: 'Your team should focus on customers that actually need a human.',
      detail: 'Free your high-value employees to focus on in-person consultations, closing deals, and client care.',
      icon: BatteryCharging,
      tag: 'Staff Burnout',
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            The Cost of Missed Calls
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Every Missed Call Is an Opportunity You Never Get Back.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            Traditional phone setups leak high-intent leads daily. Here are the five systemic bottlenecks hurting growing US businesses.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.id}
                className="group relative bg-slate-50/70 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-electric-400 hover:shadow-xl hover:shadow-electric-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:bg-electric-50 group-hover:border-electric-200 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6 text-navy-900 group-hover:text-electric-600 transition-colors" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-200/60 text-slate-700">
                      {prob.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-2">{prob.title}</h3>
                  <p className="font-medium text-electric-700 text-sm mb-2">{prob.desc}</p>
                  <p className="text-xs text-charcoal-500 leading-relaxed">{prob.detail}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Bottleneck 0{prob.id}</span>
                  <span className="text-rose-500 font-semibold">High Friction</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Vedanco Advantage */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-3xl p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-electric-400 uppercase tracking-wider mb-2">
                VEDANCO ADVANTAGE
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                Stop losing customers to voicemail.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Deploy an intelligent receptionist in days. Handle unlimited simultaneous calls, qualify leads instantly, and keep your calendar booked.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold">● 100% Call Coverage</span>
              <a
                href="#live-demo"
                className="text-xs font-bold text-electric-400 hover:text-white transition-colors"
              >
                Test The AI Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
