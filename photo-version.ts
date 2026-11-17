// Кэш-бастинг фотографий. При замене файлов в public/ (те же имена)
// подними PHOTO_VERSION на 1 — иначе браузер и CDN отдадут старые картинки.
// Используется в content.ts (адреса).
//
// photoPath добавляет basePath для GitHub Pages (NEXT_PUBLIC_BASE_PATH
// задаётся только в CI; локально и на Netlify — пустая строка).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PHOTO_VERSION = 3;

export const photoPath = (path: string) => `${base}${path}?v=${PHOTO_VERSION}`;
