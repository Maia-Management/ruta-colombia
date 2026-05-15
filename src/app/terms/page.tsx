import type { Metadata } from 'next';
import Link from '@/components/Link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Ruta Colombia. Please review our terms and conditions before using our website.',
  alternates: {
    canonical: 'https://ruta-colombia.com/terms/',
  },
};

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
      <div className="w-16 h-1 bg-teal-500 mb-8 rounded-full" />
      <div className="prose max-w-none text-gray-700 space-y-6">
        <p className="text-sm text-gray-600">Last updated: May 2026</p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Ruta Colombia website (https://ruta-colombia.com), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">2. Service Description</h2>
        <p>
          Ruta Colombia is a travel and lifestyle guide providing informational content, travel guides, lifestyle recommendations, and resources about Colombia. The service is operated by Maia Management Group S.A.S., a company registered in Colombia.
        </p>
        <p>
          Our website offers:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Travel guides and destination information</li>
          <li>Lifestyle and cultural content</li>
          <li>Informational articles and resources</li>
          <li>Community and engagement features</li>
        </ul>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">3. Intellectual Property Rights</h2>
        <p>
          All content on the Ruta Colombia website, including but not limited to text, images, graphics, logos, and videos, is the property of Maia Management Group S.A.S. or its content suppliers and is protected by international copyright laws.
        </p>
        <p>
          You may view, print, and download content from our website for personal, non-commercial use only, provided that you retain all copyright and proprietary notices. Any other use of the content is strictly prohibited without prior written permission from Maia Management Group S.A.S.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Conduct</h2>
        <p>
          You agree not to use our website to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Violate any applicable law or regulation</li>
          <li>Infringe upon the intellectual property rights of others</li>
          <li>Harass, defame, abuse, or threaten others</li>
          <li>Transmit viruses, malware, or any harmful code</li>
          <li>Spam or send unsolicited communications</li>
          <li>Engage in unauthorized access to our systems</li>
          <li>Scrape, crawl, or systematically download content without permission</li>
          <li>Interfere with the normal operation of the website</li>
        </ul>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">5. Disclaimer of Warranties</h2>
        <p>
          <strong>Important Notice:</strong> The content provided on Ruta Colombia is for informational purposes only and should not be considered professional advice. This includes, but is not limited to, travel advice, medical information, legal information, financial advice, or business recommendations.
        </p>
        <p>
          While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any content on our website. The information may be subject to change without notice.
        </p>
        <p>
          Before making any decisions based on information from our website, please consult with appropriate professionals (travel agents, medical doctors, lawyers, financial advisors, etc.) as applicable to your situation.
        </p>
        <p>
          The website is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We disclaim all warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, in no event shall Maia Management Group S.A.S. or its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages arising from your use of or inability to use the website or content, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages.
        </p>
        <p>
          In no case shall our total liability to you exceed the amount you have paid to us through the website, if any.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites and resources. We are not responsible for the availability, accuracy, or content of these external websites. Your use of third-party websites is subject to their terms and conditions and privacy policies. We do not endorse any third-party websites or services linked from our site.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">8. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of Colombia, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the Colombian courts.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">9. Modifications to Terms</h2>
        <p>
          Maia Management Group S.A.S. reserves the right to modify these Terms of Service at any time. We will notify users of significant changes by updating the &quot;Last updated&quot; date at the top of this page. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">10. Severability</h2>
        <p>
          If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions shall remain in effect to the maximum extent permitted by law.
        </p>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at:
        </p>
        <p>
          <strong>Maia Management Group S.A.S.</strong><br />
          Colombia<br />
          Email: info@ruta-colombia.com
        </p>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Return to <Link href="/" className="text-teal-500 hover:text-teal-600">home</Link> or view our <Link href="/privacy/" className="text-teal-500 hover:text-teal-600">privacy policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
