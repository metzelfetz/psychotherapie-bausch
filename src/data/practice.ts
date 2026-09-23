// Single source of truth for practice facts (see _sessions/conventions.md).
export const practice = {
  name: 'Dr. Paul Bausch',
  practiceName: {
    de: 'Privatpraxis für Psychotherapie',
    en: 'Private Practice for Psychotherapy',
  },
  tagline: {
    de: 'Psychologischer Psychotherapeut | Verhaltenstherapie',
    en: 'Psychological Psychotherapist | Behavioural Therapy',
  },
  street: 'Bußstraße 17',
  postalCode: '79102',
  city: 'Freiburg',
  country: { de: 'Deutschland', en: 'Germany' },
  phone: {
    href: 'tel:+4915786444932',
    display: '+49 (0)157 86444932',
  },
  email: 'mail@psychotherapie-bausch.de',
  mailSubject: { de: 'Anmeldung Erstgespräch', en: 'Initial consultation' },
  geo: { lat: 47.98642281388925, lng: 7.866758820957796 },
} as const;

export function mailto(lang: 'de' | 'en') {
  return `mailto:${practice.email}?subject=${encodeURIComponent(practice.mailSubject[lang])}`;
}
