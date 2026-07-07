export const config = { runtime: 'edge' };

const SOURCES = [
  'https://www.avito.ru/calendars-export/79/37/7926314037.ics',
  'https://sutochno.ru/calendar/ical/e228595faf3e8ce95d27dd1c7b57ee0edda0bd7.ics',
];

export default async function handler() {
  try {
    const texts = await Promise.all(
      SOURCES.map(url =>
        fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; repka-calendar/1.0)' } })
          .then(r => r.text())
          .catch(() => '')
      )
    );
    return new Response(texts.join('\n'), {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response('', { status: 502 });
  }
}
