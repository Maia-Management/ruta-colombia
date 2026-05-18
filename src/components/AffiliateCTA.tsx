// AffiliateCTA.tsx — Travelpayouts affiliate CTA block
// Usage: <AffiliateCTA type="hotels" city="Santa Marta" />
// Set NEXT_PUBLIC_TRAVELPAYOUTS_MARKER when the affiliate account is ready.

const TRAVELPAYOUTS_MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '';

interface AffiliateCTAProps {
  type: 'hotels' | 'flights' | 'car-rental' | 'tours';
  city?: string;
  className?: string;
}

const CTA_CONFIG = {
  hotels: {
    label: '🏨 Find the best hotel deals',
    description: (city: string) => `Browse top-rated hotels in ${city} — compare prices from 50+ booking sites.`,
    bgColor: '#1a3a5c',
    accentColor: '#3b82f6',
    // Travelpayouts Hotel Search Widget
    linkTemplate: (city: string) =>
      `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}&trs=233248&p=4114&u=https%3A%2F%2Fwww.hotels.com%2Fsearch%3FdestinationId%3D${encodeURIComponent(city)}`,
  },
  flights: {
    label: '✈️ Find cheap flights',
    description: (city: string) => `Search flights to ${city} — compare fares across 750+ airlines.`,
    bgColor: '#1a3a3a',
    accentColor: '#10b981',
    linkTemplate: (city: string) =>
      `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}&trs=233248&p=4114&u=https%3A%2F%2Fwww.aviasales.com%2F%3Fdestination%3D${encodeURIComponent(city)}`,
  },
  'car-rental': {
    label: '🚗 Compare car rental deals',
    description: (city: string) => `Rent a car in ${city} — compare rates from all major suppliers.`,
    bgColor: '#2a1a3a',
    accentColor: '#8b5cf6',
    linkTemplate: (city: string) =>
      `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}&trs=233248&p=4114&u=https%3A%2F%2Fwww.rentalcars.com%2FSearchResults.do%3Fcountry%3DColombia%26city%3D${encodeURIComponent(city)}`,
  },
  tours: {
    label: '🎟️ Book tours & activities',
    description: (city: string) => `Top tours and experiences in ${city} — skip the line, book online.`,
    bgColor: '#1a3a1a',
    accentColor: '#22c55e',
    linkTemplate: (city: string) =>
      `https://tp.media/r?marker=${TRAVELPAYOUTS_MARKER}&trs=233248&p=4114&u=https%3A%2F%2Fwww.viator.com%2Fsearch%2F${encodeURIComponent(city)}`,
  },
};

export default function AffiliateCTA({ type, city = 'Colombia', className = '' }: AffiliateCTAProps) {
  if (!TRAVELPAYOUTS_MARKER) return null;

  const config = CTA_CONFIG[type];
  const link = config.linkTemplate(city);

  return (
    <div
      className={`affiliate-cta my-6 rounded-xl p-5 border ${className}`}
      style={{
        background: config.bgColor,
        borderColor: config.accentColor + '40',
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p
            className="font-semibold text-base mb-1"
            style={{ color: config.accentColor }}
          >
            {config.label}
          </p>
          <p className="text-sm text-gray-300">{config.description(city)}</p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: config.accentColor }}
        >
          Compare Now →
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-3 italic">
        * This is an affiliate link. Ruta Colombia may earn a commission at no extra cost to you.
      </p>
    </div>
  );
}
