'use client';

import { useEffect } from 'react';

const CONSENT_KEY = 'ruta-colombia-consent';
const GA_ID = 'G-8B5225MXE5';
const ADSENSE_CLIENT = 'ca-pub-2469196723812841';

type ConsentState = {
  ad_storage?: boolean;
  analytics_storage?: boolean;
  ad_user_data?: boolean;
  ad_personalization?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: unknown[];
    MaiaConsent?: {
      getConsent?: () => ConsentState;
    };
  }
}

function getConsent(): ConsentState {
  if (typeof window === 'undefined') return {};

  const apiConsent = window.MaiaConsent?.getConsent?.();
  if (apiConsent) return apiConsent;

  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function loadScript(id: string, src: string, attrs: Record<string, string> = {}) {
  if (document.getElementById(id)) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function applyGoogleConsent(consent: ConsentState) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtagShim(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag('consent', 'update', {
    ad_storage: consent.ad_storage ? 'granted' : 'denied',
    analytics_storage: consent.analytics_storage ? 'granted' : 'denied',
    ad_user_data: consent.ad_user_data ? 'granted' : 'denied',
    ad_personalization: consent.ad_personalization ? 'granted' : 'denied',
  });
}

export default function ConsentScripts() {
  useEffect(() => {
    let cancelled = false;

    const loadAllowedScripts = () => {
      const consent = getConsent();
      applyGoogleConsent(consent);

      if (consent.analytics_storage) {
        loadScript('ruta-ga4', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
          .then(() => {
            if (cancelled) return;
            window.gtag?.('js', new Date());
            window.gtag?.('config', GA_ID, { anonymize_ip: true });
          })
          .catch(() => {});
      }

      if (consent.ad_storage) {
        loadScript(
          'ruta-adsense',
          `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
          { crossorigin: 'anonymous' },
        )
          .then(() => {
            if (!cancelled) window.dispatchEvent(new CustomEvent('ruta-adsense-ready'));
          })
          .catch(() => {});
      }
    };

    loadAllowedScripts();

    window.addEventListener('ruta-consent-updated', loadAllowedScripts);
    window.addEventListener('storage', loadAllowedScripts);

    return () => {
      cancelled = true;
      window.removeEventListener('ruta-consent-updated', loadAllowedScripts);
      window.removeEventListener('storage', loadAllowedScripts);
    };
  }, []);

  return null;
}
