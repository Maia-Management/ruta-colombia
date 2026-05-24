import { notFound } from 'next/navigation';
import Link from '@/components/Link';
import type { Metadata } from 'next';
import MaiaAd from '@/components/MaiaAd';
import AdSense from '@/components/AdSense';
import ArticleCard from '@/components/ArticleCard';
import MarkdownContent from '@/components/MarkdownContent';
import { ArticleSchema, BreadcrumbSchema } from '@/components/SchemaOrg';

const CITY_OG_IMAGES: Record<string, string> = {
  medellin: 'og-medellin.jpg',
  bogota: 'og-bogota.jpg',
  cartagena: 'og-cartagena.jpg',
  'santa-marta': 'og-santa-marta.jpg',
  cali: 'og-cali.jpg',
  barranquilla: 'og-barranquilla.jpg',
  bucaramanga: 'og-bucaramanga.jpg',
};
import { cities, getCityBySlug } from '@/lib/cities';
import { categories, getCategoryBySlug } from '@/lib/categories';
import {
  getAllArticleStaticParams,
  getArticleByCityAndSlug,
  getArticlesByCityAndCategory,
} from '@/lib/articles';

type ArticleParams = { city: string; category: string; slug: string };

interface Props {
  params: Promise<ArticleParams>;
}

export async function generateStaticParams() {
  return getAllArticleStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, category, slug } = await params;
  const article = getArticleByCityAndSlug(city, slug);
  if (!article) return {};
  const title = (article.metaTitle || article.title).replace(/\s*\|\s*Ruta Colombia\s*$/, '');
  const ogFile = CITY_OG_IMAGES[city] ?? 'og-image.jpg';
  const image = `https://ruta-colombia.com/${ogFile}`;

  return {
    title,
    description: article.metaDescription || article.excerpt,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `https://ruta-colombia.com/${city}/${category}/${slug}/`,
    },
    openGraph: {
      title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RutaColombia',
      creator: '@RutaColombia',
      title,
      description: article.metaDescription || article.excerpt,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { city: citySlug, category: categorySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  const article = getArticleByCityAndSlug(citySlug, slug);
  if (!city || !article || article.category !== categorySlug) notFound();

  const cat = getCategoryBySlug(article.category);
  const relatedArticles = getArticlesByCityAndCategory(citySlug, article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const articleUrl = `https://ruta-colombia.com/${citySlug}/${article.category}/${article.slug}/`;
  const ogFile = CITY_OG_IMAGES[citySlug] ?? 'og-image.jpg';
  const articleImage = `https://ruta-colombia.com/${ogFile}`;

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        datePublished={article.date}
        author={article.author}
        url={articleUrl}
        category={cat?.name || article.category}
        image={articleImage}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://ruta-colombia.com/' },
          { name: city.name, url: `https://ruta-colombia.com/${citySlug}/` },
          {
            name: cat?.name || article.category,
            url: `https://ruta-colombia.com/${citySlug}/${article.category}/`,
          },
          { name: article.title, url: articleUrl },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${citySlug}/`} className="hover:text-teal-600">{city.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${citySlug}/${article.category}/`} className="hover:text-teal-600">
            {cat?.name || article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              {cat && (
                <Link
                  href={`/${citySlug}/${article.category}/`}
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 transition-opacity hover:opacity-80"
                  style={{ backgroundColor: cat.maia_brand.bgColor, color: cat.maia_brand.color }}
                >
                  {cat.name}
                </Link>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
                <span>
                  By <strong className="text-gray-700">{article.author}</strong>
                </span>
                <span>·</span>
                <span>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span>·</span>
                <span>{article.readingTime} read</span>
                <span>·</span>
                <span className="text-teal-600 font-medium">{city.name}</span>
              </div>
            </div>

            {/* AdSense top of article */}
            <AdSense slot="6725910233" format="fluid" className="mb-8" />

            {/* MDX Content */}
            <div className="prose max-w-none">
              <MarkdownContent content={article.content} />
            </div>

            {/* Maia inline ad */}
            <MaiaAd category={article.category} variant="inline" />

            {/* AdSense bottom */}
            <AdSense slot="4141705386" format="auto" className="mt-8" />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <MaiaAd category={article.category} variant="sidebar" />
            <AdSense slot="9451156247" format="rectangle" />

            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Related articles</h3>
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="compact" />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Related articles section */}
      {relatedArticles.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-12 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              More in {cat?.name} — {city.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
