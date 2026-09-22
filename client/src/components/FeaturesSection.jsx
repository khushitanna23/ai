import React from 'react';
import {
  PhoneCall,
  UserCheck,
  CalendarCheck,
  PhoneForwarded,
  BookOpen,
  MessageSquare,
  Database,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { features } from '../data/features';

const iconMap = {
  PhoneCall,
  UserCheck,
  CalendarCheck,
  PhoneForwarded,
  BookOpen,
  MessageSquare,
  Database,
  FileText,
};

export default function FeaturesSection({ onOpenDemo }) {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Enterprise Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Everything Your Front Desk Needs.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600">
            A comprehensive voice AI infrastructure built specifically to handle complex phone operations, calendar schedules, and CRM synchronization.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = iconMap[feat.icon] || PhoneCall;
            return (
              <div
                key={feat.id}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-7 border border-slate-200/80 hover:border-electric-400 hover:shadow-xl hover:shadow-electric-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:bg-electric-500 group-hover:border-electric-500 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6 text-navy-900 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-electric-600 transition-colors">
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-electric-600">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
