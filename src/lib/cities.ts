export interface City {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  region: string;
  heroGradient: string;
  accentColor: string;
}

export const cities: City[] = [
  {
    slug: 'medellin',
    name: 'Medellín',
    tagline: 'The City of Eternal Spring',
    description:
      "Colombia's most innovative city — a thriving hub for expats, digital nomads, and investors in the heart of Antioquia.",
    region: 'Antioquia',
    heroGradient: 'from-violet-900 via-violet-700 to-violet-500',
    accentColor: '#7c3aed',
  },
  {
    slug: 'santa-marta',
    name: 'Santa Marta',
    tagline: "Colombia's Caribbean Gem",
    description:
      'The oldest surviving city in South America — pristine beaches, the Sierra Nevada, and a fast-growing international community.',
    region: 'Magdalena',
    heroGradient: 'from-teal-900 via-teal-700 to-teal-500',
    accentColor: '#0d9488',
  },
  {
    slug: 'bogota',
    name: 'Bogotá',
    tagline: "The Capital at 2,600m",
    description:
      "Colombia's vibrant capital — a world-class cultural scene, booming tech sector, and the country's best dining and nightlife all at 2,600 metres above sea level.",
    region: 'Cundinamarca',
    heroGradient: 'from-blue-950 via-blue-800 to-blue-600',
    accentColor: '#1d4ed8',
  },
  {
    slug: 'cartagena',
    name: 'Cartagena',
    tagline: "The Walled City on the Caribbean",
    description:
      'A UNESCO World Heritage city of colonial splendour — pastel-coloured streets, a crystal-clear Caribbean bay, and one of Latin America\'s most iconic old towns.',
    region: 'Bolívar',
    heroGradient: 'from-amber-950 via-amber-800 to-amber-600',
    accentColor: '#b45309',
  },
  {
    slug: 'cali',
    name: 'Cali',
    tagline: "World Capital of Salsa",
    description:
      'The soul of Colombian culture — salsa dancing in the streets, a warm Pacific-influenced climate, and one of the most passionate, energetic cities in all of South America.',
    region: 'Valle del Cauca',
    heroGradient: 'from-emerald-950 via-emerald-800 to-emerald-600',
    accentColor: '#059669',
  },
  {
    slug: 'barranquilla',
    name: 'Barranquilla',
    tagline: "Colombia's Caribbean Gateway",
    description:
      'Home of the world\'s second-largest carnival — a bustling port city at the mouth of the Río Magdalena with a fast-growing economy and deeply proud Caribbean identity.',
    region: 'Atlántico',
    heroGradient: 'from-red-950 via-red-800 to-red-600',
    accentColor: '#dc2626',
  },
  {
    slug: 'bucaramanga',
    name: 'Bucaramanga',
    tagline: "The City of Parks",
    description:
      'Colombia\'s best-kept secret — a clean, safe, park-filled city in the Andes foothills with a remarkably low cost of living and one of the highest quality-of-life rankings in the country.',
    region: 'Santander',
    heroGradient: 'from-orange-950 via-orange-800 to-orange-600',
    accentColor: '#ea580c',
  },
  {
    slug: 'colombia',
    name: 'Colombia (Nationwide)',
    tagline: 'Country-wide guides for expats',
    description:
      'Country-wide expat essentials that apply across Colombia — banking, taxes, visas, driving, SIM cards, coworking, schools, and starting a business — not tied to any single city.',
    region: 'Colombia',
    heroGradient: 'from-yellow-700 via-blue-700 to-red-700',
    accentColor: '#1d4ed8',
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
