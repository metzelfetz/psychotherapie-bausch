import { locations, practice } from './practice';
import type { Lang } from '../i18n/ui';

interface Options {
  lang: Lang;
  /** Absolute URL of the home page in this language. */
  homeUrl: string;
  description: string;
  /** Absolute URL of the portrait. */
  image: string;
  /** Profiles elsewhere (the publications links). */
  sameAs: string[];
}

/** schema.org data for the home page: the website, the practitioner and one
 *  MedicalBusiness per location, built from practice.ts. */
export function practiceJsonLd({ lang, homeUrl, description, image, sameAs }: Options) {
  const personId = `${homeUrl}#paul-bausch`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${homeUrl}#website`,
        url: homeUrl,
        name: `${practice.practiceName[lang]} ${practice.name}`,
        inLanguage: lang,
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: practice.name,
        honorificPrefix: 'Dr. phil.',
        jobTitle: practice.tagline[lang].split(' · ')[1],
        email: practice.email,
        telephone: practice.phone.href.replace('tel:', ''),
        url: homeUrl,
        image,
        sameAs,
        knowsLanguage: ['de', 'en'],
        workLocation: locations.map((l) => ({ '@id': `${homeUrl}#${l.id}` })),
      },
      ...locations.map((l) => ({
        '@type': 'MedicalBusiness',
        '@id': `${homeUrl}#${l.id}`,
        name: `${practice.practiceName[lang]} ${practice.name} – ${l.city}`,
        description,
        url: homeUrl,
        image,
        email: practice.email,
        telephone: practice.phone.href.replace('tel:', ''),
        medicalSpecialty: 'Psychiatric',
        address: {
          '@type': 'PostalAddress',
          streetAddress: l.street,
          postalCode: l.postalCode,
          addressLocality: l.city,
          addressRegion: practice.region,
          addressCountry: 'DE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: l.geo.lat, longitude: l.geo.lng },
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: l.dayOfWeek },
        employee: { '@id': personId },
      })),
    ],
  };
}
