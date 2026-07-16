/* Vercel serverless: пересылка заявки с лендинга Сергею через Telegram Bot API
   Env vars: TELEGRAM_BOT_TOKEN, OWNER_CHAT_ID */

const ALLOWED_ORIGINS = ['https://repkadomik.ru', 'https://repka-a-frame.vercel.app'];
const MAX_TEXT_LENGTH = 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const origin = req.headers.origin || req.headers.referer || '';
  if (!ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
    return res.status(403).end('Forbidden');
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.OWNER_CHAT_ID;
  if (!token || !chatId) return res.status(200).end('Not configured');

  const { text } = req.body || {};
  if (!text || typeof text !== 'string') return res.status(400).end('Bad request');
  if (text.length > MAX_TEXT_LENGTH) return res.status(400).end('Text too long');

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!tgRes.ok) return res.status(502).end('Telegram error');
  res.status(200).end('OK');
}
