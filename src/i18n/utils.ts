import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, , lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    const base = import.meta.env.BASE_URL;
    const prefix = l === defaultLang ? '' : `/${l}`;
    // Remove base from path if it exists to avoid duplication
    const cleanPath = path.startsWith(base) ? path.slice(base.length) : path;
    return `${base}${prefix}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`;
  }
}
