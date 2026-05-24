import Link from '@/components/Link';
import AdSense from '@/components/AdSense';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

const primaryMedellinCategorySlugs = new Set(['real-estate', 'food-drink', 'things-to-do']);
const primaryMedellinCategories = categories.filter((cat) => primaryMedellinCategorySlugs.has(cat.slug));

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 mt-16">
      {/* Ad slot */}
      <div className="bg-gray-900 py-4 text-center border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <AdSense slot="9202460373" format="horizontal" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white font-serif font-bold text-xl mb-3">
              Ruta <span className="text-teal-400">Colombia</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your definitive guide to living, working, investing, and exploring Colombia — written by local experts.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Part of the{' '}
              <a
                href="https://the-maia-group.com"
                className="text-teal-400 hover:text-teal-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Maia Group
              </a>{' '}
              ecosystem.
            </p>
          </div>

          {/* Cities */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Cities</h4>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}/`}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/venezuela/" className="text-sm text-gray-500 hover:text-yellow-400 transition-colors italic">
                  Venezuela ↗ (coming soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2">
              {primaryMedellinCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/medellin/${cat.slug}/`}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maia Group + Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Maia Group</h4>
            <ul className="space-y-2 mb-6">
              {[
                { name: 'Maia Realty', url: 'https://maia-realty.com' },
                { name: 'Maia Legal', url: 'https://maia-legal.com' },
                { name: 'Maia Management', url: 'https://maia-management.com' },
                { name: 'Mapaná Marine', url: 'https://mapana-marine.com' },
                { name: 'Be Vida', url: 'https://be-vida.com' },
                { name: 'El Sanatorio', url: 'https://el-sanatorio.com' },
                { name: 'LlevaLleva', url: 'https://lleva-lleva.com' },
              ].map((brand) => (
                <li key={brand.name}>
                  <a
                    href={brand.url}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about/" className="hover:text-teal-400 transition-colors">About us</Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-teal-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Santa Marta hospitality callout */}
        <div className="border-t border-gray-800 mt-8 pt-6 pb-4 text-center">
          <p className="text-xs text-gray-500">
            While you&apos;re in Santa Marta —{' '}
            <a href="https://el-sanatorio.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
              El Sanatorio
            </a>
            {' '}(yakitori bar &amp; immersive horror experience) ·{' '}
            <a href="https://be-vida.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
              Be Vida
            </a>
            {' '}(premium craft cocktails)
          </p>
        </div>

        <div className="border-t border-gray-800 pt-6 space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            © {year} Ruta Colombia. Ruta Colombia is part of the Maia ecosystem and operates under{' '}
            <a
              href="https://maia-management.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              Maia Management S.A.S.
            </a>{' '}
            — NIT 901.862.977-7 — Santa Marta, Colombia. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-xs text-gray-500">
              Work with us →{' '}
              <a href="https://maia-management.com/empleo.html" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
                Join the Maia team
              </a>
            </p>
            <p className="text-xs text-gray-500">
              Privacy:{' '}
              <a href="mailto:privacy@maia-management.com" className="text-teal-400 hover:text-teal-300 transition-colors">
                privacy@maia-management.com
              </a>
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="/privacy/" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms/" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
