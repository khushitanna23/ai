import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenDemo, onOpenCall }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Industries', href: '#industries' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo matching Image 2 */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0B1120] border border-slate-800 flex items-center justify-center shadow-md shadow-slate-900/10">
              {/* 3 soundwave bars */}
              <div className="flex items-center gap-1">
                <span className="w-1 h-3.5 bg-blue-500 rounded-full" />
                <span className="w-1 h-5 bg-blue-400 rounded-full" />
                <span className="w-1 h-3.5 bg-blue-500 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-sans leading-none">
                  VEDANCO
                </span>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded leading-none">
                  AI
                </span>
              </div>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-slate-400 mt-0.5">
                24/7 AI RECEPTIONIST
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions matching Image 2 */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenCall}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Our AI</span>
            </button>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-md hover:shadow-blue-600/20 transition-all active:scale-95"
            >
              <span>Book a Free Demo →</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDemo}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-4 pb-6 border-t border-slate-200 bg-white/95 backdrop-blur-xl rounded-2xl px-4 shadow-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCall();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-300 text-slate-800 rounded-xl font-medium text-sm"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Our AI</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemo();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-md"
                >
                  <span>Book a Free Demo →</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
