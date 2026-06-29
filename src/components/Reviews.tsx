import { Star, MessageSquare } from 'lucide-react';
import { reviewsList } from '../data';
import { Review } from '../types';

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="py-24 sm:py-32 bg-brand-bg-white border-b border-brand-sand/30 overflow-hidden bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Искренние слова</span>
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
              Гости говорят о нас
            </h2>
            <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
              Мы гордимся тем, что возвращаясь домой, наши гости делятся теплотой. Нажмите на любой отзыв, чтобы убедиться в честности оценок на ведущих платформах аренды.
            </p>
          </div>

          <div className="bg-brand-bg border border-brand-sand/40 p-5 rounded flex items-center gap-6 shrink-0 z-10 self-stretch sm:self-auto justify-center">
            <div className="text-center">
              <span className="text-3xl font-serif italic text-brand-text font-bold block mb-0.5">5.0</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-mid font-semibold block">РЕЙТИНГ АВИТО</span>
            </div>
            <div className="h-10 w-[1px] bg-brand-sand/35" />
            <div className="text-center">
              <span className="text-3xl font-serif italic text-brand-text font-bold block mb-0.5">150+</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-mid font-semibold block">СЧАСТЛИВЫХ ГОСТЕЙ</span>
            </div>
          </div>
        </div>

        {/* Swipeable grid containers */}
        {/* On mobile: scrollable row, on desktop: 2-column grid layout */}
        <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible pb-6 -mx-6 px-6 md:px-0 md:pb-0 no-scrollbar select-none snap-x snap-mandatory">
          {reviewsList.map((review: Review) => (
            <div
              key={review.id}
              className="bg-brand-bg/15 border border-brand-sand/30 p-6 sm:p-8 rounded-md shrink-0 w-[85vw] sm:w-[450px] md:w-auto text-left flex flex-col justify-between snap-center hover:border-brand-accent/40 shadow-sm hover:shadow transition-all duration-300 bg-grain"
            >
              <div>
                
                {/* Header info bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-sand flex items-center justify-center text-xs font-semibold text-brand-text font-mono border border-brand-sand/50">
                      {review.avatar || 'РК'}
                    </div>
                    <div>
                      <span className="font-serif italic font-medium text-brand-text block text-sm sm:text-base">{review.name}</span>
                      <span className="text-[10px] font-mono font-light text-brand-text-mid block">{review.date}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono tracking-wide px-2.5 py-0.5 rounded border ${
                    review.source === 'Авито'
                      ? 'border-blue-500/20 text-blue-600 bg-blue-500/5'
                      : review.source === 'Циан'
                        ? 'border-brand-green/30 text-brand-green bg-brand-green/5'
                        : 'border-brand-accent/20 text-brand-accent bg-brand-accent/5'
                  }`}>
                    {review.source}
                  </span>
                </div>

                {/* Stars container */}
                <div className="flex gap-0.5 mb-4 text-brand-accent">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>

                {/* Body review text */}
                <p className="text-xs sm:text-sm text-brand-text-mid font-light leading-relaxed italic mb-6">
                  {review.text}
                </p>

              </div>

              {/* Verification Stamp label */}
              <div className="flex items-center gap-1.5 pt-4 border-t border-brand-sand/20 text-[10px] font-mono text-brand-green/80">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span>ОТЗЫВ ПОДТВЕРЖДЕН ПЛАТФОРМОЙ</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom review call to action footer link */}
        <div className="mt-12 text-center">
          <a
            id="more-reviews-external-cta"
            href="https://www.avito.ru/zaprudnya/doma_dachi_kottedzhi/dom_48_m_7926314037?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller&guestsDetailed=%7B%22version%22%3A1%2C%22totalCount%22%3A2%2C%22adultsCount%22%3A2%2C%22children%22%3A%5B%5D%7D#open-reviews-list"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-accent hover:text-brand-accent-hover transition-colors font-mono tracking-wider border-b border-brand-accent/40 pb-0.5"
          >
            <MessageSquare size={14} />
            <span>Все отзывы на Сергея на Авито</span>
          </a>
        </div>

      </div>
    </section>
  );
}
