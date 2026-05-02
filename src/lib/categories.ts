export interface Category {
  slug: string;
  name: string;
  description: string;
  maia_brand: {
    name: string;
    url: string;
    tagline: string;
    color: string;
    bgColor: string;
  };
}

export const categories: Category[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate',
    description: 'Property guides, neighborhood breakdowns, and investment insights across Colombia.',
    maia_brand: {
      name: 'Maia Realty',
      url: 'https://maia-realty.com',
      tagline: 'Find your ideal property in Colombia with Maia Realty',
      color: '#1e40af',
      bgColor: '#eff6ff',
    },
  },
  {
    slug: 'legal',
    name: 'Legal',
    description: 'Visas, residency, Colombian law, and practical legal guidance for expats and investors.',
    maia_brand: {
      name: 'Maia Legal',
      url: 'https://maia-legal.com',
      tagline: 'Expert legal counsel for living and investing in Colombia',
      color: '#1e3a5f',
      bgColor: '#f0f4f8',
    },
  },
  {
    slug: 'food-drink',
    name: 'Food & Drink',
    description: 'The best restaurants, bars, cafés, and food experiences across Colombian cities.',
    maia_brand: {
      name: 'Be Vida Botánicas',
      url: 'https://be-vida.com',
      tagline: 'Artisan RTD cocktails — tropical flavors of Colombia. Try them at El Sanatorio bar in Santa Marta.',
      color: '#14532d',
      bgColor: '#f0fdf4',
    },
  },
  {
    slug: 'jobs',
    name: 'Jobs & Careers',
    description: 'Job opportunities, remote work, entrepreneurship, and professional life in Colombia.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://lleva-lleva.com',
      tagline: "Colombia's marketplace — buy, sell, and find work",
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
  {
    slug: 'marine',
    name: 'Marine',
    description: 'Sailing, diving, surfing, and everything ocean-related in Colombia.',
    maia_brand: {
      name: 'Mapaná Marine',
      url: 'https://mapana-marine.com',
      tagline: 'Professional nautical services on the Colombian Caribbean',
      color: '#0c4a6e',
      bgColor: '#f0f9ff',
    },
  },
  {
    slug: 'things-to-do',
    name: 'Things to Do',
    description: 'Attractions, day trips, experiences, and activities across Colombia.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://lleva-lleva.com',
      tagline: 'Discover local services and experiences in Colombia',
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
  {
    slug: 'community',
    name: 'Community',
    description: 'Local news, events, expat groups, and community life across Colombia.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://lleva-lleva.com',
      tagline: 'Connect with your local community on LlevaLleva',
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
