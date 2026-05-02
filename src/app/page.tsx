import type { Metadata } from 'next';
import Link from '@/components/Link';
import ArticleCard from '@/components/ArticleCard';
import PhotoCarousel from '@/components/PhotoCarousel';
import { getAllArticlesByCity, getFeaturedArticlesByCity, getAllArticles } from '@/lib/articles';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';
import AdSense from '@/components/AdSense';
import BudgetCalculator from '@/components/BudgetCalculator';

export const metadata: Metadata = {
  title: 'Ruta Colombia — Colombia Travel Guide & Expat Resource',
  description:
    'Colombia travel and expat guides for Medellín, Cartagena, Santa Marta, Bogotá, Cali, and more: things to do, living costs, neighbourhoods, and restaurants.',
  alternates: {
    canonical: 'https://ruta-colombia.com/',
  },
  openGraph: {
    title: 'Ruta Colombia — Colombia Travel Guide & Expat Resource',
    description:
      'Expert city guides for Medellín, Cartagena, Santa Marta, and Bogotá — things to do, living costs, neighbourhoods, restaurants, and expat tips.',
    url: 'https://ruta-colombia.com/',
    type: 'website',
    images: [
      {
        url: 'https://ruta-colombia.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ruta Colombia — Colombia Travel Guide',
      },
    ],
  },
};

const medellinSlides = [
  { src: '/images/medellin-valley.jpg', alt: 'Medellín skyline in the Aburrá Valley', caption: 'Medellín — City of Eternal Spring' },
];

const santaMartaSlides = [
  { src: '/images/tayrona-beach.jpg', alt: 'Tayrona National Park beach near Santa Marta', caption: 'Tayrona National Park — jungle meets the Caribbean' },
];

const bogotaSlides = [
  { src: '/images/bogota-street.jpg', alt: 'Bogotá street and mountain skyline', caption: 'Bogotá — Colombia\'s capital at 2,600m' },
];

const cartagenaSlides = [
  { src: '/images/cartagena-street.jpg', alt: 'Cartagena old town colonial street', caption: 'Cartagena — a UNESCO World Heritage walled city' },
];

export default function HomePage() {
  const medellinArticles = getAllArticlesByCity('medellin');
  const medellinCategorySlugs = new Set(medellinArticles.map((article) => article.category));
  const medellinCategories = categories.filter((cat) => medellinCategorySlugs.has(cat.slug));
  const medellinFeatured = getFeaturedArticlesByCity('medellin');
  const santaMartaFeatured = getFeaturedArticlesByCity('santa-marta');
  const bogotaFeatured = getFeaturedArticlesByCity('bogota');
  const cartagenaFeatured = getFeaturedArticlesByCity('cartagena');
  const latestAll = getAllArticles().slice(0, 6);

  return (
    <>
      {/* Hero — Medellín primary */}
      <section className="relative bg-gradient-to-br from-violet-950 via-violet-800 to-violet-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-300 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-violet-200 mb-6">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            Featured City: Medellín, Colombia
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Your definitive guide to<br />
            <span className="text-teal-300">living in Colombia</span>
          </h1>
          <p className="text-violet-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Expert local coverage of real estate, legal, food, jobs, and lifestyle — for expats, digital nomads, investors, and tourists.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link
              href="/medellin/"
              className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg"
            >
              Explore Medellín →
            </Link>
            <Link
              href="/bogota/"
              className="bg-white/15 hover:bg-white/25 text-white font-medium px-6 py-3 rounded-full transition-colors backdrop-blur-sm"
            >
              Bogotá
            </Link>
            <Link
              href="/cartagena/"
              className="bg-white/15 hover:bg-white/25 text-white font-medium px-6 py-3 rounded-full transition-colors backdrop-blur-sm"
            >
              Cartagena
            </Link>
            <Link
              href="/santa-marta/"
              className="bg-white/15 hover:bg-white/25 text-white font-medium px-6 py-3 rounded-full transition-colors backdrop-blur-sm"
            >
              Santa Marta
            </Link>
          </div>

          {/* Quick category links */}
          <div className="flex flex-wrap justify-center gap-2">
            {medellinCategories.slice(0, 5).map((cat) => (
              <Link
                key={cat.slug}
                href={`/medellin/${cat.slug}/`}
                className="bg-white/10 hover:bg-white/20 text-violet-200 text-xs font-medium px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top banner ad — below hero */}
      <div className="bg-white border-b border-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSense slot="homepage-top-banner" format="auto" />
        </div>
      </div>

      {/* City Selector Strip */}
      <section className="bg-gray-950 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-3 shrink-0">Pick a city:</span>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/`}
                className="shrink-0 flex flex-col items-start px-5 py-2 rounded-lg border border-gray-700 hover:border-teal-500 hover:bg-gray-900 transition-all group"
              >
                <span className="text-sm font-semibold text-white group-hover:text-teal-400 transition-colors">{city.name}</span>
                <span className="text-xs text-gray-500">{city.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BudgetCalculator />

      {/* Medellín section — carousel + featured articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-violet-600 rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">Medellín</h2>
          </div>
          <div className="h-px flex-1 bg-gray-200" />
          <Link href="/medellin/" className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap">
            All Medellín →
          </Link>
        </div>

        {/* Medellín photo carousel */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <PhotoCarousel slides={medellinSlides} className="h-64 md:h-80" />
        </div>

        {medellinFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medellinFeatured.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
        )}
      </section>

      {/* Categories grid */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Explore by Category</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {medellinCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/medellin/${cat.slug}/`}
                className="group p-4 rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all text-center"
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: cat.maia_brand.bgColor, border: `2px solid ${cat.maia_brand.color}` }}
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 block leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Santa Marta section — carousel + featured articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-teal-600 rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">Santa Marta</h2>
          </div>
          <div className="h-px flex-1 bg-gray-200" />
          <Link href="/santa-marta/" className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap">
            All Santa Marta →
          </Link>
        </div>

        {/* Santa Marta photo carousel */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <PhotoCarousel slides={santaMartaSlides} className="h-64 md:h-80" />
        </div>

        {santaMartaFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {santaMartaFeatured.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
        )}
      </section>

      {/* Bogotá section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-700 rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-gray-900">Bogotá</h2>
          </div>
          <div className="h-px flex-1 bg-gray-200" />
          <Link href="/bogota/" className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap">
            All Bogotá →
          </Link>
        </div>
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <PhotoCarousel slides={bogotaSlides} className="h-64 md:h-80" />
        </div>
        {bogotaFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bogotaFeatured.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
        )}
      </section>

      {/* Cartagena section */}
      <section className="bg-amber-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-600 rounded-full" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Cartagena</h2>
            </div>
            <div className="h-px flex-1 bg-amber-200" />
            <Link href="/cartagena/" className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap">
              All Cartagena →
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
            <PhotoCarousel slides={cartagenaSlides} className="h-64 md:h-80" />
          </div>
          {cartagenaFeatured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartagenaFeatured.slice(0, 3).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="featured" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Cities strip */}
      <section className="bg-gray-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-bold text-white mb-5">More Colombian Cities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: 'cali', name: 'Cali', tagline: 'World Capital of Salsa', gradient: 'from-emerald-800 to-emerald-600' },
              { slug: 'barranquilla', name: 'Barranquilla', tagline: "Colombia's Caribbean Gateway", gradient: 'from-red-800 to-red-600' },
              { slug: 'bucaramanga', name: 'Bucaramanga', tagline: 'The City of Parks', gradient: 'from-orange-800 to-orange-600' },
            ].map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/`}
                className={`group relative rounded-xl overflow-hidden bg-gradient-to-br ${city.gradient} p-6 hover:opacity-90 transition-opacity`}
              >
                <h3 className="font-serif text-xl font-bold text-white mb-1">{city.name}</h3>
                <p className="text-sm text-white/70 mb-3">{city.tagline}</p>
                <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest across Colombia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Latest from Colombia</h2>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestAll.map((article) => (
            <ArticleCard key={`${article.city}-${article.slug}`} article={article} />
          ))}
        </div>
      </section>

      {/* Mid-page AdSense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdSense slot="homepage-mid" format="auto" />
      </div>

      {/* About strip */}
      <section className="bg-gray-950 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">About Ruta Colombia</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Ruta Colombia is the digital content hub of{' '}
            <a href="https://the-maia-group.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">
              The Maia Group
            </a>
            . We combine on-the-ground expertise with professional knowledge in real estate, law, gastronomy, and more — to help you live, invest, and thrive in Colombia.
          </p>
          <Link
            href="/about/"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-500 transition-colors"
          >
            Learn more →
          </Link>
        </div>
      </section>
    </>
  );
}
