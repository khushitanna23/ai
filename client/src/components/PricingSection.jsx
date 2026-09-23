import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { pricingPlans, pricingDisclaimer } from '../data/pricing';

export default function PricingSection({ onOpenDemo }) {
  return (
    <section id="pricing" className="py-14 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Transparent Investment
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Simple Monthly Pricing.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-charcoal-600">
            No complex contracts. Choose the plan that fits your call volume and front desk workflow.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8 sm:mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-navy-900 text-white shadow-2xl border-2 border-electric-500 lg:scale-105 z-10'
                  : 'bg-white text-navy-900 shadow-sm border border-slate-200/90 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 px-3.5 sm:px-4 py-1 rounded-full bg-electric-600 text-white text-[10px] sm:text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="mb-3 sm:mb-4">
                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-navy-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-slate-300' : 'text-charcoal-500'}`}>
                    {plan.subtitle}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 my-4 sm:my-6">
                  <span className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${plan.popular ? 'text-white' : 'text-navy-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium ${plan.popular ? 'text-slate-300' : 'text-charcoal-500'}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 pb-5 sm:pb-6 border-b ${plan.popular ? 'border-white/10 text-slate-300' : 'border-slate-100 text-charcoal-600'}`}>
                  {plan.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          plan.popular ? 'bg-electric-500/20 text-electric-400' : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className={plan.popular ? 'text-slate-200' : 'text-charcoal-700'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={onOpenDemo}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 ${
                    plan.popular
                      ? 'bg-electric-600 hover:bg-electric-500 text-white shadow-electric-600/30'
                      : 'bg-navy-900 hover:bg-navy-800 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Small Disclaimer */}
        <p className="text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {pricingDisclaimer}
        </p>
      </div>
    </section>
  );
}
