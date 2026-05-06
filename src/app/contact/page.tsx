import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Ruta Colombia',
  description:
    'Get in touch with Ruta Colombia for advertising, editorial collaboration, content corrections, or general questions about Colombia travel and expat life.',
  alternates: {
    canonical: 'https://ruta-colombia.com/contact/',
  },
  openGraph: {
    title: 'Contact Ruta Colombia',
    description:
      'Get in touch with Ruta Colombia for advertising, editorial collaboration, or content corrections.',
    url: 'https://ruta-colombia.com/contact/',
    type: 'website',
    images: [{ url: 'https://ruta-colombia.com/og-image.jpg', width: 1200, height: 630, alt: 'Contact Ruta Colombia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Ruta Colombia',
    description: 'Get in touch with Ruta Colombia.',
    images: ['https://ruta-colombia.com/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Contact</h1>
      <div className="w-16 h-1 bg-teal-500 mb-8 rounded-full" />

      <p className="text-gray-600 text-lg mb-10">
        Have a question, collaboration proposal, or want to advertise with us? We would love to hear
        from you.
      </p>

      <ContactForm />
    </div>
  );
}
