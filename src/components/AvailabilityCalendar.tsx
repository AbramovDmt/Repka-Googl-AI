import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

function toStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function formatRu(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

interface Props {
  bookedDates: Set<string>;
  loading: boolean;
  checkIn: string;
  checkOut: string;
  onChange: (ci: string, co: string) => void;
}

export default function AvailabilityCalendar({ bookedDates, loading, checkIn, checkOut, onChange }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toStr(today);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [step, setStep] = useState<'ci' | 'co'>(checkIn && !checkOut ? 'co' : 'ci');
  const [hover, setHover] = useState<string | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Build day cells for the current view month
  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const padStart = (first.getDay() + 6) % 7; // Mon-based: Mon=0
    const out: (string | null)[] = [];
    for (let i = 0; i < padStart; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(toStr(new Date(viewYear, viewMonth, d)));
    return out;
  }, [viewYear, viewMonth]);

  // First booked date strictly after checkIn (caps range preview)
  const firstBlockedAfterCI = useMemo(() => {
    if (!checkIn) return null;
    const start = new Date(checkIn);
    for (let i = 1; i <= 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const s = toStr(d);
      if (bookedDates.has(s)) return s;
    }
    return null;
  }, [checkIn, bookedDates]);

  const rangeIsValid = (from: string, to: string): boolean => {
    const start = new Date(from);
    const end = new Date(to);
    const cur = new Date(start);
    cur.setDate(cur.getDate() + 1);
    while (cur < end) {
      if (bookedDates.has(toStr(cur))) return false;
      cur.setDate(cur.getDate() + 1);
    }
    return true;
  };

  const handleClick = (dateStr: string) => {
    if (dateStr < todayStr || bookedDates.has(dateStr)) return;

    if (step === 'ci') {
      onChange(dateStr, '');
      setStep('co');
      setHover(null);
    } else {
      if (dateStr <= checkIn || !rangeIsValid(checkIn, dateStr)) {
        onChange(dateStr, '');
        setStep('co');
        setHover(null);
        return;
      }
      onChange(checkIn, dateStr);
      setStep('ci');
      setHover(null);
    }
  };

  const cappedHover =
    hover && firstBlockedAfterCI && hover >= firstBlockedAfterCI ? firstBlockedAfterCI : hover;
  const effectiveEnd = step === 'co' && cappedHover && cappedHover > checkIn ? cappedHover : checkOut;

  const getCellClass = (dateStr: string): string => {
    const isPast = dateStr < todayStr;
    const isBooked = bookedDates.has(dateStr);
    const isCI = dateStr === checkIn;
    const isCO = dateStr === checkOut;
    const inRange = checkIn && effectiveEnd && dateStr > checkIn && dateStr < effectiveEnd;

    let base = 'relative h-9 w-full flex items-center justify-center text-xs font-mono ';

    if (isPast) return base + 'text-brand-text-mid/25 cursor-not-allowed';
    if (isBooked) return base + 'text-brand-text-mid/30 line-through cursor-not-allowed';
    if (isCI || isCO) return base + 'bg-brand-accent text-white rounded font-bold cursor-pointer';
    if (inRange) return base + 'bg-brand-accent/15 text-brand-text cursor-pointer';
    return base + 'text-brand-text hover:bg-brand-sand/30 rounded cursor-pointer';
  };

  const canGoPrev = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  return (
    <div className="space-y-3">
      {/* Date display row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-brand-text-mid block mb-2">
            ЗАЕЗД (с 16:00)
          </label>
          <div
            className={`bg-brand-bg border rounded p-3 text-sm font-mono transition-colors ${
              step === 'ci' ? 'border-brand-accent ring-1 ring-brand-accent/30' : 'border-brand-sand/40'
            } ${checkIn ? 'text-brand-text' : 'text-brand-text-mid/50'}`}
          >
            {checkIn ? formatRu(checkIn) : 'Выберите дату'}
          </div>
        </div>
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-brand-text-mid block mb-2">
            ВЫЕЗД (до 12:00)
          </label>
          <div
            className={`bg-brand-bg border rounded p-3 text-sm font-mono transition-colors ${
              step === 'co' && checkIn ? 'border-brand-accent ring-1 ring-brand-accent/30' : 'border-brand-sand/40'
            } ${checkOut ? 'text-brand-text' : 'text-brand-text-mid/50'}`}
          >
            {checkOut ? formatRu(checkOut) : 'Выберите дату'}
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-brand-bg border border-brand-sand/30 rounded p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="p-1.5 rounded hover:bg-brand-sand/20 transition-colors text-brand-text-mid hover:text-brand-text disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-mono font-semibold text-brand-text">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded hover:bg-brand-sand/20 transition-colors text-brand-text-mid hover:text-brand-text"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-mono text-brand-text-mid/60 uppercase py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        {loading ? (
          <div className="text-center text-xs text-brand-text-mid py-6 font-mono animate-pulse">
            загрузка доступности…
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((dateStr, i) =>
              dateStr ? (
                <button
                  key={i}
                  type="button"
                  className={getCellClass(dateStr)}
                  onClick={() => handleClick(dateStr)}
                  onMouseEnter={() => step === 'co' && checkIn && setHover(dateStr)}
                  onMouseLeave={() => setHover(null)}
                >
                  {parseInt(dateStr.split('-')[2])}
                  {dateStr === todayStr && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent" />
                  )}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        )}

        {/* Hint + legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-brand-sand/20 flex-wrap">
          <div className="flex items-center gap-1.5 text-[10px] text-brand-text-mid font-mono">
            <div className="w-3 h-3 rounded line-through text-brand-text-mid/30 text-[9px] flex items-center justify-center">
              8
            </div>
            <span>занято</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-brand-text-mid font-mono">
            <div className="w-3 h-3 rounded bg-brand-accent" />
            <span>ваши даты</span>
          </div>
          <span className="text-[10px] text-brand-accent font-mono ml-auto">
            {step === 'ci' ? '↑ нажмите дату заезда' : '↑ нажмите дату выезда'}
          </span>
        </div>
      </div>
    </div>
  );
}
