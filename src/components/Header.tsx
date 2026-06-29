import { useState, useEffect } from 'react';
import { Menu, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ContactPopover from './ContactPopover';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Фото', href: '#gallery' },
    { label: 'Удобства', href: '#amenities' },
    { label: 'Цены', href: '#booking' },
    { label: 'Как добраться', href: '#directions' },
    { label: 'Отзывы', href: '#reviews' },
    { label: 'Вопросы', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticking header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-bg/95 backdrop-blur-md shadow-md py-4 text-brand-text border-b border-brand-sand/30'
            : 'bg-transparent py-6 text-brand-bg-white'
        }`}
        id="app-header"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-serif italic font-bold text-2xl leading-none tracking-tight relative">
              Репка
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-brand-accent' : 'bg-white'}`}></span>
            </span>
            <span className={`text-xs leading-none uppercase tracking-widest font-mono border px-1.5 py-1 rounded flex items-center translate-y-[2px] ${scrolled ? 'border-brand-green/30 text-brand-green' : 'border-white/30 text-white/80'}`}>
              Дом в роще
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 group`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:sergey@repka.ru"
              className="hidden"
              aria-hidden="true"
            />
            <ContactPopover align="right" telegramText="Здравствуйте! Хочу забронировать домик Репка. Подскажите свободные даты.">
              {({ onClick }) => (
                <button
                  id="header-cta-tg"
                  onClick={onClick}
                  className={`flex items-center gap-2 text-sm font-medium py-2.5 px-5 rounded-md transition-all duration-300 ${
                    scrolled
                      ? 'bg-brand-accent text-white hover:bg-brand-accent-hover shadow-sm'
                      : 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-brand-text'
                  }`}
                >
                  <Send size={15} className="fill-current" />
                  <span>Написать Сергею</span>
                </button>
              )}
            </ContactPopover>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg transition-transform focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className={scrolled ? 'text-brand-text' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-brand-text' : 'text-white'} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              id="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-text/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              id="mobile-drawer-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-brand-bg-white shadow-2xl z-50 p-8 flex flex-col justify-between md:hidden border-l border-brand-sand/40 bg-grain"
            >
              <div>
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-brand-sand/30">
                  <span className="font-serif italic font-bold text-2xl text-brand-text-mid flex items-center gap-2">
                    Репка
                    <span className="text-[10px] leading-none uppercase tracking-widest font-mono border border-brand-green/30 text-brand-green px-1.5 py-1 rounded translate-y-[2px]">
                      Дом в роще
                    </span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-brand-text-mid hover:text-brand-accent transition-colors"
                  >
                    <X size={22} />
                  </button>
                </div>

                <nav className="flex flex-col gap-5">
                  {menuItems.map((item, idx) => (
                    <motion.a
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="text-lg font-medium text-brand-text hover:text-brand-accent transition-colors py-1 flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-brand-sand font-mono">0{idx + 1}</span>
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-brand-sand/30">
                <a
                  id="drawer-tel-link"
                  href="tel:+79151347999"
                  className="flex items-center gap-3 text-brand-text hover:text-brand-accent transition-colors py-2 text-sm font-medium"
                >
                  <Phone size={16} className="text-brand-green" />
                  <span>Позвонить Сергею</span>
                </a>

                <ContactPopover align="center" telegramText="Здравствуйте! Хочу забронировать домик Репка.">
                  {({ onClick }) => (
                    <button
                      id="drawer-tg-cta"
                      onClick={onClick}
                      className="w-full flex items-center justify-center gap-2 bg-brand-accent text-white text-center py-3.5 px-5 rounded-md hover:bg-brand-accent-hover transition-colors font-semibold"
                    >
                      <Send size={15} className="fill-current" />
                      <span>Написать хозяину</span>
                    </button>
                  )}
                </ContactPopover>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
