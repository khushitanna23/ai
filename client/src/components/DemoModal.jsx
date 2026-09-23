import React from 'react';
import { X, ExternalLink, Calendar, Sparkles } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nachiketdpatel/book-your-free-15-min-call-with-nachiket';

export default function DemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[820px] rounded-3xl bg-white p-3 sm:p-5 shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-left">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none">
                  Book a Call
                </h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded uppercase">
                  15 Min Call
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pick a date & time that works best for you via Calendly
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100/70 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Calendly Booking Page (Responsive iframe) */}
        <div className="w-full flex-1 overflow-hidden rounded-2xl bg-white border border-slate-100 relative">
          <iframe
            src={CALENDLY_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a Call with Vedanco AI"
            className="w-full h-full border-0 min-h-[360px] sm:min-h-[480px]"
          />
        </div>

        {/* Bottom Note */}
        <div className="pt-2 px-1 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 gap-1 text-center sm:text-left">
          <span>Powered by Calendly • Automated calendar invitations & confirmations</span>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden text-blue-600 font-semibold flex items-center gap-1"
          >
            <span>Open in full tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}