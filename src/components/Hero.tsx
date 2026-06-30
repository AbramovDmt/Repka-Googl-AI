import { useRef } from 'react';
import { ArrowDown, CalendarDays, Image } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import heroImage from '../assets/images/hero.png';

const HERO_IMAGE_PATH = heroImage;

interface HeroProps {
  onGalleryClick: () => void;
}

export default function Hero({ onGalleryClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '150px']);

  return (
    <div
      id="hero-section"
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-bg-dark bg-grain"
    >
      {/* Background Image Container — slightly oversized to cover the parallax shift */}
      <div className="absolute -top-[200px] -bottom-[200px] inset-x-0 z-0 overflow-hidden">
        <motion.img
          src={HERO_IMAGE_PATH}
          alt="Треугольный домик Репка в берёзовой роще"
          style={{ y: imageY }}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Natural gradient overlays to blend into text and maintain accessibility — sized to the actual viewport, not the oversized image box */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg-dark via-brand-bg-dark/40 to-brand-bg-dark/60 z-10" />

      {/* Main Text Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center text-brand-bg-white flex flex-col items-center justify-center">
        {/* Small aesthetic tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-brand-sand font-mono border border-brand-sand/30 bg-brand-bg-dark/60 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block">
            Уютное уединение в Подмосковье
          </span>
        </motion.div>

        {/* H1 Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl leading-[1.1] mb-6 tracking-tight max-w-3xl"
        >
          Выдохнуть в берёзовой роще
        </motion.h1>

        {/* Subhead details list */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="font-sans text-brand-bg/90 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-light"
        >
          63 км от Москвы · Новый треугольный дом 2024 года · Дровяная баня · Огневая зона · Канал им. Москвы в 300 метрах
        </motion.p>

        {/* Dual Actions CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            id="hero-primary-cta"
            onClick={() => {
              const el = document.querySelector('#booking');
              if (el) {
                const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-brand-bg-white text-base font-medium py-4 px-8 rounded transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:translate-y-[-2px]"
          >
            <CalendarDays size={16} />
            <span>Выбрать даты</span>
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onGalleryClick}
            className="w-full sm:w-auto border border-brand-sand/60 bg-brand-bg-dark/35 backdrop-blur-md hover:bg-brand-bg-white hover:text-brand-text text-brand-bg-white text-base font-medium py-4 px-8 rounded transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:translate-y-[-2px]"
          >
            <Image size={16} />
            <span>Посмотреть фото</span>
          </button>
        </motion.div>
      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="cursor-pointer text-brand-sand/65 hover:text-white transition-colors p-2"
          onClick={onGalleryClick}
        >
          <ArrowDown size={28} />
        </motion.div>
      </div>
    </div>
  );
}
