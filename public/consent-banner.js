/**
 * Consent Banner - Ruta Colombia
 * GDPR + Ley 1581 de 2012 (Colombia) compliance
 * Company: MAIA MANAGEMENT S.A.S. — NIT 901.862.977-7
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'ruta-colombia-consent';
  const BANNER_ID = 'ruta-colombia-consent-banner';
  const DEFAULT_CONSENT = {
    ad_storage: false,
    analytics_storage: false,
    ad_user_data: false,
    ad_personalization: false,
    timestamp: new Date().toISOString()
  };

  class ConsentBanner {
    constructor() {
      this.consent = this.loadConsent();
      this.setupGTM();
      this.maybeShowBanner();
    }

    loadConsent() {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return { ...DEFAULT_CONSENT };
        }
      }
      return { ...DEFAULT_CONSENT };
    }

    saveConsent() {
      this.consent.timestamp = new Date().toISOString();
      localStorage.setItem(CONSENT_KEY, JSON.stringify(this.consent));
    }

    announceConsent() {
      window.dispatchEvent(new CustomEvent('ruta-consent-updated', {
        detail: { ...this.consent }
      }));
    }

    setupGTM() {
      if (typeof window.gtag === 'undefined') {
        return;
      }
      window.gtag('consent', 'default', {
        ad_storage: this.consent.ad_storage ? 'granted' : 'denied',
        analytics_storage: this.consent.analytics_storage ? 'granted' : 'denied',
        ad_user_data: this.consent.ad_user_data ? 'granted' : 'denied',
        ad_personalization: this.consent.ad_personalization ? 'granted' : 'denied'
      });
    }

    updateConsent(settings) {
      this.consent = { ...this.consent, ...settings };
      this.saveConsent();
      this.setupGTM();
      this.announceConsent();
    }

    maybeShowBanner() {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        this.showBanner();
      }
    }

    showBanner() {
      if (document.getElementById(BANNER_ID)) {
        return;
      }

      const banner = document.createElement('div');
      banner.id = BANNER_ID;
      banner.innerHTML = `
        <div class="consent-banner-overlay"></div>
        <div class="consent-banner-content">
          <div class="consent-banner-header">
            <h2>Preferencias de Privacidad</h2>
            <p>Usamos tecnologías como cookies para almacenar y acceder a información de dispositivos, garantizar calidad de contenido y publicidad personalizada, medir rendimiento y analizar datos de tráfico. Puedes cambiar tus preferencias en cualquier momento visitando nuestras <a href="/privacy/" target="_blank">políticas de privacidad</a>.</p>
          </div>

          <div class="consent-banner-customization" id="consent-customization" style="display: none;">
            <div class="consent-option">
              <label>
                <input type="checkbox" class="consent-toggle" data-type="ad_storage">
                <span>Almacenamiento de Publicidad</span>
              </label>
              <p class="consent-desc">Permite el almacenamiento de cookies para publicidad dirigida.</p>
            </div>
            <div class="consent-option">
              <label>
                <input type="checkbox" class="consent-toggle" data-type="analytics_storage">
                <span>Almacenamiento de Analítica</span>
              </label>
              <p class="consent-desc">Permite recopilar datos anónimos sobre cómo usas el sitio.</p>
            </div>
            <div class="consent-option">
              <label>
                <input type="checkbox" class="consent-toggle" data-type="ad_user_data">
                <span>Datos de Usuario para Publicidad</span>
              </label>
              <p class="consent-desc">Permite enviar datos de usuario a plataformas publicitarias.</p>
            </div>
            <div class="consent-option">
              <label>
                <input type="checkbox" class="consent-toggle" data-type="ad_personalization">
                <span>Personalización de Publicidad</span>
              </label>
              <p class="consent-desc">Permite mostrar publicidad personalizada según tus intereses.</p>
            </div>
          </div>

          <div class="consent-banner-footer">
            <small>
              <strong>Cumplimiento Legal:</strong> Ley 1581 de 2012 (Protección de Datos en Colombia)
              <br/>MAIA MANAGEMENT S.A.S. — NIT 901.862.977-7
              <br/>Calle 24 #3-99, Edificio Banco de Bogotá, Suite 1102, Level 11, Santa Marta
            </small>
          </div>

          <div class="consent-banner-actions">
            <button id="consent-customize-btn" class="consent-btn consent-btn-secondary">
              Personalizar
            </button>
            <button id="consent-reject-btn" class="consent-btn consent-btn-secondary">
              Rechazar
            </button>
            <button id="consent-accept-btn" class="consent-btn consent-btn-primary">
              Aceptar todo
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(banner);
      this.attachBannerListeners();
    }

    attachBannerListeners() {
      const banner = document.getElementById(BANNER_ID);
      const customizeBtn = banner.querySelector('#consent-customize-btn');
      const rejectBtn = banner.querySelector('#consent-reject-btn');
      const acceptBtn = banner.querySelector('#consent-accept-btn');
      const customization = banner.querySelector('#consent-customization');
      const toggles = banner.querySelectorAll('.consent-toggle');

      customizeBtn.addEventListener('click', () => {
        customization.style.display = customization.style.display === 'none' ? 'block' : 'none';
        if (customization.style.display === 'block') {
          this.updateToggles(banner);
        }
      });

      rejectBtn.addEventListener('click', () => {
        this.updateConsent({
          ad_storage: false,
          analytics_storage: false,
          ad_user_data: false,
          ad_personalization: false
        });
        this.hideBanner();
      });

      acceptBtn.addEventListener('click', () => {
        if (customization.style.display === 'block') {
          const settings = {};
          toggles.forEach(toggle => {
            settings[toggle.dataset.type] = toggle.checked;
          });
          this.updateConsent(settings);
        } else {
          this.updateConsent({
            ad_storage: true,
            analytics_storage: true,
            ad_user_data: true,
            ad_personalization: true
          });
        }
        this.hideBanner();
      });

      toggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
          const settings = {};
          toggles.forEach(t => {
            settings[t.dataset.type] = t.checked;
          });
          this.updateConsent(settings);
        });
      });
    }

    updateToggles(banner) {
      const toggles = banner.querySelectorAll('.consent-toggle');
      toggles.forEach(toggle => {
        toggle.checked = this.consent[toggle.dataset.type] || false;
      });
    }

    hideBanner() {
      const banner = document.getElementById(BANNER_ID);
      if (banner) {
        banner.style.opacity = '0';
        banner.style.pointerEvents = 'none';
        setTimeout(() => {
          banner.remove();
        }, 300);
      }
    }

    reopenBanner() {
      const existing = document.getElementById(BANNER_ID);
      if (existing) {
        existing.remove();
      }
      this.showBanner();
    }
  }

  const banner = new ConsentBanner();

  window.MaiaConsent = {
    reopenBanner() {
      banner.reopenBanner();
    },
    getConsent() {
      return { ...banner.consent };
    },
    updateConsent(settings) {
      banner.updateConsent(settings);
    }
  };

  banner.announceConsent();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      banner.maybeShowBanner();
    });
  }
})();
