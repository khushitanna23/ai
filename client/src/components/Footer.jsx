import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  const solutions = [
    'AI Receptionist',
    'AI Call Agents',
    'Lead Qualification',
    'Appointment Booking',
    'Call Automation',
  ];

  const company = [
    { name: 'About Vedanco', href: '#how-it-works' },
    { name: 'Book a Demo', href: '#', isDemo: true },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Security & Compliance', href: '#' },
    { name: 'SOC-2 Type II / HIPAA compliant architecture', href: '#' },
  ];

  return (
    <footer className="bg-[#050814] text-slate-400 py-16 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col matching Image 2 */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shadow-md">
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3.5 bg-blue-500 rounded-full" />
                  <span className="w-1 h-5 bg-blue-400 rounded-full" />
                  <span className="w-1 h-3.5 bg-blue-500 rounded-full" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-sans">
                  VEDANCO
                </span>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 border border-blue-500/40 px-1.5 py-0.5 rounded">
                  AI
                </span>
              </div>
            </div>

            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
              YOUR 24/7 AI RECEPTIONIST
            </div>

            <p className="text-xs text-slate-400 font-medium max-w-sm leading-relaxed">
              Vedanco AI provides intelligent, voice-first AI receptionists for US businesses. Never miss another customer call, emergency lead, or high-value appointment.
            </p>

            <div className="pt-2">
              <a
                href="mailto:hello@vedanco.com"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-white font-medium text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hello@vedanco.com</span>
              </a>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4 font-mono">
              SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs">
              {solutions.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#solution"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4 font-mono">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs">
              {company.map((item, idx) => (
                <li key={idx}>
                  {item.isDemo ? (
                    <button
                      onClick={onOpenDemo}
                      className="text-slate-400 hover:text-white transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust Col matching Image 2 */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-4 font-mono">
              LEGAL & TRUST
            </h4>
            <ul className="space-y-2.5 text-xs">
              {legal.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors leading-relaxed block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching Image 2 */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Vedanco AI (ai.vedanco.com). All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
            <span>•</span>
            <span>24/7 Voice Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
