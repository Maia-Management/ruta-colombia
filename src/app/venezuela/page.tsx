'use client';

import Link from '@/components/Link';

export default function VenezuelaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            Venezuela
          </h1>
          <p className="text-2xl text-teal-400 font-semibold">Coming Soon</p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-8 md:p-12 mb-8 border border-gray-700">
          <p className="text-gray-300 text-lg mb-6">
            We're working on a comprehensive guide to living in Venezuela, covering cost of living, neighborhoods, visa information, and everything you need to know to make Venezuela your home.
          </p>

          <p className="text-gray-400 text-base mb-8">
            Check back soon for detailed guides, travel tips, and practical advice from those living in Venezuela.
          </p>

          <div className="bg-teal-600 bg-opacity-10 border border-teal-500 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-3">Get notified when the Venezuela guide launches:</p>
            <a
              href="https://wa.me/573195962773?text=I'd%20like%20to%20be%20notified%20when%20the%20Venezuela%20guide%20is%20available"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-500 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.281-3.585 6.308-1.143 9.541 1.432 1.993 3.818 3.222 6.174 3.222 2.27 0 4.41-.896 6.015-2.516 3.325-3.325 3.833-8.585 1.122-12.88-.504-.692-1.223-1.322-2.031-1.793a9.87 9.87 0 00-4.107-.959zm8.717-2.096A11.885 11.885 0 0012.05 0C5.495 0 .16 5.335.16 11.905c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.687 1.448h.005c6.554 0 11.89-5.335 11.89-11.905 0-3.176-1.237-6.174-3.484-8.477z" />
              </svg>
              Notify Me on WhatsApp
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            <p>In the meantime, explore our guides for other countries:</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/colombia/" className="text-teal-400 hover:text-teal-300 underline">
                Colombia
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/medellin/" className="text-teal-400 hover:text-teal-300 underline">
                Medellín
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/bogota/" className="text-teal-400 hover:text-teal-300 underline">
                Bogotá
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/cartagena/" className="text-teal-400 hover:text-teal-300 underline">
                Cartagena
              </Link>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
  