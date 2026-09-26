import { locations, practice } from './practice';
import type { Lang } from '../i18n/ui';

/** schema.org data for the home page: the practitioner and one
 *  MedicalBusiness per location, built from practice.ts. */
export function practiceJsonLd(lang: Lang, homeUrl: string) {
  const personId = `${homeUrl}#paul-bausch`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: practice.name,
        honorificPrefix: 'Dr. phil.',
        jobTitle: practice.tagline[lang].split(' · ')[1],
        email: practice.email,
        telephone: practice.phone.href.replace('tel:', ''),
        url: homeUrl,
      },
      ...locations.map((l) => ({
        '@type': 'MedicalBusiness',
        '@id': `${homeUrl}#${l.id}`,
        name: `${practice.practiceName[lang]} ${practice.name} – ${l.city}`,
        url: homeUrl,
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
