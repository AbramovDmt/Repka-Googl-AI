import { Send, Phone, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import ContactPopover from './ContactPopover';
import sergeyPhoto from '../assets/images/sergey.jpg';

export default function FinalCTA() {
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

            <div className="w-full aspect-square rounded-full shadow-2xl relative border-2 border-brand-sand/40 bg-brand-bg overflow-hidden">
              <img
                src={sergeyPhoto}
                alt="Сергей, хозяин домика «Репка»"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
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
                Узнать свободные даты
              </h2>
              <p className="text-xs sm:text-sm text-brand-bg/80 leading-relaxed font-light max-w-xl">
                Напишите мне в мессенджер — с радостью подберу свободные даты, помогу рассчитать персональную скидку на длительный заезд и отвечу на любые вопросы. Почти всегда отвечаю в течение получаса!
              </p>
            </div>

            {/* Direct primary action items */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <ContactPopover telegramText="Здравствуйте, Сергей! Хочу уточнить свободные даты для заезда в домик Репка.">
                {({ onClick }) => (
                  <button
                    id="final-cta-tg-link"
                    onClick={onClick}
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white py-4 px-8 rounded font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-md hover:translate-y-[-2px]"
                  >
                    <Send size={15} className="fill-current" />
                    <span>Написать хозяину</span>
                  </button>
                )}
              </ContactPopover>

              <a
                id="final-cta-tel-link"
                href="tel:+79995799908"
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
                href="https://www.avito.ru/zaprudnya/doma_dachi_kottedzhi/dom_48_m_7926314037?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller&guestsDetailed=%7B%22version%22%3A1%2C%22totalCount%22%3A2%2C%22adultsCount%22%3A2%2C%22children%22%3A%5B%5D%7D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Avito</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </a>

              <span className="opacity-20">|</span>

              <a
                href="https://sutochno.ru/front/searchapp/detail/1840600?host_id=14014121&host_device=app&guest_id="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Суточно.ру</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </a>

              <span className="opacity-20">|</span>

              <a
                href="https://www.cian.ru/rent/suburban/325890116/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Циан</span>
                <ArrowUpRight size={12} className="opacity-70" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
