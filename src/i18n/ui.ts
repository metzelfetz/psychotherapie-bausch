export const languages = { de: 'Deutsch', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'de';

export const ui = {
  de: {
    'nav.label': 'Hauptnavigation',
    'nav.menu': 'Menü',
    'lang.switch': 'Sprache wählen',
    'cta.email': 'E-Mail senden',
    'footer.phone': 'Telefon',
    'footer.email': 'E-Mail',
    'skip': 'Zum Inhalt springen',
  },
  en: {
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'lang.switch': 'Choose language',
    'cta.email': 'Send an email',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'skip': 'Skip to content',
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];

export function t(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}
