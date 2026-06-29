import { Send, Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';


export default function FinalCTA() {
  const telegramPrefilledLink = 'https://t.me/abramovdmt?text=Здравствуйте%2C%20Сергей!%20Хочу%20уточнить%20свободные%20даты%20для%20заезда%20в%20домик%20Репка.';

  return (
    <section
      id="final-cta"
      className="py-24 sm:py-32 bg-brand-bg-dark text-brand-bg-white relative overflow-hidden bg-grain border-b border-white/5"
    >
      {/* Background visual graphics */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Card Panel Container */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 text-left relative overflow-hidden">
          
          {/* Left panel: Sergei Profile Visual image (1/3 width approx) */}
          <div className="w-40 sm:w-48 md:w-56 shrink-0 relative">
            {/* Interactive border decorative box */}
            <div className="absolute inset-x-3 inset-y-3 border border-brand-sand/30 rounded-full scale-[1.08] pointer-events-none" />

            <div className="w-full aspect-square rounded-full shadow-2xl relative border-2 border-brand-sand/40 bg-brand-bg flex items-center justify-center">
              <span className="font-serif italic text-5xl text-brand-sand select-none">С</span>
            </div>

            {/* Online glow element */}
            <div className="absolute right-4 bottom-4 bg-[#4ade80] text-brand-text font-mono text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-brand-bg-dark shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>СЕЙЧАС В СЕТИ</span>
            </div>
          </div>

          {/* Right panel: text contents & action choices */}
          <div className="flex-1 space-y-6">
            
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-brand-sand">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                <span className="text-xs uppercase font-mono tracking-widest font-semibold">Ваш хозяин Сергей</span>
              </div>
              <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white leading-tight tracking-tight">
                Ближайшие выходные ещё свободны
              </h2>
              <p className="text-xs sm:text-sm text-brand-bg/80 leading-relaxed font-light max-w-xl">
                Напишите мне в мессенджер — с радостью подберу свободные даты, помогу рассчитать персональную скидку на длительный заезд и отвечу на любые вопросы. Почти всегда отвечаю в течение получаса!
              </p>
            </div>

            {/* Direct primary action items */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                id="final-cta-tg-link"
                href={telegramPrefilledLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent hover:bg-brand-accent-hover text-white py-4 px-8 rounded font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-md hover:translate-y-[-2px]"
              >
                <Send size={15} className="fill-current" />
                <span>Написать в Telegram</span>
              </a>

              <a
                id="final-cta-tel-link"
                href="tel:+79261234567" // Sergei default phone mock
                className="border border-white/20 bg-white/5 hover:bg-white/10 text-white py-4 px-8 rounded font-semibold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer hover:translate-y-[-2px]"
              >
                <Phone size={15} />
                <span>Позвонить напрямую</span>
              </a>
            </div>

            {/* Platform indicators lists */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-brand-bg/60">
              <span className="font-mono text-[10px] tracking-widest text-brand-sand">ТАКЖЕ СДАЕМ НА:</span>
              
              <a
                href="https://www.avito.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Avito</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </a>
              
              <span className="opacity-20">|</span>

              <a
                href="https://sutochno.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Суточно.ру</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
