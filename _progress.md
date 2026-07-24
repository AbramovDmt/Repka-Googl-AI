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
- [ ] Проверить на реальном проде Vercel после деплоя (следующий шаг)

## Этап 2 — сама CMS (код готов, ждём OAuth App от Димы)
- [x] `public/admin/index.html` (грузит Decap CMS с CDN) + `config.yml` (4 раздела: фотогалерея, услуги, условия, телефон)
- [x] `content/gallery.json` и `content/services.json` обёрнуты в объект (`{photos:[...]}` / `{items:[...]}`) — так требует схема Decap для списков в файле-коллекции. `data.ts` и config.yml согласованы
- [x] Серверные функции для входа через GitHub (`api/auth.js`, `api/callback.js`) — стандартная схема OAuth-прокси для Decap/Netlify CMS
- [x] tsc + build чисто
- [ ] **Нужно от Димы:** создать GitHub OAuth App → отдать Client ID + Client Secret (см. инструкцию в чате)
- [ ] Прописать `OAUTH_GITHUB_CLIENT_ID` / `OAUTH_GITHUB_CLIENT_SECRET` в Vercel (сделаю сам через CLI, когда будут значения)
- [ ] Проверить цикл целиком на проде: вход → правка → коммит → сайт обновился

## Решения
- Reviews (отзывы) и FAQ пока НЕ переношу в CMS — Дима просил фото/услуги/условия/телефон, не всё подряд. Можно добавить позже отдельным шагом.
