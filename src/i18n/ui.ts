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
    'location.title': 'Standort {city}',
    'location.address': 'Praxisadresse',
    'nav.cta': 'Erstgespräch vereinbaren',
    'cta.call': 'Telefon:',
    'cta.address': 'E-Mail-Adresse:',
    'cta.privacy': 'Bitte nennen Sie in Ihrer E-Mail kurz Ihr Anliegen, Ihre Versicherung und mögliche Terminoptionen – ausführliche Angaben zu Ihrer Gesundheit besprechen wir persönlich.',
    'footer.contact': 'Kontakt',
    'footer.locations': 'Standorte',
    'crisis.title': 'In einer akuten Krise?',
    'crisis.emergency': 'Rund um die Uhr erreichen Sie den Notruf unter',
    'crisis.hotline': 'und die TelefonSeelsorge kostenfrei unter',
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
    'location.title': '{city} location',
    'location.address': 'Practice address',
    'nav.cta': 'Book an initial consultation',
    'cta.call': 'Phone:',
    'cta.address': 'Email address:',
    'cta.privacy': 'In your email, please briefly state your concern, your insurance and possible appointment times – we will discuss detailed information about your health in person.',
    'footer.contact': 'Contact',
    'footer.locations': 'Locations',
    'crisis.title': 'In an acute crisis?',
    'crisis.emergency': 'Around the clock, you can reach the emergency number',
    'crisis.hotline': 'and the TelefonSeelsorge crisis line, free of charge, on',
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];

export function t(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}
