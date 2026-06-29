import { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { faqList } from '../data';
import { FAQItem } from '../types';
import ContactPopover from './ContactPopover';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Open first item by default for great UX

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-24 bg-brand-bg relative border-b border-brand-sand/30 bg-grain"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Частые вопросы</span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
            Ответы без официоза
          </h2>
          <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
            Понимаем, за городом хочется покоя, а не юридических формулировок. Мы собрали честные ответы на все популярные вопросы об отдыхе в «Репке».
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4" id="faq-accordions-group">
          {faqList.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-brand-bg-white border rounded-lg border-brand-sand/30 overflow-hidden transition-all duration-300"
              >
                {/* Accordion clickable header button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:bg-brand-bg/5 select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-3.5 items-start">
                    <HelpCircle size={18} className="text-brand-accent shrink-0 mt-1" />
                    <span className="font-sans font-medium text-sm sm:text-base text-brand-text pr-2 leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating chevron */}
                  <div className={`p-1 rounded-full bg-brand-bg text-brand-text transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-brand-accent' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Animated collapse helper panel */}
                <div className={`faq-collapse ${isOpen ? 'open' : ''}`}>
                  <div className="faq-collapse-content text-left">
                    <div className="pb-6 pt-0 px-6 sm:px-8 pl-10 sm:pl-12 border-t border-brand-sand/15 text-xs sm:text-sm text-brand-text-mid font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Under FAQ Callout floating box */}
        <div className="mt-12 p-6 sm:p-8 rounded border border-brand-sand/30 bg-brand-bg/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex gap-4 items-start max-w-xl">
            <Sparkles className="text-brand-accent shrink-0 mt-0.5 animate-pulse" size={20} />
            <div>
              <span className="text-sm font-semibold text-brand-text block mb-1">У вас нестандартный вопрос или пожелание?</span>
              <span className="text-xs text-brand-text-mid leading-relaxed font-light">
                Хотите устроить сюрприз любимому человеку, заказать фермерские продукты к заезду, или арендовать домик на длительный срок? Не стесняйтесь обсуждать это напрямую с Сергеем!
              </span>
            </div>
          </div>
          
          <ContactPopover align="right" telegramText="Здравствуйте! У меня есть индивидуальный вопрос по поводу бронирования домика Репка.">
            {({ onClick }) => (
              <button
                id="faq-direct-ask-tg"
                onClick={onClick}
                className="w-full sm:w-auto text-xs font-semibold py-3 px-6 rounded border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all text-center whitespace-nowrap cursor-pointer shrink-0"
              >
                Спросить хозяина
              </button>
            )}
          </ContactPopover>
        </div>

      </div>
    </section>
  );
}
