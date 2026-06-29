/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUp, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Atmosphere from './components/Atmosphere';
import Gallery from './components/Gallery';
import Included from './components/Included';
import Directions from './components/Directions';
import BookingCalculator from './components/BookingCalculator';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80; // account for sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg-white font-sans antialiased text-brand-text relative selection:bg-brand-accent/20 selection:text-brand-accent">
      
      {/* 1. Header (Sticky navigation + logo + drawer menu) */}
      <Header />

      {/* 2. Hero banner header section (100vh) */}
      <Hero onGalleryClick={() => scrollToSection('#gallery')} />

      {/* 3. Emotional Lifestyle block */}
      <Atmosphere />

      {/* 4. Categorized Gallery Section with dynamic tabs & fullscreen Lightbox */}
      <Gallery />

      {/* 5. Complete Amenities & conveniences guide card grid */}
      <Included />

      {/* 6. Dynamic split-screen Directions map embed, landmarks & copy-gps locator */}
      <Directions />

      {/* 7. Interactive dynamic Pricing Calculator with real-time receipts quoting & TG prefilling links */}
      <BookingCalculator />

      {/* 8. Verified reviews carousel grid with social proofs metrics */}
      <Reviews />

      {/* 9. Human-friendly QA accordions segment */}
      <FAQ />

      {/* 10. Sergei humanized Call to action and conversion closing pitch */}
      <FinalCTA />

      {/* 11. Cohesive footer with legal guidelines, emergency contacts & navigators */}
      <Footer />

      {/* FLOATING ACTION UTILITIES */}
      {/* Scroll-to-Top circular tracker button helper */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 sm:p-3.5 rounded-full bg-brand-bg-white hover:bg-brand-accent hover:text-white text-brand-text border border-brand-sand/40 shadow-xl transition-all duration-300 transform scale-100 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer hidden sm:flex"
          aria-label="На уровень вверх"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Mobile-Only Quick action chat overlay floating bubble */}
      <div className="fixed bottom-4 left-4 z-40 sm:hidden">
        <a
          id="mobile-floating-tg"
          href="https://t.me/Fedin800?text=Здравствуйте!%20Хочу%20уточнить%20свободные%20даты%20для%20заезда%20в%20домик%20Репка."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#22c55e] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#16a34a] transition-all font-semibold text-xs border border-white/20"
        >
          <Send size={13} className="fill-current rotate-45 shrink-0" />
          <span>Спросить в Telegram</span>
        </a>
      </div>

    </div>
  );
}
