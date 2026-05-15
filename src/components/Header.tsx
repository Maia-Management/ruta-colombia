'use client';

import Link from '@/components/Link';
import { useState } from 'react';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

const primaryMedellinCategorySlugs = new Set(['real-estate', 'food-drink', 'things-to-do']);
const primaryMedellinCategories = categories.filter((cat) => primaryMedellinCategorySlugs.has(cat.slug));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <Link href="/" className="flex flex-col items-start" onClick={() => setMenuOpen(false)}>
            <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none">
              Ruta <span className="text-teal-400">Colombia</span>
            </span>
            <span className="text-xs text-gray-400 font-sans uppercase tracking-widest mt-0.5">
              Your definitive guide to living in Colombia
            </span>
          </Link>

          {/* Desktop right nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cities dropdown */}
            <div className="relative">
              <button type="button"
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                onBlur={() => setTimeout(() => setCityMenuOpen(false), 150)}
              >
                Cities
                <svg className="w-3.5 h-3.5 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {cityMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2 z-50">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}/`}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setCityMenuOpen(false)}
                    >
                      <span className="text-xs">📍</span>
                      <div>
                        <div className="font-semibold">{city.name}</div>
                        <div className="text-xs text-gray-500">{city.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about/"
              className="text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
            >
              About
            </Link>
            <a
              href="https://wa.me/19034598763?text=Hi%2C%20I%27d%20like%20the%20free%20Colombia%20Travel%20Guide%20from%20Ruta%20Colombia."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-[#075E54] text-white px-4 py-1.5 rounded-full hover:bg-[#064C44] transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.281-3.585 6.308-1.143 9.541 1.432 1.993 3.818 3.222 6.174 3.222 2.27 0 4.41-.896 6.015-2.516 3.325-3.325 3.833-8.585 1.122-12.88-.504-.692-1.223-1.322-2.031-1.793a9.87 9.87 0 00-4.107-.959zm8.717-2.096A11.885 11.885 0 0012.05 0C5.495 0 .16 5.335.16 11.905c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.687 1.448h.005c6.554 0 11.89-5.335 11.89-11.905 0-3.176-1.237-6.174-3.484-8.477z" />
              </svg>
              Free Guide
            </a>
            <Link
              href="/contact/"
              className="text-sm bg-teal-600 text-white px-4 py-1.5 rounded-full hover:bg-teal-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button type="button"
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop category nav */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-2 shrink-0">Explore:</span>
          {primaryMedellinCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/medellin/${cat.slug}/`}
              className="text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <span className="text-gray-700 mx-1">|</span>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="text-sm font-semibold text-teal-400 hover:text-teal-300 hover:bg-gray-800 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4">
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Cities</p>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/`}
                className="flex items-center gap-2 text-sm text-teal-400 font-semibold px-3 py-3 rounded-md hover:bg-gray-800 min-h-[44px]"
                onClick={() => setMenuOpen(false)}
              >
                {city.name}
              </Link>
            ))}
          </div>
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Categories</p>
            <nav className="flex flex-col gap-0.5">
              {primaryMedellinCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/medellin/${cat.slug}/`}
                  className="text-sm text-gray-300 hover:text-white px-3 py-3 rounded-md hover:bg-gray-800 min-h-[44px] flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
          <hr className="border-gray-700 my-3" />
          <Link href="/about/" className="block text-sm text-gray-400 px-3 py-3 hover:text-white min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact/" className="block text-sm text-gray-400 px-3 py-3 hover:text-white min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <a
            href="https://wa.me/19034598763?text=Hi%2C%20I%27d%20like%20the%20free%20Colombia%20Travel%20Guide%20from%20Ruta%20Colombia."
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-green-400 px-3 py-3 hover:text-green-300 min-h-[44px] flex items-center font-medium"
            onClick={() => setMenuOpen(false)}
          >
            📱 Get Free Colombia Travel Guide (WhatsApp)
          </a>
        </div>
      )}
    </header>
  );
}
