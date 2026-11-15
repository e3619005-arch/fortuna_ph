// Кэш-бастинг фотографий. При замене файлов в public/ (те же имена)
// подними PHOTO_VERSION на 1 — иначе браузер и CDN отдадут старые картинки.
// Используется в content.ts (адреса) и next.config.ts (images.localPatterns).
export const PHOTO_VERSION = 3;

export const photoPath = (path: string) => `${path}?v=${PHOTO_VERSION}`;
