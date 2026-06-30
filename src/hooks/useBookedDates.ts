import { useState, useEffect } from 'react';

function parseIcs(text: string): Set<string> {
  const booked = new Set<string>();
  const blocks = text.split('BEGIN:VEVENT');

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const startMatch = block.match(/DTSTART[^:\r\n]*:(\d{8})/);
    const endMatch = block.match(/DTEND[^:\r\n]*:(\d{8})/);
    if (!startMatch || !endMatch) continue;

    const s = startMatch[1];
    const e = endMatch[1];
    const start = new Date(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8));
    const end = new Date(+e.slice(0, 4), +e.slice(4, 6) - 1, +e.slice(6, 8));

    const cur = new Date(start);
    while (cur < end) {
      const y = cur.getFullYear();
      const m = String(cur.getMonth() + 1).padStart(2, '0');
      const d = String(cur.getDate()).padStart(2, '0');
      booked.add(`${y}-${m}-${d}`);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return booked;
}

export function useBookedDates() {
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/calendar')
      .then((r) => r.text())
      .then((text) => {
        setBookedDates(parseIcs(text));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { bookedDates, loading };
}
