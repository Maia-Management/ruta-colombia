import type { Metadata } from 'next';
import Link from '@/components/Link';

export const metadata: Metadata = {
  title: 'About Ruta Colombia — Travel & Expat Guides',
  description:
    'Ruta Colombia is the definitive Colombia travel and expat guide, produced by The Maia Group. Expert local knowledge on living, working, investing, and exploring Colombia.',
  alternates: {
    canonical: 'https://ruta-colombia.com/about/',
  },
  openGraph: {
    title: 'About Ruta Colombia — Travel & Expat Guides',
    description:
      'Ruta Colombia is the definitive Colombia travel and expat guide, produced by The Maia Group. Expert local knowledge on living, working, investing, and exploring Colombia.',
    url: 'https://ruta-colombia.com/about/',
    type: 'website',
    images: [{ url: 'https://ruta-colombia.com/og-image.jpg', width: 1200, height: 630, alt: 'About Ruta Colombia' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RutaColombia',
    creator: '@RutaColombia',
    title: 'About Ruta Colombia — Travel & Expat Guides',
    description:
      'Expert local knowledge on living, working, investing, and exploring Colombia.',
    images: ['https://ruta-colombia.com/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">About us</h1>
      <div className="w-16 h-1 bg-teal-500 mb-8 rounded-full" />

      <div className="prose max-w-none text-gray-700">
        <p>
          <strong>Ruta Colombia</strong> is the digital content hub of{' '}
          <a href="https://the-maia-group.com" target="_blank" rel="noopener noreferrer">
            The Maia Group
          </a>{' '}
          — your trusted, English-first source for everything you need to know about living, working, investing, and exploring Colombia.
        </p>

        <p>
          We cover Medellín, Santa Marta, and beyond — with expert guides on real estate, legal matters, food & drink, careers, marine lifestyle, things to do, and community life. Our content is written for expats, digital nomads, investors, and tourists who want reliable, on-the-ground knowledge.
        </p>

        <h2>Our mission</h2>
        <p>
          To make expert local knowledge accessible. Colombia is growing fast as a destination for living and investing — but reliable English-language information is scarce. We bridge that gap with guides written by professionals who live and work here.
        </p>

        <h2>Cities we cover</h2>
        <ul>
          <li>
            <Link href="/medellin/">
              <strong>Medellín</strong>
            </Link>{' '}
            — Colombia's innovation capital and the top destination for expats and digital nomads.
          </li>
          <li>
            <Link href="/santa-marta/">
              <strong>Santa Marta</strong>
            </Link>{' '}
            — The Caribbean coast gem, with beaches, the Sierra Nevada, and a growing international scene.
          </li>
          <li>
            <strong>Cartagena, Bogotá, Cali, Barranquilla, and Bucaramanga</strong> — city guides and practical topic coverage across Colombia.
          </li>
        </ul>

        <h2>The Maia Group ecosystem</h2>
        <p>
          Ruta Colombia is part of The Maia Group's network of companies operating across Colombia:
        </p>
        <ul>
          <li>
            <a href="https://maia-realty.com" target="_blank" rel="noopener noreferrer">
              <strong>Maia Realty</strong>
            </a>{' '}
            — Real estate and property management in Colombia
          </li>
          <li>
            <a href="https://maia-legal.com" target="_blank" rel="noopener noreferrer">
              <strong>Maia Legal</strong>
            </a>{' '}
            — Legal services for expats, investors, and businesses in Colombia
          </li>
          <li>
            <a href="https://mapana-marine.com" target="_blank" rel="noopener noreferrer">
              <strong>Mapaná Marine</strong>
            </a>{' '}
            — Professional nautical services on the Colombian Caribbean
          </li>
          <li>
            <a href="https://bevidabotanicas.com" target="_blank" rel="noopener noreferrer">
              <strong>Be Vida Botánicas</strong>
            </a>{' '}
            — Artisan RTD cocktails made with Colombian botanicals
          </li>
          <li>
            <a href="https://lleva-lleva.com" target="_blank" rel="noopener noreferrer">
              <strong>LlevaLleva</strong>
            </a>{' '}
            — Colombia's classifieds and jobs marketplace
          </li>
        </ul>

        <h2>Advertising & partnerships</h2>
        <p>
          We work with brands and businesses aligned with our values. Interested in sponsored content, advertising, or editorial collaborations?{' '}
          <Link href="/contact/">Get in touch</Link>.
        </p>
      </div>
    </div>
  );
}
