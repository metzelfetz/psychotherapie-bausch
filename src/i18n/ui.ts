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
    'footer.legal': 'Rechtliches',
    'skip': 'Zum Inhalt springen',
    'menu.open': 'Menü öffnen',
    'map.consent': 'Beim Laden der Karte wird eine Verbindung zu OpenStreetMap hergestellt.',
    'map.load': 'Karte laden',
    'map.alt': 'Lage der Praxis',
  },
  en: {
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'lang.switch': 'Choose language',
    'cta.email': 'Send an email',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.legal': 'Legal',
    'skip': 'Skip to content',
    'menu.open': 'Open menu',
    'map.consent': 'Loading the map connects to OpenStreetMap.',
    'map.load': 'Load map',
    'map.alt': 'Location of the practice',
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];

export function t(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}
