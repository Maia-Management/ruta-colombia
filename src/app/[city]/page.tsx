import type { Metadata } from 'next';
import Link from '@/components/Link';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import { getAllArticlesByCity } from '@/lib/articles';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

type CityParams = { city: string };

interface Props {
  params: Promise<CityParams>;
}

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

const cityMeta: Record<string, { title: string; description: string; ogImage?: string }> = {
  medellin: {
    title: 'Medellín Travel Guide — Expat Life & Things to Do',
    description:
      'Medellín travel guide: neighbourhoods, restaurants, things to do, cost of living, and expat tips in the City of Eternal Spring.',
    ogImage: 'https://ruta-colombia.com/og-medellin.jpg',
  },
  'santa-marta': {
    title: 'Santa Marta Guide — Beaches & Tayrona',
    description:
      'Santa Marta travel guide: Tayrona National Park, beaches, neighbourhoods, restaurants, and expat life on Colombia\'s Caribbean coast.',
    ogImage: 'https://ruta-colombia.com/og-santa-marta.jpg',
  },
  bogota: {
    title: 'Bogotá Travel Guide — Neighbourhoods & Expat Tips',
    description:
      'Essential Bogotá travel guide: things to do, neighbourhoods, restaurants, nightlife, and practical expat advice in Colombia\'s capital.',
    ogImage: 'https://ruta-colombia.com/og-bogota.jpg',
  },
  cartagena: {
    title: 'Cartagena Guide — Old Town & Beaches',
    description:
      'Cartagena travel guide: the UNESCO walled city, Caribbean beaches, top restaurants, and practical expat living tips.',
    ogImage: 'https://ruta-colombia.com/og-cartagena.jpg',
  },
  cali: {
    title: 'Cali Guide — Salsa, Food & Expat Life',
    description:
      'Discover Cali, Colombia\'s salsa capital: things to do, neighbourhoods, restaurants, nightlife, and expat life.',
    ogImage: 'https://ruta-colombia.com/og-cali.jpg',
  },
  barranquilla: {
    title: 'Barranquilla Travel Guide — Carnival & Living Costs',
    description:
      'Barranquilla guide: carnival, things to do, restaurants, neighbourhoods, and cost of living in Colombia\'s Caribbean gateway.',
    ogImage: 'https://ruta-colombia.com/og-barranquilla.jpg',
  },
  bucaramanga: {
    title: 'Bucaramanga Travel Guide — Parks, Costs & Expat Life',
    description:
      'Discover Bucaramanga, Colombia\'s best-kept secret. Best things to do, cost of living, parks, and why expats love this clean, affordable city in the Andes foothills.',
    ogImage: 'https://ruta-colombia.com/og-bucaramanga.jpg',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};
  const meta = cityMeta[citySlug];
  const title = meta?.title ?? `${city.name} Travel Guide — Colombia | Ruta Colombia`;
  const description = meta?.description ?? `Your definitive guide to living, working, and exploring ${city.name}, Colombia.`;
  const ogImage = meta?.ogImage ?? 'https://ruta-colombia.com/og-image.jpg';
  return {
    title,
    description,
    alternates: {
      canonical: `https://ruta-colombia.com/${citySlug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://ruta-colombia.com/${citySlug}/`,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RutaColombia',
      creator: '@RutaColombia',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Carousel slide data per city (kept close to the page that uses it)
const citySlides: Record<string, { src: string; alt: string; caption: string }[]> = {
  medellin: [
    { src: '/images/medellin-valley.jpg', alt: 'Medellín skyline in the Aburrá Valley', caption: 'Medellín — City of Eternal Spring' },
  ],
  'santa-marta': [
    { src: '/images/tayrona-beach.jpg', alt: 'Tayrona National Park beach near Santa Marta', caption: 'Tayrona National Park — jungle meets the Caribbean' },
  ],
  bogota: [
    { src: '/images/bogota-street.jpg', alt: 'Bogotá street and mountain skyline', caption: "Bogotá — Colombia's capital at 2,600m" },
  ],
  cartagena: [
    { src: '/images/cartagena-street.jpg', alt: 'Cartagena old town colonial street', caption: 'Cartagena — a UNESCO World Heritage walled city' },
  ],
};

// Per-city theme colours for the hero gradient
const cityTheme: Record<string, { gradient: string; accent: string }> = {
  medellin:     { gradient: 'from-violet-950 via-violet-800 to-violet-600', accent: 'bg-violet-600' },
  'santa-marta': { gradient: 'from-teal-950 via-teal-800 to-teal-600',   accent: 'bg-teal-600' },
  bogota:       { gradient: 'from-blue-950 via-blue-800 to-blue-600',     accent: 'bg-blue-700' },
  cartagena:    { gradient: 'from-amber-900 via-amber-700 to-amber-600',  accent: 'bg-amber-600' },
};

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;

  const city = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const articles = getAllArticlesByCity(citySlug);
  const availableCategorySlugs = new Set(articles.map((article) => article.category));
  const availableCategories = categories.filter((cat) => availableCategorySlugs.has(cat.slug));
  const slides = citySlides[citySlug] ?? [];
  const theme = cityTheme[citySlug] ?? { gradient: 'from-gray-900 via-gray-700 to-gray-600', accent: 'bg-gray-600' };

  return (
    <>
      {/* ── City hero ──────────────────────────────────────────────────────────
          FIX: White text on a deep gradient (dark-to-mid tone) achieves the
          required WCAG AA 4.5:1 contrast.  The additional semi-transparent
          dark overlay (bg-black/40) acts as a safety net so text is readable
          even if a future slide image bleeds through.  No light/cream
          backgrounds are used here.
      ──────────────────────────────────────────────────────────────────────── */}
      <section
        className={`relative bg-gradient-to-br ${theme.gradient} text-white overflow-hidden`}
      >
        {/* Dark overlay — ensures white text contrast regardless of background */}
        <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-6`}
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" aria-hidden="true" />
            {city.tagline}
          </div>

          {/* h1: white on dark overlay — contrast well above 7:1 */}
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5 leading-tight text-white drop-shadow-md">
            {city.name}
          </h1>

          {/* Subheading: slightly transparent white still clears 4.5:1 on dark overlay */}
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow">
            Your definitive local guide to living, working, and exploring {city.name}, Colombia.
          </p>

          {/* Category quick-links */}
          <div className="flex flex-wrap justify-center gap-2">
            {availableCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${citySlug}/${cat.slug}/`}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors backdrop-blur-sm border border-white/20"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo carousel ─────────────────────────────────────────────────── */}
      {slides.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <PhotoCarousel slides={slides} className="h-64 md:h-80" />
          </div>
        </div>
      )}

      {/* ── Articles grid ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {articles.length > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Latest from {city.name}
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        ) : (
          /* FIX: Empty city pages show a meaningful message, not a blank screen */
          <div className="text-center py-16">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-3">
              No city guides are published yet
            </h2>
            <p className="text-gray-500 mb-2 text-lg">
              Our active Colombia guides are available from the homepage.
            </p>
            <p className="text-gray-400 mb-8">
              Return to the main guide hub to browse cities with published coverage.
            </p>
            <Link
              href="/"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        )}
      </section>

      {/* ── Category browse strip ──────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Browse {city.name} by topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {availableCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${citySlug}/${cat.slug}/`}
                className="group p-4 rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all text-center"
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2"
                  style={{
                    backgroundColor: cat.maia_brand.bgColor,
                    border: `2px solid ${cat.maia_brand.color}`,
                  }}
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 block leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
