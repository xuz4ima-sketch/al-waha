# Безопасность прототипа al-waha

Проверено 2 ноября 2026 года. Область проверки: только новый код в этой папке (`index.html`, `assets/`, `_headers`, `.htaccess`). Текущий WordPress-сайт alwaha-center.com не проверялся.

## Что сделано

| Угроза | Защита | Где |
| --- | --- | --- |
| XSS через внедрённые скрипты | CSP: `script-src 'self'`, инлайн-скриптов и обработчиков `onclick` нет | `<meta>` в `index.html`, `_headers`, `.htaccess` |
| XSS через данные | Тексты вставляются только через `textContent` и атрибуты, `innerHTML` не используется | `assets/js/main.js` |
| Инъекция через URL (`?lang=`) | Значение проверяется по белому списку `ar`/`en`, иначе ставится `ar`. Значение из localStorage проверяется так же | `initialLang()` |
| Подмена видео | ID захардкожены в списке `VIDEO_IDS` и дополнительно проходят `/^[\w-]{11}$/` до подстановки в `src` | `initVideos()` |
| iframe YouTube | Создаётся только по клику, домен `youtube-nocookie.com`, `referrerpolicy="strict-origin-when-cross-origin"`, `loading="lazy"`, минимальный `allow`, `sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"`. CSP `frame-src` разрешает только этот домен | `initVideos()` |
| Слежка до согласия | Превью видео лежат локально (`assets/img/video-*.jpg`), поэтому до клика к Google и YouTube не уходит ни одного запроса (проверено в Chrome: 0 запросов). Трекеров, AdSense и Site Kit нет | `index.html` |
| Tabnabbing | Все 16 внешних ссылок с `target="_blank"` имеют `rel="noopener noreferrer"` | `index.html` |
| Утечка адреса страницы | `<meta name="referrer" content="strict-origin-when-cross-origin">` и такой же заголовок | `index.html`, заголовки |
| Ссылки WhatsApp | Текст сообщения кодируется через `encodeURIComponent` | `apply()` |
| Clickjacking | `frame-ancestors 'self'` и `X-Frame-Options: SAMEORIGIN`. В `<meta>` они не работают, поэтому есть только в заголовках | `_headers`, `.htaccess` |
| Прочее | `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`, `connect-src 'none'`. Нет ключей, секретов и `<meta name="generator">` | везде |

Заголовки для будущего хостинга: HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` (камера, микрофон, геолокация, платежи, USB выключены), `Cross-Origin-Opener-Policy`. `.htaccess` также включает редирект на HTTPS, запрещает листинг папок и закрывает служебные папки `.hallmark` и `.design-review`.

## Как проверено

- Ручной чек-лист по коду: поиск `innerHTML`, `eval`, `document.write`, инлайн-обработчиков и стилей, `http://`, ключей и трекеров. Ничего не найдено.
- Реальный Chrome (puppeteer) на 1440, 768 и 375 px, AR и EN: ноль ошибок и ноль нарушений CSP в консоли страницы.
- `?lang=xx` и `?lang=<script>…` дают `lang="ar"`.
- Клик по превью вставляет iframe с атрибутами из таблицы.

## Что остаётся на усмотрение

- Google Fonts подключается без SRI: CSS генерируется под браузер, и хэш не зафиксировать. Если нужна полная независимость, шрифты можно положить в `assets/fonts/` и убрать Google из CSP.
- `upgrade-insecure-requests` есть только в заголовках, не в `<meta>`: иначе ломается локальный просмотр по `http://localhost`.
- Перед заливкой не загружайте на хостинг `.hallmark/`, `.design-review/` и этот файл.

## Редизайн «Оазис в сумерках» (2 ноября 2026, ночь)

| Что изменилось | Как защищено |
| --- | --- |
| Шрифты Reem Kufi, Aref Ruqaa, Readex Pro (OFL) лежат локально в `assets/fonts/` | Google Fonts убран полностью: в CSP теперь `style-src 'self'; font-src 'self'` (meta, `_headers`, `.htaccess`). Ни одного запроса к Google до клика по видео |
| GSAP 3.13 (gsap, ScrollTrigger, ScrollToPlugin, ScrollSmoother) лежит в `assets/vendor/gsap/` | `script-src 'self'`, без CDN и без инлайн-скриптов. Сайт полностью работает без GSAP и без JS |
| Пошаговая форма «Заявка на обучение» | Данные никуда не отправляются с сайта: `form-action 'none'` и `connect-src 'none'` остаются. Скрипт собирает текст и открывает `https://wa.me/201018573856?text=…` (только номер центра, текст через `encodeURIComponent`). Все значения выводятся через `textContent`, `innerHTML` по-прежнему не используется. Телефон и e-mail проверяются регулярными выражениями до отправки |
| Фото с Wikimedia Commons | Скачаны и пережаты в WebP/AVIF, отдаются со своего домена (`img-src 'self'`). Авторы и лицензии указаны в подвале |

Второй номер WhatsApp со старого сайта (…3372) принадлежит бывшему разработчику и на сайте не используется нигде.
