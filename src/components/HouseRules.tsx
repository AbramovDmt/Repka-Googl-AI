import { CheckCircle2, XCircle } from 'lucide-react';

const allowed = [
  'Можно с детьми',
  'Можно с питомцем (по согласованию, залог 10 000 ₽)',
  'Бесконтактное заселение — код от сейфа накануне',
  'Есть отчётные документы для командировок',
  'Можно приехать на машине с прицепом',
];

const prohibited = [
  'Не курить в доме и бане (сигареты, кальян, вейп)',
  'Без вечеринок и шумных компаний',
  'Тишина на участке после 23:00',
  'Без свечей и бенгальских огней в помещении',
  'Без фейерверков на участке',
];

export default function HouseRules() {
  return (
    <section
      id="rules"
      className="py-24 bg-brand-bg border-b border-brand-sand/30 bg-grain"
    >
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Правила проживания</span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
            Просто и по-человечески
          </h2>
          <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
            Мы строили этот дом с душой — просим относиться к нему так же. Здесь нет мелкого шрифта, только честные правила для комфортного соседства.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Разрешено */}
          <div className="bg-brand-bg-white border border-brand-sand/20 rounded-md p-6 sm:p-8">
            <h3 className="font-serif italic text-xl text-brand-text mb-6 pb-4 border-b border-brand-sand/30 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-brand-green" />
              Разрешено
            </h3>
            <ul className="space-y-3.5">
              {allowed.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-text font-light leading-snug">
                  <CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Запрещено */}
          <div className="bg-brand-bg-white border border-brand-sand/20 rounded-md p-6 sm:p-8">
            <h3 className="font-serif italic text-xl text-brand-text mb-6 pb-4 border-b border-brand-sand/30 flex items-center gap-2">
              <XCircle size={20} className="text-brand-accent" />
              Просим не делать
            </h3>
            <ul className="space-y-3.5">
              {prohibited.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-text font-light leading-snug">
                  <XCircle size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Нижний акцент */}
        <p className="text-center text-xs text-brand-text-mid font-mono mt-10">
          Заезд с 16:00 · Выезд до 12:00 · Максимум 4 гостя · Залог возвращается в день выезда
        </p>

      </div>
    </section>
  );
}
