import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryPhotos } from '../data';
import { GalleryItem } from '../types';
import imgHero from '../assets/images/hero.png';
import imgFacade from '../assets/images/facade.png';
import imgCampfire from '../assets/images/campfire.png';
import imgInt1 from '../assets/images/interior_1.png';
import imgInt2 from '../assets/images/interior_2.png';
import imgInt3 from '../assets/images/interior_3.png';
import imgInt4 from '../assets/images/interior_4.png';
import imgInt5 from '../assets/images/interior_5.png';
import imgInt6 from '../assets/images/interior_6.png';
import imgInt7 from '../assets/images/interior_7.png';
import imgBanya1 from '../assets/images/banya_1.png';
import imgBanya2 from '../assets/images/banya_2.png';
import imgBanya3 from '../assets/images/banya_3.png';
import imgBanya4 from '../assets/images/banya_4.png';
import imgBanya5 from '../assets/images/banya_5.png';
import imgBanya6 from '../assets/images/banya_6.png';
import imgSup from '../assets/images/sup.png';
import imgSurr1 from '../assets/images/surroundings_1.png';
import imgSurr2 from '../assets/images/surroundings_2.png';
import imgSurr3 from '../assets/images/surroundings_3.png';
import imgSurr4 from '../assets/images/surroundings_4.jpg';
import imgPark from '../assets/images/park.jpg';
import imgTerrace from '../assets/images/terrace.jpg';
import imgBanya7 from '../assets/images/banya_7.jpg';
import imgBanya8 from '../assets/images/banya_8.jpg';
import imgBanya9 from '../assets/images/banya_9.jpg';
import imgBanya10 from '../assets/images/banya_10.jpg';
import imgBanya11 from '../assets/images/banya_11.jpg';
import imgBanya12 from '../assets/images/banya_12.jpg';
import imgBanya13 from '../assets/images/banya_13.jpg';
import imgBanya14 from '../assets/images/banya_14.jpg';
import imgInt8 from '../assets/images/interior_8.jpg';
import imgInt9 from '../assets/images/interior_9.jpg';
import imgInt10 from '../assets/images/interior_10.jpg';
import imgInt11 from '../assets/images/interior_11.jpg';
import imgInt12 from '../assets/images/interior_12.jpg';

const imageMap: Record<string, string> = {
  '@HERO@': imgHero,
  '@FACADE@': imgFacade,
  '@CAMPFIRE@': imgCampfire,
  '@PARK@': imgPark,
  '@TERRACE@': imgTerrace,
  '@INT1@': imgInt1,
  '@INT2@': imgInt2,
  '@INT3@': imgInt3,
  '@INT4@': imgInt4,
  '@INT5@': imgInt5,
  '@INT6@': imgInt6,
  '@INT7@': imgInt7,
  '@INT8@': imgInt8,
  '@INT9@': imgInt9,
  '@INT10@': imgInt10,
  '@INT11@': imgInt11,
  '@INT12@': imgInt12,
  '@BANYA1@': imgBanya1,
  '@BANYA2@': imgBanya2,
  '@BANYA3@': imgBanya3,
  '@BANYA4@': imgBanya4,
  '@BANYA5@': imgBanya5,
  '@BANYA6@': imgBanya6,
  '@BANYA7@': imgBanya7,
  '@BANYA8@': imgBanya8,
  '@BANYA9@': imgBanya9,
  '@BANYA10@': imgBanya10,
  '@BANYA11@': imgBanya11,
  '@BANYA12@': imgBanya12,
  '@BANYA13@': imgBanya13,
  '@BANYA14@': imgBanya14,
  '@SUP@': imgSup,
  '@SURR1@': imgSurr1,
  '@SURR2@': imgSurr2,
  '@SURR3@': imgSurr3,
  '@SURR4@': imgSurr4,
};

const resolvedPhotos: GalleryItem[] = galleryPhotos.map(photo => ({
  ...photo,
  url: imageMap[photo.url] ?? photo.url,
}));

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'all' | 'exterior' | 'interior' | 'banya' | 'surroundings'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Filter photos based on active tab
  const filteredPhotos = resolvedPhotos.filter(
    (photo) => activeTab === 'all' || photo.category === activeTab
  );

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  // Touch triggers for swipe action on mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext(); // swipe left, show next
      } else {
        handlePrev(); // swipe right, show prev
      }
    }
  };

  const tabs: { value: typeof activeTab; label: string }[] = [
    { value: 'all', label: 'Все фото' },
    { value: 'exterior', label: 'Дом снаружи' },
    { value: 'interior', label: 'Интерьеры' },
    { value: 'banya', label: 'Баня' },
    { value: 'surroundings', label: 'Окрестности' },
  ];

  return (
    <section
      id="gallery"
      className="py-24 bg-brand-bg relative border-b border-brand-sand/30 bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Head Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Наш фотоальбом</span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
            Рассмотреть в деталях
          </h2>
          <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
            Мы бережно запечатлели каждый уголок «Репки», чтобы у вас не осталось сомнений: в реальности домик выглядит ещё волшебнее, чем на картинках.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
          <div className="flex gap-1.5 sm:gap-2.5 bg-brand-sand/20 p-1.5 rounded-full border border-brand-sand/30">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setLightboxIndex(null); // safely clear index to avoid mismatch
                }}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-brand-text-mid hover:text-brand-text hover:bg-brand-sand/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              // Custom span classes for beautiful mosaic layout rhythm
              const isLarge = index === 0 && activeTab === 'all';
              const spanClass = isLarge
                ? 'md:col-span-2 md:row-span-2 aspect-[4/3] sm:aspect-video md:aspect-[4/3]'
                : 'aspect-[4/3]';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative overflow-hidden rounded-md border border-brand-sand/20 bg-brand-bg-white cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${spanClass}`}
                >
                  {/* Photo representation */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark gradient shadow inside */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-dark/75 via-brand-bg-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10" />

                  {/* Caption & hover icon details */}
                  <div className="absolute bottom-0 left-0 w-full p-5 text-left text-brand-bg-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20 flex justify-between items-end">
                    <div>
                      <h4 className="font-serif italic text-base sm:text-lg mb-0.5">{photo.title}</h4>
                      <p className="text-xs text-brand-sand/95 font-light line-clamp-1">{photo.description}</p>
                    </div>
                    <div className="bg-brand-bg-white/10 backdrop-blur-md p-2 rounded border border-white/25 text-white">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX COMPONENT - Fullscreen Modal Overlay Slider */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Toolbar actions safety block */}
            <div className="relative z-50 flex items-center justify-between w-full h-12 max-w-7xl mx-auto text-white">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-brand-sand">
                {lightboxIndex + 1} / {filteredPhotos.length} — {filteredPhotos[lightboxIndex].title}
              </span>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Закрыть галерею"
              >
                <X size={20} />
              </button>
            </div>

            {/* Middle slider carousel viewport */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto h-[60vh]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous button trigger (desktop/tablet) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-0 sm:left-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors cursor-pointer"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Large Central Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filteredPhotos[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-h-full max-w-full flex items-center justify-center"
                >
                  <img
                    src={filteredPhotos[lightboxIndex].url}
                    alt={filteredPhotos[lightboxIndex].title}
                    className="max-h-[72vh] max-w-full object-contain rounded select-none shadow-3xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next button trigger (desktop/tablet) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-0 sm:right-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors cursor-pointer"
                aria-label="Следующее фото"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption and helper details bar */}
            <div className="relative z-50 w-full max-w-3xl mx-auto text-center text-white pb-4">
              <h3 className="font-serif italic text-lg sm:text-xl md:text-2xl text-brand-sand mb-1">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
                {filteredPhotos[lightboxIndex].description}
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {filteredPhotos.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setLightboxIndex(dotIndex)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      lightboxIndex === dotIndex ? 'w-4 bg-brand-accent' : 'bg-white/35'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
