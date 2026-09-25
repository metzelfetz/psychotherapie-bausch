// Single source of truth for practice facts (see _sessions/conventions.md).
export const practice = {
  name: 'Dr. Paul Bausch',
  practiceName: {
    de: 'Praxis für Psychotherapie',
    en: 'Practice for Psychotherapy',
  },
  tagline: {
    de: 'Dr. phil. Paul Bausch · Psychologischer Psychotherapeut',
    en: 'Dr. phil. Paul Bausch · Psychological Psychotherapist',
  },
  country: { de: 'Deutschland', en: 'Germany' },
  phone: {
    href: 'tel:+4915786444932',
    display: '+49 (0)157 86444932',
  },
  email: 'mail@psychotherapie-bausch.de',
  mailSubject: { de: 'Anmeldung Erstgespräch', en: 'Initial consultation' },
} as const;

// The two practice locations, in Paul's order (his text of 2026-09-24).
// Coordinates: the building's OSM centroid (Nominatim, looked up once), kept
// for the JSON-LD (s4).
export const locations = [
  {
    id: 'schopfheim',
    city: 'Schopfheim',
    street: 'Steinhäußlerstr. 10',
    postalCode: '79650',
    days: { de: 'Montag bis Mittwoch', en: 'Monday to Wednesday' },
    billing: {
      // Bold on the card: it applies to most patients (Paul, 2026-09-24).
      de: [{ text: 'Alle gesetzlichen Krankenkassen', strong: true }, 'Private Krankenversicherungen & Beihilfe', 'Selbstzahler'],
      en: [{ text: 'All statutory health insurers', strong: true }, 'Private health insurance & Beihilfe', 'Self-payers'],
    },
    geo: { lat: 47.6485758, lng: 7.8261394 },
  },
  {
    id: 'freiburg',
    city: 'Freiburg',
    street: 'Bußstraße 17',
    postalCode: '79102',
    days: { de: 'Donnerstag und Freitag', en: 'Thursday and Friday' },
    billing: {
      de: ['Private Krankenversicherungen & Beihilfe', 'Selbstzahler'],
      en: ['Private health insurance & Beihilfe', 'Self-payers'],
    },
    geo: { lat: 47.98642281388925, lng: 7.866758820957796 },
  },
] as const;

export type Location = (typeof locations)[number];

// Crisis lines for the footer note (approved by the user, 2026-09-23).
export const crisisLines = {
  emergency: { href: 'tel:112', display: '112' },
  telefonSeelsorge: { href: 'tel:+498001110111', display: '0800 111 0 111' },
} as const;

export function mailto(lang: 'de' | 'en') {
  return `mailto:${practice.email}?subject=${encodeURIComponent(practice.mailSubject[lang])}`;
}
