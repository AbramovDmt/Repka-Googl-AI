import { Trees, Coffee, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import loftImage from '../assets/images/interior_6.png';

const LOFT_IMAGE_PATH = loftImage;

export default function Atmosphere() {
  const tags = ['Для идеальных свиданий', 'Компания до 4 человек', 'Перезагрузка в тишине', 'Спокойный отдых у воды'];

  return (
    <section
      id="atmosphere"
      className="py-24 sm:py-32 bg-brand-bg-white border-b border-brand-sand/30 overflow-hidden bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Text Area (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Вариант Вашего побега</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-8 leading-tight tracking-tight">
            Просто приехать. <br className="hidden sm:inline" />
            И никуда не спешить.
          </h2>

          {/* Pull quote text block */}
          <div className="relative mb-10 pl-6 border-l-2 border-brand-accent/50">
            <blockquote className="font-serif italic text-xl sm:text-2xl text-brand-text-mid leading-relaxed">
              «Вечером — жаркая дровяная баня и тёплый костёр под сенью берёз. Утром — сонная хрустальная тишина, чашка горячего кофе на террасе и вода канала в четырёх минутах неспешным шагом. Никаких планов. Только ваши идеальные выходные.»
            </blockquote>
          </div>

          <p className="text-sm text-brand-text/75 leading-relaxed max-w-xl mb-10">
            Здесь время замедляется. Мы создали это место для тех, кому нужно на мгновение остановиться, сбросить лишний городской шум, побыть вдвоём или в кругу самых близких. Это не просто дом — это место, где пишется ваша личная история гармонии.
          </p>

          {/* Scenario Tags Grid */}
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs sm:text-sm font-medium tracking-wide text-brand-text border border-brand-sand/50 px-4 py-2 rounded-full cursor-default hover:border-brand-accent hover:text-brand-accent transition-all duration-300 bg-brand-bg/10"
              >
                ● {tag}
              </span>
            ))}
          </div>

          {/* Icon highlights row */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-brand-sand/30">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-green">
                <Trees size={18} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-brand-text">10 СОТОК ЛЕСА</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-green">
                <Coffee size={18} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-brand-text">УТРЕННИЙ УЮТ</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-green">
                <Compass size={18} />
              </div>
              <span className="text-xs font-mono font-bold tracking-wider text-brand-text">ПРИВАТНОСТЬ</span>
            </div>
          </div>
        </div>

        {/* Visual Area (5 cols on desktop) */}
        <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[3/4]">
          {/* Behind overlay block */}
          <div className="absolute -inset-2 bg-brand-sand/15 rounded-md -rotate-1 transform pointer-events-none" />
          
          <img
            src={LOFT_IMAGE_PATH}
            alt="Спальный ярус в треугольном домике"
            className="w-full h-full object-cover rounded-md shadow-md hover:scale-[1.01] transition-transform duration-500 relative z-10 border border-brand-sand/20"
            referrerPolicy="no-referrer"
          />

          {/* Custom floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 -left-4 sm:left-6 bg-brand-bg-white border border-brand-sand/40 p-5 rounded z-20 shadow-lg max-w-[240px] bg-grain"
          >
            <span className="font-serif italic font-semibold text-lg text-brand-accent block mb-1">
              Дышите глубоко.
            </span>
            <span className="text-xs text-brand-text-mid leading-relaxed block">
              Новый дом сдается с начала 2024 года. Все абсолютно свежее, чистое и наполнено ароматом натуральной сосны.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
