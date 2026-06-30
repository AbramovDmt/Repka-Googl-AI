import { useState } from 'react';
import { MapPin, Car, Train, Compass, Check, Copy, ExternalLink, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Directions() {
  const [copied, setCopied] = useState(false);
  const addressText = 'Московская обл., Дмитровский р-н, пос. Мельчевка, СНТ Репка, д. 124';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const nearbyItems = [
    { name: 'Канал им. Москвы', desc: '4 минуты пешком', distance: '300 м', icon: '🌊' },
    { name: 'Рыбалка', desc: 'На канале и платных озёрах', distance: 'рядом', icon: '🎣' },
    { name: 'Продуктовый магазин', desc: '5 минут на авто', distance: '3 км', icon: '🛒' },
    { name: 'Курорты Яхромы', desc: 'Склоны, тюбинг', distance: '~42 минуты', icon: '⛷' },
    { name: 'Дмитровский кремль', desc: 'Прогулки, история', distance: '~42 минуты', icon: '🏰' },
    { name: 'Страусиная ферма', desc: 'Экскурсии с детьми', distance: '~50 минут', icon: '🦤' },
  ];

  return (
    <section
      id="directions"
      className="py-24 sm:py-32 bg-brand-bg-dark text-brand-bg-white relative border-b border-brand-sand/20 overflow-hidden bg-grain"
    >
      {/* Background radial soft light for depth */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-xl mb-16 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-sand" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-sand/80 font-semibold">Логистика</span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-white mb-4 tracking-tight">
            63 км от МКАД — это час езды
          </h2>
          <p className="text-sm sm:text-base text-brand-bg/80 leading-relaxed font-light">
            «Репка» расположена в живописном и уединённом уголке Дмитровского района. Сюда легко добраться в пятницу вечером сразу после работы. Сбросьте скорость и наслаждайтесь дорогой.
          </p>
        </div>

        {/* Content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: logistics content (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-10">
            
            {/* Travel modes */}
            <div className="space-y-8">
              
              {/* Option A: Car */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="bg-white/10 p-3 rounded text-brand-sand border border-white/10 shrink-0">
                  <Car size={22} />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg sm:text-xl text-white mb-2">На автомобиле</h3>
                  <p className="text-xs sm:text-sm text-brand-bg/75 leading-relaxed font-light mb-2">
                    Двигайтесь по <strong className="text-white">Дмитровскому шоссе</strong>. Дорога от МКАД занимает около 1 часа в будни или 1.5 часа в пятницу вечером. СНТ тихое, заезд свободный.
                  </p>
                  <span className="text-[11px] font-mono text-brand-sand tracking-wide bg-white/5 py-1 px-2.5 rounded border border-white/5 inline-block">
                    ✓ Огороженная стоянка на 2 авто (подходит для прицепа)
                  </span>
                </div>
              </div>

              {/* Option B: Train */}
              <div className="flex gap-4 sm:gap-6 items-start">
                <div className="bg-white/10 p-3 rounded text-brand-sand border border-white/10 shrink-0">
                  <Train size={22} />
                </div>
                <div>
                  <h3 className="font-serif italic text-lg sm:text-xl text-white mb-2">На электричке</h3>
                  <p className="text-xs sm:text-sm text-brand-bg/75 leading-relaxed font-light mb-2">
                    Савёловский вокзал → станция <strong className="text-white">Запрудня</strong> (~1.5 часа в пути). Далее 10-15 минут на местном такси до ворот СНТ. По согласованию Сергей может встретить вас на вокзале Дмитрова.
                  </p>
                </div>
              </div>

              {/* Exact Address Clipboard Copier */}
              <div className="bg-white/5 p-6 rounded border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
                <div className="flex gap-3 items-center">
                  <MapPin className="text-brand-accent shrink-0" size={18} />
                  <div className="text-left">
                    <span className="text-[10px] font-mono tracking-wider text-brand-sand uppercase block mb-1">АДРЕС НАВИГАТОРА</span>
                    <span className="text-xs sm:text-sm text-white font-medium select-all leading-tight">{addressText}</span>
                  </div>
                </div>
                
                <button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto text-xs font-medium py-2.5 px-4 rounded bg-brand-accent hover:bg-brand-accent-hover text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none shrink-0"
                  id="btn-copy-address"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>

            </div>

            {/* What's Nearby list section */}
            <div className="pt-8 border-t border-white/10">
              <h4 className="font-serif italic text-lg mb-4 text-white text-left flex items-center gap-2">
                <Compass size={18} className="text-brand-accent animate-pulse" />
                Что интересного рядом?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearbyItems.map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded border border-white/5 text-left flex justify-between items-start">
                    <div>
                      <span className="text-lg mr-2 inline-block leading-none">{item.icon}</span>
                      <span className="text-xs font-semibold text-white block mt-1">{item.name}</span>
                      <span className="text-[11px] text-brand-bg/70 block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-sand tracking-widest leading-none bg-white/10 px-1.5 py-0.5 rounded">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: embedded interactive map widget (5 cols) */}
          <div className="lg:col-span-6 relative rounded-md overflow-hidden bg-brand-bg shadow-2xl border border-white/10 flex flex-col justify-between">
            {/* Embedded Yandex Map Frame */}
            <div className="w-full h-80 lg:h-full relative min-h-[300px] flex-1">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.42054%2C56.48085&z=16&pt=37.42054,56.48085,pm2rdl"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Репка на Яндекс.Картах"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
            
            {/* Map metadata action banner */}
            <div className="bg-white/5 p-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-brand-bg/85">
              <span>Координаты: 56.48085, 37.42054</span>
              <a
                id="maps-navigation-link"
                href="https://yandex.ru/maps/?rtext=~56.48085,37.42054"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-sand hover:text-white transition-colors flex items-center gap-1 font-medium font-mono"
              >
                <span>Проложить маршрут</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
