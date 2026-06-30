export const config = { runtime: 'edge' };

export default async function handler() {
  try {
    const response = await fetch(
      'https://www.avito.ru/calendars-export/79/37/7926314037.ics',
      { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; repka-calendar/1.0)' } }
    );
    const text = await response.text();
    return new Response(text, {
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
