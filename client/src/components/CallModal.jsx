import React, { useState } from 'react';
import {
  X,
  Phone,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export default function CallModal({ isOpen, onClose, onOpenDemo }) {
  const [phone, setPhone] = useState('9557149619');
  const [language, setLanguage] = useState('hindi');
  const [isLoading, setIsLoading] = useState(false);
  const [callResult, setCallResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    // Keep only numbers and max 10 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (errorMessage) setErrorMessage('');
  };

  const handleTriggerCall = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://neura-call.dialflow.in/api/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '792d5d585864a6ab1132b79d3091108374fc936be8b0da07a553ee61931e646c',
        },
        body: JSON.stringify({
          phone: cleanPhone,
          language: language.toLowerCase(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success || !data.error)) {
        setCallResult({
          phone: cleanPhone,
          language: data.language || language.toUpperCase(),
          reference: data.reference || 'N/A',
          message: data.message || 'Call initiated successfully.',
        });
      } else {
        setErrorMessage(
          data.error || data.message || 'Failed to initiate the demo call. Please try again.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'Unable to connect to the call server. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCallResult(null);
    setErrorMessage('');
  };

  const handleBookDemo = () => {
    onClose();
    if (onOpenDemo) onOpenDemo();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[94vh] overflow-y-auto rounded-3xl bg-[#0B1120] text-white p-5 sm:p-8 shadow-2xl border border-slate-800 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {callResult ? (
          /* SUCCESS STATE */
          <div className="text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 animate-bounce" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Call Outbound Triggered</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Call Initiated Successfully! 🚀
            </h3>

            <p className="text-sm text-slate-300 mt-2 mb-5 leading-relaxed max-w-sm mx-auto">
              Our AI Voice Assistant <span className="text-white font-semibold">Sneha</span> is dialing{' '}
              <span className="text-blue-400 font-mono font-semibold">+91 {callResult.phone}</span>.
            </p>

            <div className="bg-[#070C1E] rounded-2xl p-4 border border-emerald-500/30 text-left space-y-2 mb-6 text-xs text-slate-300 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">⏱️ Expected Ring Time:</span>
                <span className="text-emerald-400 font-bold font-mono">10 – 30 Seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">🗣️ Language:</span>
                <span className="text-white font-medium capitalize">{callResult.language}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">🎭 Voice Agent:</span>
                <span className="text-white font-medium">Sneha (Vedanco AI)</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 mt-2">
                <span className="text-slate-400">🔖 Reference ID:</span>
                <span className="text-blue-400 font-mono font-semibold">{callResult.reference}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 mb-6 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
              <span>Please keep your phone unlocked and answer the incoming call to test!</span>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleReset}
                className="w-full py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Call Another Number</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-lg">
                <PhoneCall className="w-6 h-6 text-blue-400 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 text-[10px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Live AI Voice Call</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Call Our AI Demo (Sneha)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
              Experience Vedanco AI's voice receptionist live on your phone. Enter your number below and Sneha will call you in <span className="text-blue-400 font-semibold">10–30 seconds</span>.
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleTriggerCall} className="space-y-4">
              {/* Phone Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your 10-Digit Mobile Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-400 select-none">
                    <span>🇮🇳</span>
                    <span>+91</span>
                    <span className="text-slate-600">|</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="9557149619"
                    maxLength={10}
                    disabled={isLoading}
                    className="w-full pl-20 pr-4 py-3 rounded-xl bg-[#070C1E] border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white font-mono text-sm tracking-wide placeholder-slate-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Default set to <span className="text-slate-200 font-mono">9557149619</span>. You can change it anytime.
                </p>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('hindi')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      language === 'hindi'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-[#070C1E] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>Hindi (हिंदी)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage('english')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      language === 'english'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-[#070C1E] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span>🌐</span>
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* Specs Box */}
              <div className="bg-[#070C1E] rounded-xl p-3 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Call Delivery Time</span>
                  </span>
                  <span className="text-emerald-400 font-medium">~10 - 30 seconds</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>AI Assistant</span>
                  </span>
                  <span className="text-slate-200 font-medium">Sneha (Vedanco AI)</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading || !phone}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Initiating Call to {phone}...</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Call +91 {phone || '...'} Now</span>
                  </>
                )}
              </button>
            </form>

            {/* Extra Calendly option */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={handleBookDemo}
                className="text-xs text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Need a scheduled walkthrough? Book a Free Demo Call →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
