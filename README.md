# FORTUNA_PH — сайт-визитка автомобильного фотографа

Премиальный тёмный сайт-визитка: Next.js 16 + Tailwind CSS v4 + Framer Motion.
Акцент — шампань `#D4AF6A`. Шрифты Geist / Geist Mono (локально, `app/fonts/`).

## Структура

- `app/page.tsx` — вся разметка страницы (Hero, Ticker, Формат, Зачем, Локации, О себе, Условия, Портфолио, Манифест, Соцсети, FAQ, Контакты, Footer)
- `content.ts` — ВСЕ тексты, ссылки и список фото сайта (правится в одном месте)
- `app/globals.css` — дизайн-токены Tailwind (цвета, шрифты, анимации kenburns/ticker)
- `components/AnimateIn.tsx` — появление блоков при скролле (Framer Motion: направление, задержка, blur)
- `components/Parallax.tsx` — параллакс при скролле (Hero)
- `components/ScrollProgress.tsx` — золотой индикатор прокрутки вверху страницы
- `components/Viewfinder.tsx` — HUD-рамка видоискателя в Hero
- `components/ScrollHint.tsx` — индикатор прокрутки внизу Hero
- `components/Faq.tsx` — аккордеон «Частые вопросы»
- `components/Preloader.tsx` — загрузочный экран «затвор камеры»
- `components/TopoBackground.tsx` — «живая» топо-карта на фоне страницы (canvas: шум Перлина, изолинии, холм за курсором, рябь по клику; адаптировано из kokonutui, MIT)
- `components/Year.tsx` — текущий год в футере
- `photo-version.ts` — версия фото для кэш-бастинга (поднимай при замене фото)
- `public/carph1.jpg` … `carph9.jpg` — фотографии

## Запуск

```bash
npm run dev      # разработка → http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск собранной версии
```

## Фотографии

Исходники хранятся в `originals/` (локально, не в git). Для публикации запусти
оптимизацию — она создаст веб-версии в `public/`:

```bash
npm run img    # originals/*.jpg -> public/ (hero: JPEG 1920px, тайлы: WebP 900px)
```

| Файл в `public/` | Назначение | Пропорции | Формат |
|---|---|---|---|
| `carph1.jpg` | фон Hero (и og-картинка) | широкий кадр (16:9) | JPEG |
| `carph2.webp` … `carph9.webp` | 8 плиток портфолио | вертикальные (3:4) | WebP |

Фото уже оптимизированы — при желании замени файлы в `originals/` новыми
кадрами с теми же именами и запусти `npm run img` снова.

**Важно при замене фото:** подними `PHOTO_VERSION` в `photo-version.ts` на 1 —
иначе браузер и CDN продолжат показывать старые картинки из кэша (файлы имеют
те же имена и URL, кэш у них «вечный» через заголовки в `netlify.toml`).
Версия подключается в `content.ts` автоматически.

## Деплой на GitHub Pages

Сайт настроен на статический экспорт (`output: "export"` в `next.config.ts`).
Публикация — автоматически через GitHub Actions (`.github/workflows/deploy.yml`):
каждый `git push` в `main` собирает сайт и выкладывает на
`https://<ник>.github.io/fortuna_ph/`.

Одноразовая настройка репозитория:
1. Settings → General → Danger Zone → **Change visibility** → сделать репозиторий **публичным**
   (GitHub Pages на бесплатном тарифе работает только для публичных репо).
2. Settings → **Pages** → Source: **GitHub Actions** → Save.

В CI задаются `NEXT_PUBLIC_BASE_PATH=/fortuna_ph` и `NEXT_PUBLIC_SITE_URL` —
локально и на резервном Netlify сайт работает от корня без изменений.

