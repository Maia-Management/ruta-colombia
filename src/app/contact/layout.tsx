import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Ruta Colombia — Get in Touch',
  description:
    'Contact Ruta Colombia for advertising, editorial collaborations, or general enquiries. We are your expert Colombia travel and expat guide.',
  alternates: {
    canonical: 'https://ruta-colombia.com/contact/',
  },
  openGraph: {
    title: 'Contact Ruta Colombia',
    description: 'Get in touch with Ruta Colombia for advertising, editorial collaborations, or general enquiries.',
    url: 'https://ruta-colombia.com/contact/',
    type: 'website',
    images: [{ url: 'https://ruta-colombia.com/og-image.jpg', width: 1200, height: 630, alt: 'Contact Ruta Colombia' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RutaColombia',
    creator: '@RutaColombia',
    title: 'Contact Ruta Colombia',
    description: 'Get in touch with Ruta Colombia for advertising, editorial collaborations, or general enquiries.',
    images: ['https://ruta-colombia.com/og-image.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
