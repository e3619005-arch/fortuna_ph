# FORTUNA_PH — сайт-визитка автомобильного фотографа

Премиальный тёмный сайт-визитка: Next.js 16 + Tailwind CSS v4 + Framer Motion.
Акцент — шампань `#D4AF6A`. Шрифты Geist / Geist Mono (локально, `app/fonts/`).

## Структура

- `app/page.tsx` — вся разметка страницы (Hero, Ticker, Формат, Зачем, Локации, Условия, Портфолио, Соцсети, Контакты, Footer)
- `content.ts` — ВСЕ тексты, ссылки и список фото сайта (правится в одном месте)
- `app/globals.css` — дизайн-токены Tailwind (цвета, шрифты, анимации kenburns/ticker)
- `components/AnimateIn.tsx` — анимация появления блоков (Framer Motion)
- `components/Year.tsx` — текущий год в футере
- `public/carph1.jpg` … `carph9.jpg` — фотографии

## Запуск

```bash
npm run dev      # разработка → http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск собранной версии
```

## Фотографии

Положи свои фото в `public/` со строгими именами:

| Файл | Назначение | Пропорции |
|---|---|---|
| `carph1.jpg` | фон Hero | широкий кадр (16:9) |
| `carph2.jpg` … `carph9.jpg` | 8 плиток портфолио | вертикальные (3:4) |

Фото уже загружены — при желании просто перезапиши файлы новыми кадрами.

## Деплой на Vercel

1. Залей проект на GitHub (`git push`).
2. На [vercel.com](https://vercel.com) → **Add New Project** → Import Git Repository → **Deploy**.
3. Через минуту сайт будет по адресу `fortuna-ph.vercel.app` (домен меняется в настройках проекта → Domains).

