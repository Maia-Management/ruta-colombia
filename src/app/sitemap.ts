import { MetadataRoute } from 'next';
import { getAllArticlesByCity } from '@/lib/articles';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruta-colombia.com';

  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const cityCategoryUrls = cities.flatMap((city) => {
    const availableCategorySlugs = new Set(getAllArticlesByCity(city.slug).map((article) => article.category));
    return categories
      .filter((cat) => availableCategorySlugs.has(cat.slug))
      .map((cat) => ({
        url: `${baseUrl}/${city.slug}/${cat.slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  });

  const articleUrls = cities.flatMap((city) =>
    getAllArticlesByCity(city.slug)
      .filter((article) => !article.canonicalUrl)
      .map((article) => ({
        url: `${baseUrl}/${city.slug}/${article.category}/${article.slug}/`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/tools/budget-calculator/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/city-comparison/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...cityUrls,
    ...cityCategoryUrls,
    ...articleUrls,
  ];
}
