import Link from '@/components/Link';
import Image from 'next/image';
import type { ArticleMeta } from '@/lib/articles';

interface Props {
  article: ArticleMeta;
  variant?: 'default' | 'featured' | 'compact';
}

// City-specific fallback thumbnails so cards aren't visually monotonous when
// articles don't ship their own thumbnail. Falls back to the optimized hero
// otherwise so we never render the old "No image" placeholder.
const CITY_FALLBACK_IMAGES: Record<string, string> = {
  medellin: '/images/medellin-valley.webp',
  bogota: '/images/bogota-street.webp',
  cartagena: '/images/cartagena-street.webp',
  'santa-marta': '/images/tayrona-beach.webp',
};

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const href = `/${article.city}/${article.category}/${article.slug}/`;
  const isCompact = variant === 'compact';
  const thumbnailSrc =
    article.thumbnail ||
    CITY_FALLBACK_IMAGES[article.city] ||
    '/images/colombia-hero-optimized.webp';

  return (
    <article className={`group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full ${isCompact ? 'mb-4 last:mb-0' : ''}`}>
      {/* ── Thumbnail ──────────────────────────────────────────────────────────
          FIX: Wrap the image in a fixed-height container with:
            - position: relative  (required for next/image fill layout)
            - overflow: hidden    (clips the image to the rounded corners)
            - bg-gray-200         (placeholder colour shown while loading or
                                   if the src 404s — replaces the broken icon)
          next/image handles object-fit: cover automatically when fill is used.
          loading="lazy" is next/image's default for non-priority images.
          alt text describes the article content for screen readers.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className={`relative w-full overflow-hidden bg-gray-200 ${
          variant === 'featured' ? 'h-52' : isCompact ? 'h-32' : 'h-44'
        }`}
      >
        <Image
          src={thumbnailSrc}
          alt={`Cover image for: ${article.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category badge — overlaid on the image */}
        {article.category && (
          <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {article.category}
          </span>
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────────────────── */}
      <div className={`flex flex-col flex-1 ${isCompact ? 'p-4' : 'p-5'}`}>
        {/* City tag */}
        {article.city && (
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1.5">
            {article.city.replace('-', ' ')}
          </span>
        )}

        <h3 className={`font-serif font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors ${isCompact ? 'text-base' : 'text-lg'}`}>
          <Link href={href} className="hover:underline">
            {article.title}
          </Link>
        </h3>

        {article.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          {article.date && (
            <time
              dateTime={article.date}
              className="text-xs text-gray-600"
            >
              {new Date(article.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          )}
          <Link
            href={href}
            className="text-xs font-semibold text-teal-700 hover:text-teal-600 transition-colors ml-auto"
            aria-label={`Read more: ${article.title}`}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
