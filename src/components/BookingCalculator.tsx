import { useState, useEffect } from 'react';
import { Calendar, Flame, Bike, Waves, ShieldAlert, Send, ArrowRight, Dog, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import AvailabilityCalendar from './AvailabilityCalendar';
import { useBookedDates } from '../hooks/useBookedDates';
import { getTelegramLink } from '../lib/contacts';

export default function BookingCalculator() {
  // Setup default dates: checkin = tomorrow, checkout = in 2 days (minimum 2 nights)
  const getFormattedDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getFormattedDate(1));
  const [checkOut, setCheckOut] = useState(getFormattedDate(3));
  const { bookedDates, loading: calendarLoading } = useBookedDates();
  const [guests, setGuests] = useState(2);
  const [hasPets, setHasPets] = useState(false);
  
  // Extra services
  const [banyaEnabled, setBanyaEnabled] = useState(false);
  const [banyaOnly, setBanyaOnly] = useState(false);
  const [banyaHours, setBanyaHours] = useState(3);
  
  const [bikesCount, setBikesCount] = useState(0);
  const [bikesDays, setBikesDays] = useState(1);
  
  const [supsCount, setSupsCount] = useState(0);
  const [supsDays, setSupsDays] = useState(1);

  // Calculated results
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [nightsCount, setNightsCount] = useState(2);
  const [weekdaysCount, setWeekdaysCount] = useState(2);
  const [weekendsCount, setWeekendsCount] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pricing constants (Russian Rubles)
  const RATE_WEEKDAY = 8000;
  const RATE_WEEKEND = 10000;
  const BASE_DEPOSIT = 5000;
  const PETS_DEPOSIT = 10000;
  const BANYA_WITH_HOUSE_FIRST = 8000;
  const BANYA_WITH_HOUSE_EXTRA = 4000;
  const BANYA_HOURLY = 1500;
  const BIKE_DAILY = 1500;
  const SUP_DAILY = 800;

  // Perform date mathematics and breakdown nights
  useEffect(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setValidationError('Укажите корректные даты заезда и выезда.');
      return;
    }

    const differenceMs = end.getTime() - start.getTime();
    const nights = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    if (!banyaOnly && nights < 2) {
      setValidationError('Минимальный срок аренды домика — 2 ночи.');
      setNightsCount(nights);
      return;
    }

    setValidationError(null);
    setNightsCount(nights);

    // Count weekday vs weekend nights
    let weekdays = 0;
    let weekends = 0;
    const current = new Date(start);

    for (let i = 0; i < nights; i++) {
      const dayOfWeek = current.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
      // Friday night and Saturday night are premium weekends
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      current.setDate(current.getDate() + 1);
    }

    setWeekdaysCount(weekdays);
    setWeekendsCount(weekends);
  }, [checkIn, checkOut, banyaOnly]);

  // Calculations
  const rentTotal = (weekdaysCount * RATE_WEEKDAY) + (weekendsCount * RATE_WEEKEND);
  const banyaWithHouseTotal = nightsCount > 0
    ? BANYA_WITH_HOUSE_FIRST + Math.max(0, nightsCount - 1) * BANYA_WITH_HOUSE_EXTRA
    : 0;
  const banyaTotal = !banyaEnabled ? 0 : (banyaOnly ? banyaHours * BANYA_HOURLY : banyaWithHouseTotal);
  const bikesTotal = bikesCount * bikesDays * BIKE_DAILY;
  const supsTotal = supsCount * supsDays * SUP_DAILY;

  const grandTotal = (banyaOnly ? 0 : rentTotal) + banyaTotal + bikesTotal + supsTotal;
  const refundDeposit = hasPets ? PETS_DEPOSIT : BASE_DEPOSIT;

  // Format Helper
  const formatRubles = (amount: number) => {
    return amount.toLocaleString('ru-RU') + ' ₽';
  };

  // Compile prefilled Telegram Message
  const getPrefilledMessage = () => {
    const formatDateRussian = (dateStr: string) => {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
      }
      return dateStr;
    };

    if (banyaOnly) {
      const text = `Здравствуйте, Сергей! Хочу заказать только баню, без домика.
Дата: ${formatDateRussian(checkIn)}
Длительность: ${banyaHours} ч.
Количество гостей: ${guests} человек
Итоговая стоимость: ${formatRubles(grandTotal)}
(Залог ${formatRubles(refundDeposit)} возвращается по выезду)`;
      return text;
    }

    const extrasList: string[] = [];
    if (banyaEnabled) extrasList.push(`Баня вместе с домиком (${formatRubles(banyaTotal)})`);
    if (bikesCount > 0) extrasList.push(`Велосипеды (${bikesCount} шт, ${bikesDays} дн)`);
    if (supsCount > 0) extrasList.push(`SUP-борды (${supsCount} шт, ${supsDays} дн)`);

    const extrasText = extrasList.length > 0 ? `\nДоп. услуги: ${extrasList.join(', ')}` : '';
    const petsText = hasPets ? '\nС животными: Да' : '';

    const text = `Здравствуйте, Сергей! Я хочу забронировать домик Репка.
Даты заезда: с ${formatDateRussian(checkIn)} по ${formatDateRussian(checkOut)} (${nightsCount} ночей)
Количество гостей: ${guests} человек${petsText}${extrasText}
Итоговая стоимость проживания: ${formatRubles(grandTotal)}
(Залог ${formatRubles(refundDeposit)} возвращается по выезду)`;

    return text;
  };

  return (
    <section
      id="booking"
      className="py-24 bg-brand-bg relative border-b border-brand-sand/30 bg-grain"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <span className="text-xs uppercase tracking-widest font-mono text-brand-green font-semibold">Калькулятор отдыха</span>
          </div>
          <h2 className="font-serif italic font-normal text-3xl sm:text-5xl text-brand-text mb-4 tracking-tight">
            Цены и бронирование
          </h2>
          <p className="text-sm sm:text-base text-brand-text-mid font-light leading-relaxed">
            Выберите даты заезда и дополнительные услуги, чтобы моментально рассчитать стоимость проживания без скрытых доплат.
          </p>
        </div>

        {/* Pricing Summary Quick Callout Block */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 mb-12 rounded bg-brand-bg-white border-2 border-brand-accent/30 text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-xs font-mono uppercase bg-brand-accent text-white py-1 px-3 rounded text-center font-bold">ОФФЕР ВЫХОДНОГО</span>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed font-light m-0">
            <strong>Двухдневные выходные на двоих</strong> пт–вс с баней обходятся всего в <strong>32 000 ₽</strong> <br className="hidden md:inline" />
            (включает 2 ночи проживания и дровяную баню вместе с домиком)
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* LEFT: Selection Forms (7 cols) */}
          <div className="lg:col-span-7 bg-brand-bg-white p-6 sm:p-8 rounded-md border border-brand-sand/20 shadow-md">
            <h3 className="font-serif italic text-xl text-brand-text mb-6 pb-4 border-b border-brand-sand/35 flex items-center gap-2">
              <Calendar className="text-brand-accent" size={20} />
              Параметры проживания
            </h3>

            <div className="space-y-6">
              
              {/* Availability Calendar (replaces plain date inputs) */}
              <AvailabilityCalendar
                bookedDates={bookedDates}
                loading={calendarLoading}
                checkIn={checkIn}
                checkOut={checkOut}
                onChange={(ci, co) => { setCheckIn(ci); setCheckOut(co); }}
              />

              {/* Guests Count && Pets checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
                
                {/* Guests Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="select-guests-range" className="text-xs font-mono font-bold uppercase tracking-wider text-brand-text-mid block text-left">
                      КОЛИЧЕСТВО ГОСТЕЙ
                    </label>
                    <span className="text-xs font-mono text-brand-accent font-bold bg-brand-bg px-2 py-0.5 rounded">
                      {guests} чел.
                    </span>
                  </div>
                  <input
                    id="select-guests-range"
                    type="range"
                    min={1}
                    max={4}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-accent"
                  />
                  <span className="text-[10px] text-brand-text-mid/70 block mt-1 text-left">
                    Максимум 4 спальных места (диван на первом этаже складывается)
                  </span>
                </div>

                {/* Pets Checkbox card */}
                <label className="flex items-center gap-3.5 p-4 rounded border border-brand-sand/30 bg-brand-bg-white hover:border-brand-accent/50 cursor-pointer select-none transition-colors">
                  <input
                    id="checkbox-pets"
                    type="checkbox"
                    checked={hasPets}
                    onChange={(e) => setHasPets(e.target.checked)}
                    className="w-4 h-4 rounded border-brand-sand-hover text-brand-accent focus:ring-brand-accent focus:ring-1 cursor-pointer accent-brand-accent"
                  />
                  <div className="text-left flex items-start gap-2">
                    <Dog size={16} className="text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-brand-text block">Приеду с собакой</span>
                      <span className="text-[10px] text-brand-text-mid font-light block leading-normal">
                        Залог увеличивается до 10 000 ₽ (возвращается по выезду)
                      </span>
                    </div>
                  </div>
                </label>

              </div>

              {/* Extra Services Header */}
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-text-mid pt-4 border-t border-brand-sand/30 text-left mb-4">
                ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ (ОПЦИИ)
              </h4>

              {/* Banya Option */}
              <div className="p-4 rounded border border-brand-sand/30 bg-brand-bg-white flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <label className="flex gap-3.5 items-start cursor-pointer select-none">
                    <input
                      id="checkbox-banya"
                      type="checkbox"
                      checked={banyaEnabled}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setBanyaEnabled(checked);
                        if (!checked) setBanyaOnly(false);
                      }}
                      className="w-4 h-4 rounded mt-1 border-brand-sand-hover cursor-pointer accent-brand-accent"
                    />
                    <div className="text-left">
                      <span className="text-sm font-semibold text-brand-text flex items-center gap-1.5">
                        <Flame size={15} className="text-brand-accent" />
                        Дровяная баня {banyaOnly ? '(1 500 ₽/час)' : '(8 000 ₽ первая ночь, 4 000 ₽ далее)'}
                      </span>
                      <span className="text-[11px] text-brand-text-mid leading-tight block font-light">
                        Дровяная печь, запаренный чайник, простыни для парения{banyaOnly ? '. Минимум 3 часа.' : '.'}
                      </span>
                    </div>
                  </label>

                  {banyaEnabled && banyaOnly && (
                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      <button
                        onClick={() => setBanyaHours(prev => Math.max(3, prev - 1))}
                        className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono font-bold w-12 text-center text-brand-text">
                        {banyaHours} ч.
                      </span>
                      <button
                        onClick={() => setBanyaHours(prev => Math.min(8, prev + 1))}
                        className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-2.5 pt-3 border-t border-brand-sand/20 cursor-pointer select-none">
                  <input
                    id="checkbox-banya-only"
                    type="checkbox"
                    checked={banyaOnly}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setBanyaOnly(checked);
                      if (checked) setBanyaEnabled(true);
                    }}
                    className="w-4 h-4 rounded border-brand-sand-hover cursor-pointer accent-brand-accent"
                  />
                  <span className="text-xs text-brand-text-mid">Хочу только баню, без аренды домика</span>
                </label>
              </div>

              {/* Bicycle Rental Option */}
              <div className="p-4 rounded border border-brand-sand/30 bg-brand-bg-white flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-left flex gap-3.5 items-start">
                    <div className="p-1 rounded bg-brand-bg/60 text-brand-green mt-1 shrink-0">
                      <Bike size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-brand-text block">
                        Аренда велосипедов (+1 500 ₽/сутки за шт.)
                      </span>
                      <span className="text-[11px] text-brand-text-mid leading-tight block font-light">
                        Качественные велосипеды для поездки на канал им. Москвы и по лесу. Доступно: 4 шт.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      onClick={() => setBikesCount(prev => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold w-12 text-center text-brand-text">
                      {bikesCount} шт.
                    </span>
                    <button
                      onClick={() => setBikesCount(prev => Math.min(4, prev + 1))}
                      className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {bikesCount > 0 && (
                  <div className="flex items-center gap-4 bg-brand-bg/30 p-2.5 rounded border border-brand-sand/15 mt-1">
                    <span className="text-xs font-mono text-brand-text-mid uppercase shrink-0">Срок аренды:</span>
                    <input
                      id="bikes-days-slider"
                      type="range"
                      min={1}
                      max={Math.max(nightsCount, 1)}
                      value={bikesDays}
                      onChange={(e) => setBikesDays(parseInt(e.target.value))}
                      className="flex-1 h-1 bg-brand-bg rounded cursor-pointer accent-brand-accent"
                    />
                    <span className="text-xs font-mono font-bold text-brand-accent w-12 text-right">
                      {bikesDays} дн.
                    </span>
                  </div>
                )}
              </div>

              {/* SUP Boards Option */}
              <div className="p-4 rounded border border-brand-sand/30 bg-brand-bg-white flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-left flex gap-3.5 items-start">
                    <div className="p-1 rounded bg-brand-bg/60 text-brand-green mt-1 shrink-0">
                      <Waves size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-brand-text block">
                        Аренда SUP-бордов (+800 ₽/день за шт.)
                      </span>
                      <span className="text-[11px] text-brand-text-mid leading-tight block font-light">
                        Вёсла в наборе. Канал идеален для плавания. Доступно: 2 шт.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      onClick={() => setSupsCount(prev => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold w-12 text-center text-brand-text">
                      {supsCount} шт.
                    </span>
                    <button
                      onClick={() => setSupsCount(prev => Math.min(2, prev + 1))}
                      className="w-8 h-8 rounded-full border border-brand-sand/40 text-brand-text-mid hover:text-brand-accent hover:border-brand-accent font-mono transition-colors text-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {supsCount > 0 && (
                  <div className="flex items-center gap-4 bg-brand-bg/30 p-2.5 rounded border border-brand-sand/15 mt-1">
                    <span className="text-xs font-mono text-brand-text-mid uppercase shrink-0">Срок аренды:</span>
                    <input
                      id="sups-days-slider"
                      type="range"
                      min={1}
                      max={Math.max(nightsCount, 1)}
                      value={supsDays}
                      onChange={(e) => setSupsDays(parseInt(e.target.value))}
                      className="flex-1 h-1 bg-brand-bg rounded cursor-pointer accent-brand-accent"
                    />
                    <span className="text-xs font-mono font-bold text-brand-accent w-12 text-right">
                      {supsDays} дн.
                    </span>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT: Receipt Total breakdown & CTA Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Total Receipts Card */}
            <div className="bg-brand-bg-dark text-white p-6 sm:p-8 rounded-md border border-white/10 shadow-lg bg-grain text-left">
              <span className="text-[10px] font-mono tracking-widest text-brand-sand font-bold block uppercase mb-4">
                ДЕТАЛЬНАЯ СМЕТА ПРОЖИВАНИЯ
              </span>

              {validationError ? (
                <div className="py-8 text-center text-brand-sand">
                  <ShieldAlert className="mx-auto mb-2 opacity-80" size={32} />
                  <p className="text-sm font-medium leading-relaxed">{validationError}</p>
                </div>
              ) : (
                <div className="space-y-4">

                  {/* Rent block */}
                  {!banyaOnly && (
                    <div className="border-b border-white/10 pb-4">
                      <div className="flex justify-between text-sm mb-1.5 font-medium">
                        <span>Аренда домика ({nightsCount} ноч.):</span>
                        <span>{formatRubles(rentTotal)}</span>
                      </div>
                      {weekdaysCount > 0 && (
                        <div className="flex justify-between text-xs text-brand-bg/60">
                          <span>● Будни ({weekdaysCount} ноч. × {formatRubles(RATE_WEEKDAY)}):</span>
                          <span>{formatRubles(weekdaysCount * RATE_WEEKDAY)}</span>
                        </div>
                      )}
                      {weekendsCount > 0 && (
                        <div className="flex justify-between text-xs text-brand-bg/60 mt-1">
                          <span>● Выходные ({weekendsCount} ноч. × {formatRubles(RATE_WEEKEND)}):</span>
                          <span>{formatRubles(weekendsCount * RATE_WEEKEND)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Extra listings */}
                  {(banyaEnabled || bikesCount > 0 || supsCount > 0) && (
                    <div className="border-b border-white/10 pb-4 space-y-2">
                      <span className="text-[10px] font-mono tracking-wider text-brand-sand block">ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ</span>

                      {banyaEnabled && (
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-xs text-brand-bg/90">
                            <span>
                              {banyaOnly
                                ? `Дровяная баня (${banyaHours} ч. × ${formatRubles(BANYA_HOURLY)}):`
                                : 'Дровяная баня:'}
                            </span>
                            <span>{formatRubles(banyaTotal)}</span>
                          </div>
                          {!banyaOnly && nightsCount > 0 && (
                            <div className="flex justify-between text-xs text-brand-bg/60 pl-2">
                              <span>● 1-я ночь: {formatRubles(BANYA_WITH_HOUSE_FIRST)}</span>
                              <span></span>
                            </div>
                          )}
                          {!banyaOnly && nightsCount > 1 && (
                            <div className="flex justify-between text-xs text-brand-bg/60 pl-2">
                              <span>● Ещё {nightsCount - 1} ноч. × {formatRubles(BANYA_WITH_HOUSE_EXTRA)}: {formatRubles((nightsCount - 1) * BANYA_WITH_HOUSE_EXTRA)}</span>
                              <span></span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {bikesCount > 0 && (
                        <div className="flex justify-between text-xs text-brand-bg/90">
                          <span>Велосипеды ({bikesCount} шт. × {bikesDays} дн.):</span>
                          <span>{formatRubles(bikesTotal)}</span>
                        </div>
                      )}

                      {supsCount > 0 && (
                        <div className="flex justify-between text-xs text-brand-bg/90">
                          <span>SUP-борды ({supsCount} шт. × {supsDays} дн.):</span>
                          <span>{formatRubles(supsTotal)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Security refundable deposit warning */}
                  <div className="bg-white/5 p-4 rounded border border-white/5 flex gap-3 text-xs leading-normal font-light mb-6">
                    <ShieldAlert size={18} className="text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="flex justify-between items-center text-white font-medium mb-0.5">
                        <span>Страховой возвратный залог:</span>
                        <span>{formatRubles(refundDeposit)}</span>
                      </div>
                      <span className="text-[11px] text-brand-bg/60">
                        Оплачивается отдельно при заезде и полностью возвращается вам в день выезда после завершения экспресс-уборки.
                      </span>
                    </div>
                  </div>

                  {/* Grand total grand block */}
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <span className="text-xs text-brand-sand block font-mono font-bold leading-none mb-1">ОБЩАЯ СТОИМОСТЬ</span>
                      <span className="text-xs text-brand-bg/40 font-mono">все сборы включены</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-serif text-white italic font-bold">
                      {formatRubles(grandTotal)}
                    </span>
                  </div>

                  {/* Send booking summary to Sergey via Telegram bot; fall back to opening a prefilled chat if the bot request fails */}
                  <div className="pt-6">
                    <button
                      id="calculator-book-tg-cta"
                      disabled={!!validationError || !checkIn || !checkOut || sendStatus === 'sending'}
                      onClick={async () => {
                        const text = getPrefilledMessage();
                        setSendStatus('sending');
                        try {
                          const res = await fetch('/api/send-order', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ text }),
                          });
                          if (!res.ok) throw new Error('send failed');
                          setSendStatus('sent');
                        } catch {
                          setSendStatus('error');
                          window.open(getTelegramLink(text), '_blank', 'noopener');
                        }
                      }}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded font-medium text-sm flex items-center justify-center gap-3 transition-colors shadow-md hover:translate-y-[-2px] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      <Send size={15} className="fill-current" />
                      <span>
                        {sendStatus === 'sending' ? 'Отправляем…' : sendStatus === 'sent' ? 'Заявка отправлена!' : 'Забронировать через Telegram'}
                      </span>
                    </button>
                    <span className="text-[10px] text-brand-bg/50 block text-center mt-3 font-mono">
                      {sendStatus === 'sent'
                        ? 'Сергей получил вашу заявку и скоро свяжется с вами'
                        : sendStatus === 'error'
                        ? 'Не удалось отправить автоматически — открыли чат с Сергеем, отправьте сообщение вручную'
                        : 'Заявка уйдёт Сергею в Telegram с деталями брони'}
                    </span>
                  </div>

                </div>
              )}
            </div>

            {/* Alternates fallback booking channels */}
            <div className="bg-brand-bg-white p-6 rounded-md border border-brand-sand/20 text-left">
              <span className="text-[10px] font-mono tracking-widest text-brand-text-mid block font-bold mb-4">
                ДРУГИЕ ПЛАТФОРМЫ БРОНИРОВАНИЯ
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  id="avito-booking-channel"
                  href="https://www.avito.ru/zaprudnya/doma_dachi_kottedzhi/dom_48_m_7926314037?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing_seller&guestsDetailed=%7B%22version%22%3A1%2C%22totalCount%22%3A2%2C%22adultsCount%22%3A2%2C%22children%22%3A%5B%5D%7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded border border-brand-sand/50 text-brand-text hover:border-brand-accent hover:text-brand-accent text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Перейти на Авито</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  id="sutochno-booking-channel"
                  href="https://sutochno.ru/front/searchapp/detail/1840600?host_id=14014121&host_device=app&guest_id="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded border border-brand-sand/50 text-brand-text hover:border-brand-accent hover:text-brand-accent text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Забронировать на Суточно.ру</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  id="cian-booking-channel"
                  href="https://www.cian.ru/rent/suburban/325890116/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded border border-brand-sand/50 text-brand-text hover:border-brand-accent hover:text-brand-accent text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Посмотреть на Циан</span>
                  <ExternalLink size={13} />
                </a>
              </div>
              <span className="text-[10px] text-brand-text-mid/70 block text-center mt-3 text-left leading-normal">
                ✓ На Авито, Циан и Суточно.ру у нас подтвержденный профиль с оценкой ★5.0. Выбирайте привычный для вас способ бронирования.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
