import * as Icons from 'lucide-react';
import { amenitiesList } from '../data';
import { Amenity } from '../types';

// Helper component to dynamically select Lucide icons by name safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Safe lookup with map fallback
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={24} />;
}

export default function Included() {
  return (
    <section
      id="amenities"
      className="py-24 sm:py-32 bg-brand-bg-white border-b border-brand-sand/30 bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Всё включено</span>
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
              Всё, что нужно — уже есть
            </h2>
            <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
              Мы позаботились обо всех практических мелочах. Свежее постельное бельё, мягкие полотенца, наколотые дрова и полный кухонный арсенал ждут вас в домике. Привозите только себя!
            </p>
          </div>

          <div className="bg-brand-bg border border-brand-sand/40 p-4 rounded-md text-xs sm:text-sm text-brand-text-mid max-w-sm">
            <span className="font-bold text-brand-accent block mb-0.5">В бане включено всё:</span>
            санузел, душ, мини-холодильник, фен, простыни и уютная обеденная деревянная мебель.
          </div>
        </div>

        {/* Conveniences Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {amenitiesList.map((amenity: Amenity) => {
            const isExtra = !amenity.included;

            return (
              <div
                key={amenity.id}
                className={`p-6 sm:p-8 rounded-md border text-left transition-all duration-300 flex flex-col justify-between ${
                  isExtra
                    ? 'border-brand-accent/25 bg-brand-bg/20 shadow-sm'
                    : 'border-brand-sand/20 hover:border-brand-accent/50 bg-brand-bg-white hover:shadow-md'
                }`}
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-md inline-block ${isExtra ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-bg text-brand-green'}`}>
                      <DynamicIcon name={amenity.icon} />
                    </div>
                    {isExtra ? (
                      <span className="text-[10px] font-mono tracking-wider bg-brand-accent text-white px-2 py-0.5 rounded uppercase">
                        {amenity.price}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono tracking-wider bg-brand-green/10 text-brand-green border border-brand-green/20 px-2 py-0.5 rounded uppercase font-medium">
                        Включено
                      </span>
                    )}
                  </div>

                  {/* Text details */}
                  <h3 className="font-sans font-medium text-base sm:text-lg text-brand-text mb-2 tracking-tight">
                    {amenity.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-mid leading-relaxed font-light">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Callout box banner */}
        <div className="mt-12 bg-brand-text text-brand-bg-white rounded-md p-8 relative overflow-hidden bg-grain shadow-lg">
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-15 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-brand-sand stroke-1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8,62 Q46,26 48,24 Q50,26 88,62" />
              <path d="M22,58 L22,90 L74,90 L74,58" />
              <circle cx="36" cy="72" r="7" />
              <path d="M52,90 L52,70 L66,70 L66,90" />
              <path d="M62,36 L62,22 L70,22 L70,40" />
              <path d="M64,20 Q58,12 65,6" />
              <path d="M70,20 Q76,11 69,3" />
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-sand block mb-2">ВАЖНОЕ ПРИМЕЧАНИЕ</span>
            <h4 className="font-serif italic text-xl sm:text-2xl mb-4 text-white">Банный ритуал в «Репке»</h4>
            <p className="text-sm text-gray-300 leading-relaxed font-light mb-4">
              Наша баня — традиционная, дровяная, с мягким мелкодисперсным паром. Баню можно заказать отдельно от домика — внутри свой санузел, душ, мини-кухня и холодильник, всё нужное под рукой. Отдельно — от 1 500 ₽/час (минимум 3 часа), при аренде домика — 8 000 ₽/сутки.
            </p>
            <div className="flex flex-wrap gap-4 items-center mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm font-mono text-brand-sand">
              <span>✓ Травяной чай включен</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>✓ Простыни и шапки включены</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>✓ Веник можно приобрести на месте (+500 ₽)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
