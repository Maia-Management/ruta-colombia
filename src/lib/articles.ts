import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMeta {
  slug: string;
  city: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  featured?: boolean;
  tags?: string[];
  thumbnail?: string;
  metaTitle?: string;
  metaDescription?: string;
  lang?: string;
  canonicalUrl?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

function readArticlesFromDir(dir: string, city: string): ArticleMeta[] {
  if (!fs.existsSync(dir)) return [];
  const fileNames = fs.readdirSync(dir);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        city,
        category: data.category || '',
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        author: data.author || 'Ruta Colombia',
        readingTime: data.readingTime || '5 min',
        featured: data.featured || false,
        tags: data.tags || [],
        thumbnail: data.thumbnail || '',
        metaTitle: data.metaTitle || data.title,
        metaDescription: data.metaDescription || data.excerpt,
        lang: data.lang || undefined,
        canonicalUrl: data.canonicalUrl || undefined,
      } as ArticleMeta;
    });
}

export function getAllArticlesByCity(city: string): ArticleMeta[] {
  const cityDir = path.join(articlesDirectory, city);
  return readArticlesFromDir(cityDir, city).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticlesByCityAndCategory(city: string, category: string): ArticleMeta[] {
  return getAllArticlesByCity(city).filter((a) => a.category === category);
}

export function getArticleByCityAndSlug(city: string, slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, city, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    city,
    category: data.category || '',
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    author: data.author || 'Ruta Colombia',
    readingTime: data.readingTime || '5 min',
    featured: data.featured || false,
    tags: data.tags || [],
    thumbnail: data.thumbnail || '',
    metaTitle: data.metaTitle || data.title,
    metaDescription: data.metaDescription || data.excerpt,
    lang: data.lang || undefined,
    canonicalUrl: data.canonicalUrl || undefined,
    content,
  };
}

export function getFeaturedArticlesByCity(city: string): ArticleMeta[] {
  return getAllArticlesByCity(city).filter((a) => a.featured);
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  const items = fs.readdirSync(articlesDirectory);
  const cityDirs = items.filter((item) => {
    const itemPath = path.join(articlesDirectory, item);
    return fs.statSync(itemPath).isDirectory();
  });
  return cityDirs
    .flatMap((city) => readArticlesFromDir(path.join(articlesDirectory, city), city))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllArticleStaticParams(): { city: string; category: string; slug: string }[] {
  return getAllArticles().map((a) => ({ city: a.city, category: a.category, slug: a.slug }));
}
