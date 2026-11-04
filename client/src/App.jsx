import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemHook from './components/ProblemHook';
import ProblemCards from './components/ProblemCards';
import SolutionSection from './components/SolutionSection';
import LiveDemoSection from './components/LiveDemoSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import IndustriesSection from './components/IndustriesSection';
import CustomizationSection from './components/CustomizationSection';
import PricingSection from './components/PricingSection';
import ComparisonSection from './components/ComparisonSection';
import RoiSection from './components/RoiSection';
import WhyVedanco from './components/WhyVedanco';
import TestimonialSection from './components/TestimonialSection';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import CallModal from './components/CallModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    // Ensure the website always opens at the very top (first page / hero)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const CALENDLY_URL = 'https://calendly.com/nachiketdpatel/book-your-free-15-min-call-with-nachiket';

  const handleOpenDemo = () => {
    const win = window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      setIsDemoModalOpen(true);
    }
  };
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  const handleOpenCall = () => setIsCallModalOpen(true);
  const handleCloseCall = () => setIsCallModalOpen(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-navy-900 font-sans selection:bg-electric-600 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} onOpenCall={handleOpenCall} />

      {/* Main Sections */}
      <main id="main-content">
        {/* Section 4: Hero Section */}
        <Hero onOpenDemo={handleOpenDemo} onOpenCall={handleOpenCall} />

        {/* Section 5: Problem / Trust Hook */}
        <ProblemHook onOpenDemo={handleOpenDemo} />

        {/* Section 6: Problem Cards */}
        <ProblemCards />

        {/* Section 7: Solution Section */}
        <SolutionSection onOpenDemo={handleOpenDemo} />

        {/* Section 8: Live AI Call Demo (MOST IMPORTANT SECTION) */}
        <LiveDemoSection onOpenDemo={handleOpenDemo} onOpenCall={handleOpenCall} />

        {/* Section 9: How It Works */}
        <HowItWorks />

        {/* Section 10: Features */}
        <FeaturesSection onOpenDemo={handleOpenDemo} />

        {/* Section 11: Industries */}
        <IndustriesSection onOpenDemo={handleOpenDemo} />

        {/* Section 12: Customization */}
        <CustomizationSection onOpenDemo={handleOpenDemo} />

        {/* Section 13: Pricing */}
        <PricingSection onOpenDemo={handleOpenDemo} />

        {/* Section 14: Comparison */}
        <ComparisonSection />

        {/* Section 15: ROI / Outcome Section */}
        <RoiSection onOpenDemo={handleOpenDemo} />

        {/* Section 16: Why Vedanco */}
        <WhyVedanco />

        {/* Section 17: Testimonial Section */}
        <TestimonialSection onOpenDemo={handleOpenDemo} />

        {/* Section 18: FAQ */}
        <FaqSection />

        {/* Section 19: Final CTA */}
        <FinalCta onOpenDemo={handleOpenDemo} onOpenCall={handleOpenCall} />
      </main>

      {/* Section 20: Footer */}
      <Footer onOpenDemo={handleOpenDemo} onOpenCall={handleOpenCall} />

      {/* Conversion Modals */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
      <CallModal isOpen={isCallModalOpen} onClose={handleCloseCall} onOpenDemo={handleOpenDemo} />
    </div>
  );
}
