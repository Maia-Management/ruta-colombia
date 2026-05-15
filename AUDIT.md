# Ruta Colombia — Full Site Audit
**Date:** 2026-05-15  
**Auditor:** Maia Cowork  
**Scope:** SEO · WhatsApp/phone · Broken links · Placeholders · Images · Mobile · A11y · Ecosystem · robots.txt · Sitemap · Secrets  
**Repo:** `C:\Users\ajsga\Desktop\Maia Web-Sites Folder\ruta-colombia`

---

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| P0 — Critical (breaking / revenue) | 3 | ❌ Fix immediately |
| P1 — High (SEO damage / broken UX) | 8 | ⚠️ Fix this sprint |
| P2 — Medium (quality / correctness) | 9 | 🔶 Fix next sprint |
| P3 — Low (housekeeping) | 6 | 🔵 Backlog |

**Health score: 6.0 / 10**  
Solid foundation — clean architecture, correct WhatsApp numbers, good security headers, proper 301 redirects. Dragged down by one invisible conversion CTA on mobile, broken affiliate links, 3 pairs of near-duplicate articles, and a stale legacy file layer under the live app.

---

## P0 — Critical

### P0-1 · WhatsApp FAB invisible on all mobile screens
**File:** `src/app/layout.tsx:117`  
**Issue:** The floating WhatsApp button uses `hidden sm:flex`. The `sm:` breakpoint is 640 px — below that the button is `display:none`. Mobile traffic is typically 60-70% of a travel site's visitors; they never see the primary conversion CTA.  
**Fix:** Change `hidden sm:flex` → `flex`. If you want a different position on small screens, use responsive sizing, not `hidden`.

```tsx
// Before
className="hidden sm:flex fixed bottom-6 right-5 z-50 ..."

// After
className="flex fixed bottom-5 right-4 sm:bottom-6 sm:right-5 z-50 ..."
```

---

### P0-2 · AffiliateCTA — all affiliate links contain literal placeholder `TRAVELPAYOUTS_MARKER`
**File:** `src/components/AffiliateCTA.tsx:18,26,34,42`  
**Issue:** Every affiliate link type (hotels, flights, car-rental, tours) generates a URL containing the string `TRAVELPAYOUTS_MARKER`. Anyone who clicks "Compare Now" lands on a broken or generic Travelpayouts page. There is zero affiliate revenue being earned.  
**Fix:** Either replace with your real Travelpayouts marker ID once your account is set up, or suppress the component (`return null`) until it's live so you don't surface broken links to users or Google.

```tsx
// Current (broken)
`https://tp.media/r?marker=TRAVELPAYOUTS_MARKER&...`

// Fix option A — real marker
const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? '';
if (!MARKER) return null; // suppress until configured

// Fix option B — env var in .env.local / Netlify env vars
NEXT_PUBLIC_TRAVELPAYOUTS_MARKER=your_real_marker_id
```

---

### P0-3 · Venezuela "coming soon" page is fully indexed
**File:** `src/app/venezuela/page.tsx`  
**Issue:** The page has no `robots` metadata. Next.js defaults to `index: true, follow: true`. A stub "Coming Soon" page with thin content being crawled and indexed is a quality signal negative for the whole domain.  
**Fix:** Add `noindex` to the page metadata.

```tsx
export const metadata: Metadata = {
  title: 'Venezuela Travel Guide — Coming Soon | Ruta Colombia',
  robots: { index: false, follow: false },
  // ...rest unchanged
};
```

---

## P1 — High

### P1-1 · Three pairs of near-duplicate article URLs — no canonical disambiguation
**Files:**
- `src/content/articles/medellin/best-neighborhoods-medellin-expats.mdx` + `best-neighbourhoods-medellin.mdx`
- `src/content/articles/bogota/best-neighborhoods-bogota-expats.mdx` + `best-neighbourhoods-bogota.mdx`
- `src/content/articles/cartagena/best-neighborhoods-cartagena.mdx` + `best-neighbourhoods-cartagena.mdx`

**Issue:** Six articles in three cities cover near-identical topics at overlapping URLs. Google sees two pages per city targeting "best neighbourhoods in [city]" with no canonical pointing from one to the other. This causes keyword cannibalization and dilutes link equity. Both versions are live in `out/` and both will be indexed.  
**Fix:** Decide which slug is canonical for each city (prefer the `best-neighbourhoods-*` form as it's more specific). Add `alternates.canonical` to the non-canonical page pointing to the canonical. Long-term: merge content and 301 the duplicate.

```tsx
// In the non-canonical article's frontmatter or via generateMetadata override
alternates: { canonical: 'https://ruta-colombia.com/medellin/real-estate/best-neighbourhoods-medellin/' }
```

---

### P1-2 · `colombia` pseudo-city articles missing from sitemap
**Files:** `src/content/articles/colombia/` (8 articles) · `src/app/sitemap.ts`  
**Issue:** Eight national-level articles (`banking-colombia-expats`, `taxes-expats-colombia`, `sim-card-colombia`, etc.) are built into `out/colombia/` and are live. But `colombia` is not in `src/lib/cities.ts`, so `sitemap.ts` never iterates over them. All 8 URLs are orphaned from the sitemap — Google may not find or prioritise them.  
**Also:** `/colombia/` city index page returns 404 (the `[city]/page.tsx` `notFound()` fires because `colombia` isn't in `cities.ts`).  
**Fix option A:** Add `colombia` as a pseudo-city entry in `cities.ts` with a suitable `name`/`description`, and add `/colombia/` to sitemap manually.  
**Fix option B:** Add the colombia article URLs explicitly to `sitemap.ts`:

```ts
// sitemap.ts — add after articleUrls
const colombiaArticleUrls = getAllArticlesByCity('colombia').map((article) => ({
  url: `${baseUrl}/colombia/${article.category}/${article.slug}/`,
  lastModified: new Date(article.date),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));
```

---

### P1-3 · BOM characters + mixed line endings in key source files
**Files:** `src/app/layout.tsx` · `src/components/Header.tsx`  
**Issue:** Both files are `UTF-8 with BOM` and have mixed `CRLF + LF` line endings. The BOM (`﻿`) prepended to a TSX module can cause subtle parser issues in some Node/toolchain versions, and the mixed endings can produce noisy git diffs and break some CI linters.  
**Fix:**

```bash
# Strip BOM and normalise to LF
sed -i 's/\r//' src/app/layout.tsx src/components/Header.tsx
# In VS Code: Change Encoding → Save with UTF-8 (no BOM); Change Line Sequence → LF
# Add .editorconfig to enforce going forward
```

---

### P1-4 · `images: { unoptimized: true }` — no image compression at all
**File:** `next.config.mjs:10`  
**Issue:** `unoptimized: true` disables Next.js image optimisation globally. This is common for static exports (Next can't serve optimised images without a server), but it means every `<Image>` component outputs the raw source file — no WebP conversion, no srcset, no lazy-load sizing. Combine with the two oversized PNGs below and you have a real LCP problem.  
**Fix (static export context):** Add `sharp` as a build-time optimiser, or pre-compress all images to WebP manually. Ensure the `colombia-hero.png` (2.0 MB) and `santa-marta-travel.png` (2.4 MB) are converted and the PNG originals removed (see P1-5).

---

### P1-5 · Oversized unoptimised images in `public/images/`
**Files:**
- `public/images/santa-marta-travel.png` — **2.4 MB** (not referenced in any TSX/HTML source — appears to be a legacy file)
- `public/images/colombia-hero.png` — **2.0 MB** (the `.webp` version at 271 KB is what `page.tsx:68` references)

**Issue:** Both PNG files are served from `public/` (Cache-Control is set to 1 year, so they'll be cached but the first load is brutal). The `.png` files inflate the deploy bundle and first-visit bandwidth with no benefit.  
**Fix:**
- Delete `santa-marta-travel.png` (it is not referenced anywhere in source code).
- Delete `colombia-hero.png` — the `.webp` version is already in use.
- While here, also check that `medellin-valley.jpg` (257 KB), `tayrona-beach.jpg` (306 KB), etc., have WebP alternatives or are run through `squoosh`/`imagemin` to reduce sizes.

---

### P1-6 · ArticleSchema publisher logo is the OG hero image, not a logo
**File:** `src/components/SchemaOrg.tsx:30`  
**Issue:** `publisher.logo.url` is set to `https://ruta-colombia.com/og-image.jpg` (1200×630 landscape photo). Google's Rich Results requirements for Article structured data state the logo must be ≤60 px tall, ≤600 px wide, in a format that doesn't distort a logo-shaped object. Using the hero image here means Articles will fail Google's logo check in Rich Results Test.  
**Fix:** Create a proper logo image (e.g., `public/logo-ruta-colombia.png` at 600×60 or similar), upload it, and update:

```ts
logo: {
  '@type': 'ImageObject',
  url: 'https://ruta-colombia.com/logo-ruta-colombia.png',
  width: 600,
  height: 60,
},
```

---

### P1-7 · `tools/budget-calculator` page missing from sitemap
**File:** `src/app/sitemap.ts`  
**Issue:** `out/tools/budget-calculator/index.html` exists and is a full interactive page, but `sitemap.ts` has no entry for `/tools/budget-calculator/`. Google may not discover it.  
**Fix:** Add to `sitemap.ts`:

```ts
{ url: `${baseUrl}/tools/budget-calculator/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
```

---

### P1-8 · Static `sitemap.xml` in repo root is a confusing stale artefact
**File:** `sitemap.xml` (root, 2,851 bytes, dated 2026-05-02)  
**Issue:** This file contains only 14 old `blog/` URLs (all of which are now 301-redirected). The real sitemap is generated by Next.js and lives in `out/sitemap.xml` (18,873 bytes, 100+ URLs). Since Netlify publishes from `out/`, the correct sitemap is served. However the root `sitemap.xml` creates confusion for maintainers and risks being accidentally deployed if the build config ever changes.  
**Fix:** Delete `sitemap.xml` from the repo root. The source of truth is `src/app/sitemap.ts`.

---

## P2 — Medium

### P2-1 · hreflang alternates both point to the same English URL
**File:** `src/app/layout.tsx:47-51`  
**Issue:**
```ts
alternates: {
  canonical: 'https://ruta-colombia.com',
  languages: {
    'en': 'https://ruta-colombia.com',
    'es': 'https://ruta-colombia.com',   // ← same URL
  },
},
```
Both `en` and `es` point to the identical URL. This is not how hreflang works — it tells Google that the same page is available in two languages at two different URLs. If there's no separate Spanish version of the app, remove the `languages` block entirely. If Spanish content is intended (some articles and the legacy `index.html` were in Spanish), a proper `x-default` + language strategy is needed.  
**Fix (simple):** Remove the `languages` block from `layout.tsx` metadata. Keep per-page `alternates.canonical` only.

---

### P2-2 · WebSite schema SearchAction points to a non-functional URL
**File:** `src/components/SchemaOrg.tsx:75-80`  
**Issue:** `potentialAction.target.urlTemplate` is `https://ruta-colombia.com/medellin/things-to-do/?q={search_term_string}`. The site has no search functionality — there's no search results page at that URL. Google may attempt to surface a sitelinks search box and send users to a 404.  
**Fix:** Remove the `potentialAction` block from `WebSiteSchema` until a real search page exists.

---

### P2-3 · Consent banner language is Spanish on an English-first site
**File:** `consent-banner.js`  
**Issue:** All consent banner copy (`"Preferencias de Privacidad"`, `"Aceptar todas"`, etc.) is in Spanish. The site's primary language is English (`<html lang="en">`). English-speaking visitors will encounter an unexplained Spanish privacy overlay.  
**Fix:** Translate consent banner strings to English. If bilingual support is needed, detect `navigator.language` and serve the appropriate string set.

---

### P2-4 · Root `index.html` (Spanish legacy page) never served — should be removed
**File:** `index.html` (root, 134 KB, `lang="es"`)  
**Issue:** Netlify publishes from `out/`. This root-level HTML file is never served in production. It's a legacy Spanish static page with its own separate schema, GA4 tag, and CSS imports referencing `/css/shared.css` and `/css/home.css`. It creates confusion when reading the codebase and bloats the repo (134 KB).  
**Fix:** Delete `index.html` from the repo root. Ensure `blog/` directory (13 HTML files) is also cleaned up — these are covered by Netlify redirects and never served.

---

### P2-5 · About page missing ecosystem brands: El Sanatorio, Maia Management
**File:** `src/app/about/page.tsx`  
**Issue:** The About page ecosystem list includes Maia Realty, Maia Legal, Mapaná Marine, Be Vida, and LlevaLleva — but omits El Sanatorio and Maia Management, which are linked in the footer. Inconsistency weakens the cross-linking story.  
**Fix:** Add both brands to the ecosystem `<ul>` in `about/page.tsx`:

```tsx
<li><a href="https://el-sanatorio.com" ...><strong>El Sanatorio</strong></a> — Yakitori bar & immersive horror experience, Santa Marta</li>
<li><a href="https://maia-management.com" ...><strong>Maia Management</strong></a> — Operational & HR services across the Maia Group</li>
```

---

### P2-6 · `globals.css.bak` committed to source
**File:** `src/app/globals.css.bak`  
**Issue:** A backup CSS file is tracked in git. It has no build purpose and could create confusion about which CSS is authoritative.  
**Fix:** `git rm src/app/globals.css.bak` and add `*.bak` to `.gitignore`.

---

### P2-7 · OG locale only `en_US` — Spanish-language articles have no locale hint
**File:** `src/app/layout.tsx:55` · `src/app/[city]/page.tsx` · `src/app/[city]/[category]/[slug]/page.tsx`  
**Issue:** All pages declare `locale: 'en_US'` in OpenGraph metadata. Several articles are written in Spanish (e.g., `visa-para-vivir-en-colombia`, `guia-parque-tayrona`, `costo-de-vida-santa-marta-2026`, `mejores-restaurantes-santa-marta`). Facebook/WhatsApp will display these with English locale metadata. For Spanish articles, `locale` should be `es_CO`.  
**Fix:** In `generateMetadata` for the article page, detect the article's language (add a `lang` frontmatter field) and set `openGraph.locale` accordingly.

---

### P2-8 · `next` package version is non-standard (`^16.2.6` — does not exist)
**File:** `package.json:16`  
**Issue:** `"next": "^16.2.6"` — as of May 2026 Next.js is on the 14/15 track; version 16 does not exist as a stable release. The installed version in `node_modules` may be different. Verify the actual installed version and pin correctly.  
**Fix:** Run `npx next --version` in the project and update `package.json` to match. Lock with `package-lock.json`.

---

### P2-9 · No `<link rel="search">` / OpenSearch description
**File:** `src/app/layout.tsx` (head)  
**Issue:** Minor, but if a real search is ever added, browsers and toolbars won't autodiscover it without an OpenSearch description file. Low priority but worth noting alongside P2-2.

---

## P3 — Low / Housekeeping

### P3-1 · `public/images/colombia-hero.png` (2.0 MB) is unused
**File:** `public/images/colombia-hero.png`  
**Issue:** `src/app/page.tsx:68` references `/images/colombia-hero.webp` (271 KB). The `.png` original is never referenced in any source file but is included in the deploy bundle.  
**Fix:** `git rm public/images/colombia-hero.png` — saves 2 MB from the deploy.

---

### P3-2 · `public/images/santa-marta-travel.png` (2.4 MB) is unreferenced
**File:** `public/images/santa-marta-travel.png`  
**Issue:** Not referenced in any TSX, HTML, or CSS file in the repo. Dead asset.  
**Fix:** `git rm public/images/santa-marta-travel.png` — saves 2.4 MB from the deploy.

---

### P3-3 · Mixed CRLF+LF line endings in source files
**Files:** `src/app/layout.tsx` · `src/components/Header.tsx`  
**Issue:** Both files have mixed Windows (CRLF) and Unix (LF) line endings, confirmed by `file` command output. This causes noisy diffs and can confuse `prettier` / ESLint in strict mode.  
**Fix:** Add `.editorconfig` to project root if not present, set `end_of_line = lf`, and run `git config core.autocrlf false` locally.

---

### P3-4 · Footer "Maia Group" column has inconsistent brand ordering vs About page
**File:** `src/components/Footer.tsx:66-74`  
**Issue:** Footer ecosystem list order: Maia Realty, Maia Legal, Maia Management, Mapaná Marine, Be Vida, El Sanatorio, LlevaLleva. About page order is different and missing two brands. Keeping them consistent aids brand recognition.  
**Fix:** Align the order and brand list between `Footer.tsx` and `about/page.tsx` (see P2-5).

---

### P3-5 · `blog/` HTML directory at repo root is dead code
**Files:** `blog/*.html` (13 files)  
**Issue:** These legacy blog HTML files are never served (Netlify publishes `out/`). The Netlify redirects in `netlify.toml` handle all `blog/*` → new URL 301s correctly. The files themselves serve no purpose.  
**Fix:** Delete the `blog/` directory and `css/` directory from the repo root. They are historical artefacts from the pre-Next.js static site. Verify redirects still work after deletion (they will — Netlify redirects are independent of source files).

---

### P3-6 · `next.config.mjs` references non-standard `turbopack.root` option
**File:** `next.config.mjs:12-14`  
**Issue:** `turbopack: { root: __dirname }` — this is not a documented Next.js config key as of Next 14/15. It may be silently ignored or cause a config warning. Verify it is intentional and not a copy-paste artefact.  
**Fix:** Remove the `turbopack` block if it produces a warning during `npm run build`.

---

## Verified OK ✅

| Check | Result |
|-------|--------|
| WhatsApp CTA number | ✅ All 6 occurrences use `19034598763` (correct bot number) |
| SchemaOrg telephone | ✅ `+19034598763` in `TouristGuideSchema` and `ContactPoint` |
| Google AdSense account | ✅ `ca-pub-2469196723812841` in `layout.tsx` |
| Committed secrets / API keys | ✅ None found — no `.env` files, no tokens in source |
| robots.txt | ✅ `Allow: /` with correct sitemap pointer |
| 301 redirects (blog/ → new URLs) | ✅ All `blog/*` correctly redirected in `netlify.toml` |
| Typo slug 301s (`medellan`) | ✅ 6 redirects in place |
| Security headers (HSTS, CSP, X-Frame) | ✅ Netlify headers block is comprehensive |
| Trailing-slash consistency | ✅ `trailingSlash: true` in Next config; non-slash variants get 301 |
| Viewport meta | ✅ `width=device-width, initialScale=1, viewportFit=cover` |
| Mobile hamburger touch target | ✅ `min-w-[44px] min-h-[44px]` — passes WCAG 2.5.5 |
| aria-label on WhatsApp FAB | ✅ `aria-label="Chat with us on WhatsApp"` |
| aria-hidden on WhatsApp SVG | ✅ `aria-hidden="true"` on the icon SVG |
| Ecosystem cross-links (footer) | ✅ All 7 Maia brands linked with correct URLs |
| Netlify form (contact) | ✅ `data-netlify="true"` correctly configured |
| Canonical URLs | ✅ Per-page canonicals set on all page routes |
| Twitter/X cards | ✅ `summary_large_image` on all pages |
| OG images | ✅ Per-city OG images exist (1200×630) for all 7 cities |
| JSON-LD on all article pages | ✅ `ArticleSchema` injected via `SchemaOrg.tsx` |
| WebSite + TouristGuide schema on root | ✅ Both injected in `layout.tsx` |
| `<html lang="en">` | ✅ Set in `layout.tsx:98` |
| Consent banner (GDPR / Ley 1581) | ✅ Present, opt-in by default, correct company NIT |
| Node version pinned in Netlify | ✅ `NODE_VERSION = "20"` in `netlify.toml` |
| `ads.txt` | ✅ Present in `out/` |

---

## Top 5 Fixes (Highest ROI)

| # | Fix | Priority | Effort | Impact |
|---|-----|----------|--------|--------|
| 1 | **Show WhatsApp FAB on mobile** — change `hidden sm:flex` → `flex` in `layout.tsx:117` | P0 | 2 min | Restores primary CTA for majority of traffic |
| 2 | **Suppress or wire up AffiliateCTA** — add `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` env var or `return null` guard in `AffiliateCTA.tsx` | P0 | 30 min | Eliminates broken affiliate links / starts earning revenue |
| 3 | **Add `robots: noindex` to Venezuela page** — one line in `venezuela/page.tsx` metadata | P0 | 2 min | Protects crawl budget and domain quality score |
| 4 | **Resolve duplicate article pairs** — add `alternates.canonical` to the non-primary article in each of the 3 city pairs (Medellín, Bogotá, Cartagena real-estate) | P1 | 1 hr | Eliminates keyword cannibalization across 6 URLs |
| 5 | **Delete 4.4 MB of unused images** — `git rm public/images/colombia-hero.png public/images/santa-marta-travel.png` | P1/P3 | 5 min | Cuts deploy size, improves build time, removes dead assets |

---

*Audit generated by Maia Cowork · ruta-colombia.com · May 15, 2026*
