import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Phone, Building, Mail, User } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Dental Clinics',
    estimatedCallVolume: '100-500 calls/month',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      let response;
      try {
        response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (proxyErr) {
        response = await fetch('http://localhost:5000/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok && (data.success || response.status === 200 || response.status === 201)) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Something went wrong on the server.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMessage('Failed to connect to server. Check if backend port 5000 is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-electric-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-electric-600">
                Vedanco AI Consultation
              </span>
            </div>

            <h3 className="text-2xl font-black text-navy-900">
              Book Your Free Demo
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1 mb-6">
              Experience a custom walk-through of your business call workflows. No credit card required.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Apex Services LLC"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 bg-white"
                  >
                    <option value="Dental Clinics">Dental Clinics</option>
                    <option value="Home Services">Home Services (HVAC/Plumbing)</option>
                    <option value="Law Firms">Law Firms</option>
                    <option value="Healthcare">Healthcare Practices</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Auto Services">Auto Services</option>
                    <option value="Med Spas">Med Spas</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Other Business">Other Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Est. Inbound Calls
                  </label>
                  <select
                    name="estimatedCallVolume"
                    value={formData.estimatedCallVolume}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 bg-white"
                  >
                    <option value="Under 100 calls/mo">Under 100 calls/month</option>
                    <option value="100-500 calls/mo">100 - 500 calls/month</option>
                    <option value="500-1500 calls/mo">500 - 1,500 calls/month</option>
                    <option value="1500+ calls/mo">1,500+ calls/month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Requirements / Questions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us what CRM you use or how your team currently handles after-hours calls..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-navy-900 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:bg-slate-400 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span>Processing Demo Request...</span>
                ) : (
                  <>
                    <span>Confirm Free Demo Request</span>
                    <Send className="w-4 h-4 text-electric-400" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-navy-900">
              Demo Request Confirmed!
            </h3>
            <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-navy-900">{formData.name}</strong>. Our team has received your information. A Vedanco AI onboarding specialist will contact you at <strong className="text-navy-900">{formData.email}</strong> within 24 business hours to set up your tailored demo.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 rounded-xl bg-navy-900 text-white text-xs font-semibold"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}