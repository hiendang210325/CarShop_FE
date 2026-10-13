import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilterDeck } from './components/SearchFilterDeck';
import { BrandSelector } from './components/BrandSelector';
import { FeaturedInventory } from './components/FeaturedInventory';
import { InspectionSection } from './components/InspectionSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

export const CarShopLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      <main>
        {/* 2. Hero Presentation */}
        <HeroSection />

        {/* 3. Search & Quick Filters Deck + Key Stats */}
        <SearchFilterDeck />

        {/* 4. Luxury Brand Explorer & Categories */}
        <BrandSelector />

        {/* 5. Featured Car Inventory (Cards Grid with Telemetry specs) */}
        <FeaturedInventory />

        {/* 6. 176-Point Inspection Standards & Guarantees */}
        <InspectionSection />

        {/* 7. Financial Installment Calculator */}
        <FinanceCalculator />

        {/* 8. Client Testimonials & Social Proof */}
        <TestimonialsSection />
      </main>

      {/* 9. Showroom Branches & Master Footer */}
      <Footer />
    </div>
  );
};

export default CarShopLandingPage;
