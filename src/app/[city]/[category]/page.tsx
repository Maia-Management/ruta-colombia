import { notFound } from 'next/navigation';
import Link from '@/components/Link';
import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticlesByCity, getArticlesByCityAndCategory } from '@/lib/articles';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

type CategoryParams = { city: string; category: string };

interface Props {
  params: Promise<CategoryParams>;
}

export function generateStaticParams() {
  return cities.flatMap((city) => {
    const availableCategorySlugs = new Set(getAllArticlesByCity(city.slug).map((article) => article.category));
    return categories
      .filter((category) => availableCategorySlugs.has(category.slug))
      .map((category) => ({
      city: city.slug,
      category: category.slug,
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!category || !city) return {};

  const title = `${category.name} in ${city.name}, Colombia`;
  const description = `Expert ${category.name.toLowerCase()} guides for ${city.name}, Colombia — written by local professionals for expats, digital nomads, tourists, and investors.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://ruta-colombia.com/${citySlug}/${categorySlug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://ruta-colombia.com/${citySlug}/${categorySlug}/`,
      type: 'website',
      images: [{ url: 'https://ruta-colombia.com/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RutaColombia',
      creator: '@RutaColombia',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { city: citySlug, category: categorySlug } = await params;

  const city = cities.find((c) => c.slug === citySlug);
  const category = categories.find((c) => c.slug === categorySlug);

  // Unknown city or category — hard 404
  if (!city || !category) {
    notFound();
  }

  const articles = getArticlesByCityAndCategory(citySlug, categorySlug);

  if (articles.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        {/* Category colour accent */}
        <div
          className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{
            backgroundColor: category.maia_brand.bgColor,
            border: `3px solid ${category.maia_brand.color}`,
          }}
          aria-hidden="true"
        />

        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          {category.name} — {city.name}
        </h1>

        <p className="text-gray-500 text-lg mb-2">
          No published guides are available in this topic yet.
        </p>
        <p className="text-gray-400 text-base mb-10">
          Browse the active {city.name} guides below or return to the city overview.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${citySlug}/`}
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            ← Back to {city.name}
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Suggest other categories for this city */}
        <div className="mt-14">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Explore other {city.name} topics
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories
              .filter((c) => c.slug !== categorySlug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${citySlug}/${cat.slug}/`}
                  className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-700 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Link href={`/${citySlug}/`} className="text-sm text-teal-700 hover:underline font-medium">
            {city.name}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">{category.name}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-3">
          {category.name} in {city.name}
        </h1>
        <div
          className="w-16 h-1 rounded-full mb-4"
          style={{ backgroundColor: category.maia_brand.color }}
        />
        <p className="text-gray-600 text-lg max-w-2xl">
          Expert guides on {category.name.toLowerCase()} in {city.name} — written by local
          professionals for expats, digital nomads, and investors.
        </p>
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
