interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  category: string;
  dateModified?: string;
  image?: string;
}

export function ArticleSchema({ title, description, datePublished, dateModified, author, url, category, image }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(image ? { image } : {}),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ruta Colombia',
      url: 'https://ruta-colombia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ruta-colombia.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    inLanguage: 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ruta Colombia',
    description:
      'Your definitive guide to living, working, investing, and exploring Colombia. Expert coverage of Medellín, Santa Marta, Bogotá, Cartagena, and beyond.',
    url: 'https://ruta-colombia.com',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'The Maia Group',
      url: 'https://the-maia-group.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ruta-colombia.com/medellin/things-to-do/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristGuideSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    name: 'Ruta Colombia',
    description:
      'Your definitive Colombia travel guide and expat resource. Expert local coverage of Medellín, Santa Marta, Bogotá, Cartagena, Cali, Barranquilla, and Bucaramanga — for tourists, expats, digital nomads, and investors.',
    url: 'https://ruta-colombia.com',
    logo: 'https://ruta-colombia.com/logo.png',
    image: 'https://ruta-colombia.com/og-image.jpg',
    telephone: '+573195962773',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+573195962773',
      contactType: 'customer support',
      availableLanguage: ['English', 'Spanish'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Colombia',
    },
    knowsAbout: [
      'Colombia travel',
      'Colombia tourism',
      'Living in Colombia',
      'Expat life in Colombia',
      'Digital nomad Colombia',
      'Colombia real estate',
      'Colombia visa',
      'Medellín travel guide',
      'Cartagena travel guide',
      'Santa Marta travel guide',
      'Bogotá travel guide',
    ],
    sameAs: [
      'https://the-maia-group.com',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
