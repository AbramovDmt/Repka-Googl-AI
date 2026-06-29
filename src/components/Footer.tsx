import { Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { MAX_LINK } from '../lib/contacts';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="app-footer"
      className="bg-brand-bg-dark text-brand-bg-white py-16 border-t border-white/5 bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-left">
        
        {/* Col 1: Brand Wordmark (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <span className="font-serif italic font-bold text-3xl tracking-tight block text-white select-none">
            Репка <span className="text-brand-accent">A-frame</span>
          </span>
          <p className="text-xs text-brand-bg/60 leading-relaxed font-light max-w-sm">
            Ваш идеальный уголок спокойствия и замедления в 63 км от столицы. Современный лесной дом с дровяной баней и открытой огневой зоной на вековом березовом участке.
          </p>
          <div className="flex gap-1.5 items-center pt-2">
            <span className="text-[10px] font-mono tracking-widest text-brand-sand bg-white/5 px-2.5 py-1 rounded border border-white/5">
              EST. 2024
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links (2.5 cols) */}
        <div className="md:col-span-2.5 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-sand block">НАВИГАЦИЯ</span>
          <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
            {[
              { label: 'Галерея фото', href: '#gallery' },
              { label: 'Что включено', href: '#amenities' },
              { label: 'Смета и цены', href: '#booking' },
              { label: 'Как добраться', href: '#directions' },
              { label: 'Отзывы гостей', href: '#reviews' },
              { label: 'Частые вопросы', href: '#faq' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-brand-bg/70 hover:text-brand-accent transition-colors block py-0.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Direct Address & Contacts details (3 cols) */}
        <div className="md:col-span-3 space-y-4 text-left">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-sand block">КОНТАКТЫ И АДРЕС</span>
          <div className="space-y-3.5 text-xs sm:text-sm text-brand-bg/85 font-light leading-relaxed">
            
            <div className="flex gap-2.5 items-start">
              <MapPin size={16} className="text-brand-accent shrink-0 mt-0.5" />
              <span>
                Московская обл., Дмитровский р-н, пос. Мельчевка, СНТ Репка, д. 124
              </span>
            </div>

            <div className="flex gap-2.5 items-center">
              <Phone size={14} className="text-brand-accent shrink-0" />
              <a href="tel:+79151347999" className="hover:text-white transition-colors font-medium">
                +7 (915) 134-79-99
              </a>
            </div>

            <div className="flex gap-2.5 items-center">
              <Send size={14} className="text-brand-accent shrink-0 fill-current" />
              <a
                href="https://t.me/abramovdmt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium"
              >
                Telegram: @abramovdmt
              </a>
            </div>

            <div className="flex gap-2.5 items-center">
              <MessageCircle size={14} className="text-brand-accent shrink-0" />
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium"
              >
                MAX
              </a>
            </div>

          </div>
        </div>

        {/* Col 4: Emergencies contact box (2.5 cols) */}
        <div className="md:col-span-2.5 space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-sand block">СЛУЖБЫ СПАСЕНИЯ</span>
          <div className="bg-white/5 p-4 rounded border border-white/5 space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-brand-bg/80">
              <span className="font-light">☎ Единый МЧС:</span>
              <span className="font-mono font-bold text-white">112</span>
            </div>
            <div className="flex justify-between items-center text-brand-bg/80">
              <span className="font-light">🚑 Скорая помощь:</span>
              <span className="font-mono font-bold text-white">103 / 03</span>
            </div>
            <div className="h-[1px] bg-white/10 my-2" />
            <p className="text-[10px] text-brand-bg/40 leading-normal font-light">
              Адрес хорошо известен местным службам доставки и такси.
            </p>
          </div>
        </div>

      </div>

      {/* Extreme Bottom details details card */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-brand-bg/40 font-mono">
        <span>
          © {currentYear} A-frame домик «Репка». Все права сохранены.
        </span>
        <div className="flex gap-4">
          <span>Сделано с любовью</span>
          <span>•</span>
          <span>Не является публичной офертой</span>
        </div>
      </div>
    </footer>
  );
}
