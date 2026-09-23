import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/faq';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold text-electric-600 uppercase tracking-wider bg-electric-50 px-3 py-1 rounded-full border border-electric-100">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-charcoal-600">
            Have questions about implementation, pricing, or call routing? Here are answers to common questions.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50 border-electric-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-4 sm:py-5 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-lg text-navy-900 pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-electric-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-charcoal-600 leading-relaxed border-t border-slate-200/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
