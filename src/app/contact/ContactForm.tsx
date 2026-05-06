'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      );
    }
  }

  return (
    <>
      {status === 'success' && (
        <div
          role="alert"
          className="mb-8 rounded-lg bg-green-50 border border-green-300 px-5 py-4 text-green-800 font-medium"
        >
          ✓ Thanks! Your message has been sent. We&apos;ll be in touch soon.
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="mb-8 rounded-lg bg-red-50 border border-red-300 px-5 py-4 text-red-800 font-medium"
        >
          ✗ {errorMessage || 'Something went wrong. Please try again.'}
        </div>
      )}

      {status !== 'success' && (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-gray-700 mb-1.5"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="subject"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select a subject</option>
              <option value="advertising">Advertising / Sponsorship</option>
              <option value="collaboration">Editorial collaboration</option>
              <option value="correction">Content correction</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1.5"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Tell us how we can help..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </>
  );
}
