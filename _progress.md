# CMS для Сергея — прогресс

Цель: Сергей сам редактирует любое фото галереи, услуги/цены, условия (правила проживания), телефон — через веб-панель `/admin`, без участия разработчика. Технология — Decap CMS поверх GitHub+Vercel (правка → коммит → автопересборка).

## Этап 1 — контент в редактируемый формат (готово, закоммичено cc13ea9)
- [x] Перенести фото галереи из `src/assets/images` (вшиты в билд) в `public/images` (обычные файлы, CMS сможет их заменять)
- [x] `content/gallery.json` — список фото вместо `galleryPhotos` в data.ts
- [x] `content/services.json` — услуги/цены вместо `amenitiesList`
- [x] `content/rules.json` — правила проживания вместо хардкода в `HouseRules.tsx`
- [x] `content/settings.json` — телефон (было захардкожено в 3 местах: Header, Footer, FinalCTA)
- [x] Обновить компоненты (Gallery, Included, HouseRules, Header, Footer, FinalCTA, Hero, Atmosphere), чтобы читали из этих файлов
- [x] tsc чисто, сборка чисто, вес страницы 16MB → 1.35MB (gzip 303KB) — фото больше не вшиты
- [x] Локальная проверка (vite preview): HTML 200, hero.jpg грузится отдельно 200
- [x] Проверено на проде: repkadomik.ru отдаёт 200, hero.jpg грузится отдельно 200

## Домен repkadomik.ru — подключён и работает
- [x] Домен добавлен в проект Vercel (CLI), DNS A-запись в Beget (`@` → `76.76.21.21`)
- [x] Найден и удалён конфликтующий второй A-адрес (`45.130.41.70`, старая заглушка Beget) — без этого SSL не выпускался
- [x] SSL выпущен автоматически, сайт живёт на https://repkadomik.ru

## Этап 2 — сама CMS (готово, ждёт первого реального входа Сергея)
- [x] `public/admin/index.html` (грузит Decap CMS с CDN) + `config.yml` (4 раздела: фотогалерея, услуги, условия, телефон)
- [x] `content/gallery.json` и `content/services.json` обёрнуты в объект (`{photos:[...]}` / `{items:[...]}`) — так требует схема Decap для списков в файле-коллекции. `data.ts` и config.yml согласованы
- [x] Серверные функции для входа через GitHub (`api/auth.js`, `api/callback.js`) — стандартная схема OAuth-прокси для Decap/Netlify CMS
- [x] GitHub OAuth App создан Димой, `OAUTH_GITHUB_CLIENT_ID`/`OAUTH_GITHUB_CLIENT_SECRET` в Vercel
- [x] **Грабли:** `Get-Content -Raw | vercel env add` в Windows PowerShell добавляет BOM в начало и `\r\n` в конец значения — BOM ломает HTTP-заголовок (`ERR_INVALID_CHAR`), Vercel CLI подчищает только `\n`, не `\r`/BOM. Чинится через `cmd /c "vercel env add ... < file"` — чистое перенаправление файла, без обработки PowerShell-конвейером. Подтверждено на проде: `/api/auth` отдаёт 302 на github.com с корректным client_id
- [ ] Проверить цикл целиком живьём: зайти на repkadomik.ru/admin → войти через GitHub → поправить что-то → убедиться что сайт обновился (нужен реальный клик Димы/Сергея в браузере, не проверяется из консоли)

## Решения
- Reviews (отзывы) и FAQ пока НЕ переношу в CMS — Дима просил фото/услуги/условия/телефон, не всё подряд. Можно добавить позже отдельным шагом.
