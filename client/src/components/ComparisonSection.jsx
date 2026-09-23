import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { comparisonRows } from '../data/comparison';

export default function ComparisonSection() {
  return (
    <section className="py-14 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Side-By-Side Comparison
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Traditional Reception vs. Vedanco AI
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-charcoal-600">
            See why modern US businesses are upgrading from legacy voicemail and overburdened front desks.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center text-xs text-slate-400 mb-3 flex items-center justify-center gap-1.5 font-medium">
          <span>← Swipe horizontally to compare →</span>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[560px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-navy-900 uppercase tracking-wider w-2/5">
                  Capability / Attribute
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider w-3/10">
                  Traditional Reception
                </th>
                <th className="py-4 sm:py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-electric-600 uppercase tracking-wider bg-electric-50/50 w-3/10">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-electric-600" />
                    <span>Vedanco AI</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {comparisonRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-semibold text-navy-900">
                    {row.feature}
                  </td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 text-charcoal-600">
                    {row.traditional}
                  </td>
                  <td className="py-3.5 sm:py-4 px-4 sm:px-6 font-semibold text-navy-900 bg-electric-50/30">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{row.vedanco}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
