import React, { useState } from 'react';
import {
  PhoneIncoming,
  Brain,
  CheckSquare,
  Calendar,
  PhoneForwarded,
  Send,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Zap,
} from 'lucide-react';

export default function SolutionSection({ onOpenDemo }) {
  const [selectedCard, setSelectedCard] = useState(1); // Default card 2 (Contextual Intelligence)
  const [consoleTab, setConsoleTab] = useState('routing'); // 'flow' | 'qualification' | 'routing'

  const actions = [
    {
      id: 0,
      badge: 'ANSWER',
      badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'Instant Answering',
      subtitle: 'Answer incoming customer calls instantly.',
      desc: 'Pick up within one ring with your customized brand greeting, 24/7/365 without ever placing a caller on hold.',
      icon: PhoneIncoming,
      step: 'Step 01',
    },
    {
      id: 1,
      badge: 'UNDERSTAND',
      badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'Contextual Intelligence',
      subtitle: 'Understand natural conversations and customer requirements.',
      desc: 'Trained on domain-specific vocabulary, noisy audio, accents, and interruptions. Never sounds like a rigid phone tree.',
      icon: Brain,
      step: 'Step 02',
    },
    {
      id: 2,
      badge: 'QUALIFY',
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Smart Lead Qualification',
      subtitle: 'Ask questions and identify potential customers.',
      desc: 'Gathers essential lead information: scope, budget, urgency, and qualifiers so your team only works on true high-intent prospects.',
      icon: CheckSquare,
      step: 'Step 03',
    },
    {
      id: 3,
      badge: 'BOOK',
      badgeColor: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Automated Scheduling',
      subtitle: 'Schedule appointments through your connected calendar.',
      desc: 'Integrates with Google Calendar, Calendly, Acuity, and industry CRMs to book appointments without human intervention.',
      icon: Calendar,
      step: 'Step 04',
    },
    {
      id: 4,
      badge: 'TRANSFER',
      badgeColor: 'bg-purple-50 text-purple-600 border-purple-200',
      title: 'Intelligent Routing',
      subtitle: 'Send important calls directly to your team.',
      desc: 'Routes calls to VIP clients, sales specialists, or urgent requests based on custom escalation rules and your staff availability.',
      icon: PhoneForwarded,
      step: 'Step 05',
    },
    {
      id: 5,
      badge: 'FOLLOW-UP',
      badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'Automated Follow-Up',
      subtitle: 'Send configured SMS or email follow-ups.',
      desc: 'Sends immediate text confirmations, scheduling links, directions, or intake surveys to caller right after the call concludes.',
      icon: Send,
      step: 'Step 06',
    },
  ];

  return (
    <section id="solution" className="py-14 sm:py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Image 2 */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-600 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <span>THE COMPLETE FRONT-DESK SOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Meet Vedanco AI
          </h2>
          <p className="text-base sm:text-xl font-semibold text-blue-600 mt-1.5 sm:mt-2">
            Your 24/7 AI Receptionist
          </p>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Vedanco AI acts as the first point of contact for your business. It works tirelessly alongside your team, answering every caller with polite, accurate, and goal-driven intelligence.
          </p>
        </div>

        {/* 6 Action Cards Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {actions.map((act) => {
            const Icon = act.icon;
            const isSelected = selectedCard === act.id;
            return (
              <div
                key={act.id}
                onClick={() => setSelectedCard(act.id)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between text-left ${
                  isSelected
                    ? 'bg-white border-2 border-blue-500 shadow-lg shadow-blue-500/10 scale-[1.01] sm:scale-[1.02]'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 rounded border ${act.badgeColor}`}
                    >
                      {act.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 sm:mb-1.5">{act.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 sm:mb-4">{act.desc}</p>
                </div>

                <div>
                  {isSelected && (
                    <div className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1">
                      <span>Explore this step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>{isSelected ? '● Active In Simulation' : 'Click to inspect'}</span>
                    <span>{act.step}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Control Console matching Image 2 */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0B1120] text-white p-4 sm:p-8 shadow-2xl border border-slate-800">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-slate-800 mb-5 sm:mb-6">
            <div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">
                VEDANCO AI CONTROL CONSOLE
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white">
                Complete Front-Desk Automation in One View
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Monitor incoming calls, lead qualification scores, and calendar bookings in real-time.
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
              <button
                onClick={() => setConsoleTab('flow')}
                className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors ${
                  consoleTab === 'flow'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Call Processing Flow
              </button>
              <button
                onClick={() => setConsoleTab('qualification')}
                className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors ${
                  consoleTab === 'qualification'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lead Qualification
              </button>
              <button
                onClick={() => setConsoleTab('routing')}
                className={`flex-1 sm:flex-none text-center px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors ${
                  consoleTab === 'routing'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Routing Rules
              </button>
            </div>
          </div>

          {/* Console Content based on Tab */}
          {consoleTab === 'routing' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Card 1: Emergency */}
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Rule 1: Emergency Triggers</span>
                    <span className="text-[10px] font-semibold text-rose-400 bg-rose-950/70 border border-rose-500/40 px-2 py-0.5 rounded">
                      High Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Keywords: "emergency", "urgent", "immediate", "leak", "broken".
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                  Action: Push notification + call priority transfer.
                </div>
              </div>

              {/* Card 2: High-Value Leads */}
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Rule 2: High-Value Leads</span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded">
                      VIP Client
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Estimated budget &gt; $10,000 or enterprise inquiry.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                  Action: Attempt live transfer to Senior Account Rep.
                </div>
              </div>

              {/* Card 3: After-Hours Routing */}
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Rule 3: After-Hours Routing</span>
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/70 border border-blue-500/40 px-2 py-0.5 rounded">
                      Off-Hours
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Calls occurring between 6:00 PM and 8:00 AM.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-mono">
                  Action: Full intake + calendar booking + morning brief.
                </div>
              </div>
            </div>
          )}

          {consoleTab === 'flow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">Step 1: Pick-Up & Brand Greeting</div>
                <p className="text-xs text-slate-300">
                  Responds in 320ms using human-grade voice synthesis configured to your specific accent and tone.
                </p>
              </div>
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">Step 2: Natural Query Parsing</div>
                <p className="text-xs text-slate-300">
                  Handles complex caller phrasing, interruptions, and service questions using approved knowledge base.
                </p>
              </div>
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">Step 3: Outcome Execution</div>
                <p className="text-xs text-slate-300">
                  Direct calendar booking, warm staff transfer, or structured SMS confirmation dispatched in real-time.
                </p>
              </div>
            </div>
          )}

          {consoleTab === 'qualification' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">Qualification Scoring: 96%</div>
                <p className="text-xs text-slate-300">
                  Evaluates budget, location eligibility, decision-maker status, and service timeline.
                </p>
              </div>
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">CRM Auto-Tagging</div>
                <p className="text-xs text-slate-300">
                  Tags contact as "High Intent", writes call transcript to HubSpot/Salesforce, and notifies sales rep.
                </p>
              </div>
              <div className="bg-[#131C31] rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1">Spam & Robocall Filtering</div>
                <p className="text-xs text-slate-300">
                  Blocks telemarketers, robo-dialers, and sales spam before they ever ring your staff's desks.
                </p>
              </div>
            </div>
          )}

          {/* Footer Bar inside Console matching Image 2 */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <span className="text-xs text-slate-400">
              Configured specifically to your company's CRM, telephony, and calendar workflow.
            </span>
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md active:scale-95 shrink-0 text-center"
            >
              Schedule AI Architecture Call →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
