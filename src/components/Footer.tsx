import { Phone, MapPin, Send, Siren, Stethoscope } from 'lucide-react';
import { MAX_LINK } from '../lib/contacts';
import MaxIcon from './icons/MaxIcon';

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
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start text-left">

        {/* Col 1: Brand Wordmark (3 of 12 cols on desktop, full width on tablet) */}
        <div className="sm:col-span-2 lg:col-span-3 space-y-4 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-3xl leading-none tracking-tight text-white select-none">
              Репка
            </span>
            <span className="text-xs leading-none uppercase tracking-widest font-mono border border-white/20 text-white/70 px-1.5 py-1 rounded flex items-center translate-y-[2px]">
              Дом в роще
            </span>
          </div>
          <p className="text-xs text-brand-bg/60 leading-relaxed font-light max-w-sm">
            Ваш идеальный уголок спокойствия и замедления в 63 км от столицы. Современный лесной дом с дровяной баней и открытой огневой зоной на березовом участке.
          </p>
          <div className="flex gap-1.5 items-center pt-2">
            <span className="text-[10px] font-mono tracking-widest text-brand-sand bg-white/5 px-2.5 py-1 rounded border border-white/5">
              EST. 2024
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links (3 of 12 cols) */}
        <div className="lg:col-span-3 space-y-4 min-w-0">
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

        {/* Col 3: Direct Address & Contacts details (3 of 12 cols) */}
        <div className="lg:col-span-3 space-y-4 text-left min-w-0">
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
                href="https://t.me/Fedin800"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium"
              >
                Telegram: @Fedin800
              </a>
            </div>

            <div className="flex gap-2.5 items-center">
              <MaxIcon size={14} className="text-brand-accent shrink-0" />
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

        {/* Col 4: Emergencies contact box (3 of 12 cols) */}
        <div className="lg:col-span-3 space-y-4 min-w-0">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-sand block">СЛУЖБЫ СПАСЕНИЯ</span>
          <div className="bg-white/5 p-4 rounded border border-white/5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:112" className="flex flex-col gap-1.5 group min-w-0">
                <span className="flex items-center gap-1.5 font-light text-brand-bg/70 group-hover:text-white transition-colors">
                  <Siren size={13} className="text-brand-accent shrink-0" />
                  МЧС
                </span>
                <span className="font-mono font-bold text-white text-base group-hover:text-brand-accent transition-colors">112</span>
              </a>
              <a href="tel:103" className="flex flex-col gap-1.5 group min-w-0">
                <span className="flex items-center gap-1.5 font-light text-brand-bg/70 group-hover:text-white transition-colors">
                  <Stethoscope size={13} className="text-brand-accent shrink-0" />
                  Скорая
                </span>
                <span className="font-mono font-bold text-white text-base group-hover:text-brand-accent transition-colors">103</span>
              </a>
            </div>
            <div className="h-[1px] bg-white/10 my-3" />
            <p className="text-[10px] text-brand-bg/40 leading-normal font-light">
              Адрес хорошо известен местным службам доставки и такси.
            </p>
          </div>
        </div>

      </div>

      {/* Extreme Bottom details details card */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-brand-bg/40 font-mono">
        <span>
          © {currentYear} «Репка» — дом в роще. Все права сохранены.
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
