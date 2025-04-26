import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ProblemStatement from '../components/sections/ProblemStatement';
import HowItWorks from '../components/sections/HowItWorks';
import Features from '../components/sections/Features';
import Screenshots from '../components/sections/Screenshots';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-dark-300 min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <HowItWorks />
        <Features />
        <Screenshots />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;