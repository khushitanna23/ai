import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

export default function CustomizationSection({ onOpenDemo }) {
  const [consoleTab, setConsoleTab] = useState('greeting'); // 'greeting' | 'transfer' | 'hours'

  const configurableItems = [
    {
      title: 'Greeting',
      desc: 'Custom office welcome and brand identity',
    },
    {
      title: 'Tone of voice',
      desc: 'Warm, professional, clinical, or energetic',
    },
    {
      title: 'Services',
      desc: 'Exact menu of supported services & offerings',
    },
    {
      title: 'FAQs',
      desc: 'Answers to directions, pricing policies & insurance',
    },
    {
      title: 'Business hours',
      desc: 'Day/night protocols and weekend overrides',
    },
    {
      title: 'Lead qualification questions',
      desc: 'Criteria required before scheduling',
    },
    {
      title: 'Appointment rules',
      desc: 'Buffer times, provider assignment & limits',
    },
    {
      title: 'Call-transfer rules',
      desc: 'Who gets transferred and under what triggers',
    },
    {
      title: 'Escalation rules',
      desc: 'Emergency after-hours on-call dispatching',
    },
    {
      title: 'Information the AI can provide',
      desc: 'Approved knowledge boundaries (zero hallucination)',
    },
  ];

  return (
    <section className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4">
            <span>TAILORED CONFIGURATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Business. Your Rules. Your AI.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Before your AI receptionist goes live, we configure it around your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column: Checklist & Promise Banner matching Image 1 */}
          <div className="lg:col-span-6">
            {/* Header above checklist */}
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-sm">
              <div className="grid grid-cols-2 gap-0.5 text-blue-600">
                <span className="w-1.5 h-1.5 rounded-sm bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-sm bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-sm bg-blue-600" />
                <span className="w-1.5 h-1.5 rounded-sm bg-blue-600" />
              </div>
              <span>Full Control Over Every Conversation</span>
            </div>

            {/* 10 Checklist Cards in 2 Columns matching Image 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {configurableItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/90 flex items-start gap-2.5 transition-colors hover:border-slate-300"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Banner matching Image 1 */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">
                AI handles the routine. Your team handles what matters.
              </span>
            </div>
          </div>

          {/* Right Column: Dark Settings Console Window matching Image 1 */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0B1120] text-white p-5 sm:p-6 shadow-2xl border border-slate-800 space-y-4">
              {/* Window Top Bar with Traffic Light Dots */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  vedanco-ai://settings/model-control
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                  Status: Synced & Active
                </span>
              </div>

              {/* 3 Window Tabs matching Image 1 */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setConsoleTab('greeting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    consoleTab === 'greeting'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Brand Greeting & Voice
                </button>
                <button
                  onClick={() => setConsoleTab('transfer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    consoleTab === 'transfer'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transfer & Escalation
                </button>
                <button
                  onClick={() => setConsoleTab('hours')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    consoleTab === 'hours'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hours & FAQs
                </button>
              </div>

              {/* Greeting Script Card */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  ACTIVE GREETING SCRIPT
                </div>
                <div className="bg-[#070C1E] p-3 rounded-xl border border-slate-800/80 text-xs text-slate-200 italic leading-relaxed">
                  "Thank you for calling Apex Dental Care. This is Vedanco, our AI receptionist. How may I assist you today?"
                </div>
              </div>

              {/* Voice Model & Accent Grid matching Image 1 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#070C1E] p-3 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
                    VOICE MODEL
                  </div>
                  <div className="text-xs text-white font-semibold">
                    Eleanor (US Professional, Warm)
                  </div>
                </div>
                <div className="bg-[#070C1E] p-3 rounded-xl border border-slate-800/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
                    ACCENT & CADENCE
                  </div>
                  <div className="text-xs text-white font-semibold">
                    General American, 1.05x Speed
                  </div>
                </div>
              </div>

              {/* Interruption Tolerance Slider matching Image 1 */}
              <div className="bg-[#070C1E] p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  INTERRUPTION TOLERANCE
                </div>
                <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-3/5 bg-blue-600 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Strict</span>
                  <span className="text-blue-400 font-semibold">Natural Flow (Recommended)</span>
                  <span>Relaxed</span>
                </div>
              </div>

              {/* Window Footer matching Image 1 */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Managed by Vedanco Implementation Team</span>
                <span className="text-blue-400 font-mono font-semibold">100% Turnkey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
