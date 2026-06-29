export const TELEGRAM_USERNAME = 'abramovdmt';

export const MAX_LINK = 'https://max.ru/u/f9LHodD0cOJJgYBRwhGQzeviJRLCzPLrO0tA6hcaT9B4x2QHAPBRD5gYMLE';

export function getTelegramLink(text?: string): string {
  const base = `https://t.me/${TELEGRAM_USERNAME}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
