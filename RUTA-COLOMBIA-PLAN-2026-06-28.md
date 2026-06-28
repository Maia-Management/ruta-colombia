# Ruta Colombia — Specialist Plan
**Date:** 2026-06-28
**Author:** Claude (Cowork)
**Site status:** PAUSED to public per Andrew. Code work continues.
**Scope:** Investigate → plan → audit → fix loop until zero issues. Hygiene only on this pass — no public reactivation, no direction-change without sign-off.

---

## 0. The headline

The Drive canon and the live site disagree about what Ruta Colombia is.

- **Canon (BP-14-ruta-colombia.md + BIBLE-ruta-colombia-v2.md, Andrew pre-approved):** Ruta Colombia is a **curated tour-operator / travel-experience brand** based in Santa Marta. Deposits via **Wompi** (PSE / Nequi / tarjeta). USD route pricing ($350–500/day mid-tier, $520–650 Lost City, $1,500–3,500 custom 5–7-day, $2,500–5,000 relocation, $250–500 consulting). Hand-off lanes to Maia Realty and Maia Legal. **NOT** an OTA reseller, **NOT** a backpacker shop.
- **Live site:** Next.js 16 static-export **content blog** ("Colombia travel guide & expat resource"). 66 MDX articles across 7 cities + 8 orphan `colombia/` articles (live 404s — confirmed today). Monetisation: AdSense (`ca-pub-2469196723812841`) + Maia brand banners + Travelpayouts (marker env empty → component returns null, so it's inert). **Zero commerce surface.** No booking form, no Wompi checkout, no tour inventory.

The pivot in today's mission brief — toward tour-operator / experience-led — is **the canonical direction already**. The blog is the deviation. Two unresolved canon items the bibles flag for Andrew: (a) the `ruta-colombia.com` vs `santamartainsider.com` domain/brand split, and (b) the v1 bible's "Civic Pulse" daily-utility-platform vector as an alternate.

---

## 1. What's verified working ✅

- WhatsApp compliance: every `wa.me/` link uses `19034598763` (5 instances across layout / Header / BudgetCalculator / venezuela). OK.
- Security headers: CSP / HSTS / X-Frame-Options / Permissions-Policy comprehensive in `netlify.toml`. OK.
- Robots: Content-Signal `search=yes,ai-train=no` + 8 AI training crawlers blocked. OK.
- Privacy / NIT / Santa Marta address: present in `/privacy/`. OK.
- Sitemap covers the 7 cities + 49 articles + tools + legal pages = 104 URLs total. OK (modulo the `colombia/` orphan in §2).
- Wompi/Stripe/PayU/ePayco: **none referenced anywhere in `src/`**. OK (no leak; clean slate to add Wompi when authorized).
- AdSense Publisher ID `ca-pub-2469196723812841` consistent across layout, ConsentScripts, ads.txt. OK.
- Venezuela page: `robots: { index:false, follow:false }` confirmed in source. OK (a P0 from the May 15 audit is now fixed).
- Mobile: WhatsApp FAB visible (375×812 screenshot). Hero, calculator, article cards all single-column responsive. OK.

---

## 2. Hygiene gaps — safe to fix this pass

These don't depend on a tour-operator vs blog decision. They're surface fixes on the current shape.

### H1. 8 orphaned `colombia/` articles — live 404s
`src/content/articles/colombia/*.mdx` (banking, taxes, pets, SIM card, coworking, driving, Spanish schools, business) are on disk but `colombia` isn't in `src/lib/cities.ts`. No routes generated. Confirmed `https://ruta-colombia.com/colombia/legal/banking-colombia-expats/` returns 404 in production today.
**Fix:** add `colombia` as a pseudo-city in `cities.ts` (e.g., name "Colombia (Nationwide)", region "Colombia"). All 8 articles become reachable + sitemap-included.

### H2. Duplicate-slug pairs — cannibalization
- `best-neighbourhoods-{city}` vs `best-neighborhoods-{city}` for medellin, bogota, cartagena (real-estate, both indexed)
- `cost-of-living-{city}` (community) vs `cost-of-living-{city}-2026` (real-estate) for 6 cities
**Fix:** decide canonical per pair, add `alternates.canonical` to the loser pointing at the winner. Long-term, merge content and 301 the duplicate slug in `netlify.toml`.

### H3. Footer Maia brand list missing 5 brands
`src/components/Footer.tsx:88-96` lists 8 of 13 canonical brands. Missing: **Maia Masters, Maia Marketing, Maia Contable, Maia Juridica, Juno Retreats**.
**Fix:** add all 5 with correct domains.

### H4. Spanish content mislabeled as English in JSON-LD
`SchemaOrg.tsx:64` hardcodes `inLanguage:'en'`. The 5 Spanish santa-marta articles (`visa-para-vivir-en-colombia`, `guia-parque-tayrona`, `costo-de-vida-santa-marta-2026`, `guia-barrios-santa-marta`, `mejores-restaurantes-santa-marta`) have no `lang` frontmatter.
**Fix:** add optional `lang:'es'` to those 5 .mdx files; thread it through `getArticleBySlug()` → `generateMetadata()` → `ArticleSchema` props; default `'en'`.

### H5. Hreflang map is still misleading
Layout + homepage both declare `en/en-US/x-default` pointing to the same URL (commits #16 + #17). That's neutral for English pages but actively wrong for the 5 Spanish articles, and adds no value for the English pages.
**Fix:** keep the canonical-only model; remove the `languages` map from layout+homepage. When H4 lands, add per-article `alternates.languages` only on the Spanish articles, pointing at themselves with `es-CO`.

### H6. Twitter handle inconsistency
`layout.tsx`: `site:'@MaiaGroupCO'`, `creator:'@RutaColombia'`. `about/contact/venezuela`: both `'@RutaColombia'`.
**Fix:** standardize on `'@RutaColombia'` site-wide unless Andrew confirms the layout split was intentional.

### H7. Header categories nav hardcoded to /medellin/
`src/components/Header.tsx` "Explore: Real Estate / Food / Things to Do" all go to `/medellin/{cat}/`. Footer same pattern. Confusing for users on a Cartagena or Bogotá page.
**Fix:** context-aware city in nav (read current city from path) OR change "Real Estate" label to "Real Estate (Medellín)" to be honest about the destination. Recommend the latter for static-export simplicity.

### H8. Stale clutter at repo root
- `src/app/globals.css.bak`
- Root `index.html` (legacy Spanish static, 21 KB) — never served, confuses readers
- Root `blog/` HTML dir (Netlify 301s handle URLs; files redundant)
- Root `content/`, `css/`, `images/` (pre-Next migration)
- Root duplicates of `ads.txt`, `robots.txt`, `consent-banner.js`, `favicon.svg` — canonical copies live in `public/`
- Committed `tsconfig.tsbuildinfo` (build artifact, should be gitignored)
**Fix:** delete via `git rm`. Add `tsconfig.tsbuildinfo` and `*.bak` to `.gitignore`.

### H9. Empty categories never used
`jobs` and `marine` are in `categories.ts` but no article references them → no routes ever produced. Brand mapping (`marine` → Mapaná Marine, `jobs` → LlevaLleva) is correct intent but dead surface.
**Fix:** either seed each with at least one article per relevant city, or remove from `categories.ts`. Recommend keep + seed one stub article each for `santa-marta/marine` and `medellin/jobs` to honor the cross-link intent.

### H10. WebSite SearchAction points to non-functional URL
`SchemaOrg.tsx:75-80` urlTemplate is `/medellin/things-to-do/?q={search_term_string}` — no search page exists. Risk: Google surfaces a sitelinks search box that 404s.
**Fix:** remove the `potentialAction` block until real search exists.

### H11. Consent banner copy is Spanish on an English-default site
`consent-banner.js` strings: "Preferencias de Privacidad" / "Aceptar todo" / "Personalizar" / "Rechazar". Confirmed on the live homepage today.
**Fix:** translate to English by default (this is an English-first site per `<html lang="en">`); revisit when ES is added properly.

### H12. AdSense slot IDs in homepage + article pages
Per FINAL-AUDIT-ruta-colombia-2026-05-06.md, 6 slot IDs were placeholders (e.g., `"homepage-top-banner"`). Footer is fixed (`9202460373`). Need to verify whether the homepage + article slots have been wired up since.
**Action:** spot-check during fix pass. If still placeholders, leave a `// TODO(adsense)` comment so they're surfaced for Andrew to fill from his AdSense dashboard — don't fabricate IDs.

### H13. Twitter card site handle "@MaiaGroupCO" — does this account exist?
Don't have authority to verify; if Andrew doesn't own that handle, OG/Twitter cards will fail validation in some clients.
**Action:** flag in PR for Andrew to confirm.

---

## 3. Direction-change items — NEED ANDREW'S DECISION (not touching this pass)

These align with the BP-14 / BIBLE-v2 canon but are scope-of-direction, not scope-of-hygiene.

- **D1. Add a booking/inquiry funnel.** Cheapest first step is a Netlify-Form-backed inquiry form with structured fields (dates / party size / experience / budget), routed to a sales inbox. Wompi can come later when there's a route to actually charge against.
- **D2. Experience landing pages.** "Lost City Trek," "Tayrona Coast Day," "Coffee Region 3-Day" — even one page each closes the biggest gap vs Expotur/See Colombia.
- **D3. Trust block at CTA.** Tripadvisor score+count, RNT number, Destinos de Paz seal, individual guide photos. Expotur is best-in-class here.
- **D4. ES translation pass.** Live site has 5 Spanish santa-marta articles unflagged. Bilingual EN/ES is competitive parity for the local market (Expotur, Cartagena Insider). Either commit to it properly (page-level translation + hreflang) or retire the 5 Spanish articles to remove the ambiguity.
- **D5. AdSense + tour-operator brand fit.** A premium tour-operator site usually doesn't run AdSense (cheapens the brand). If we keep AdSense, it caps the premium positioning ceiling. Decision: keep ads as a paused-site revenue floor, OR remove ads in service of the bible-approved premium tour-operator direction.
- **D6. Domain question still open in the bibles.** `ruta-colombia.com` (current) vs `santamartainsider.com` (the canon flags this split as unresolved). Doesn't block this pass but blocks any bigger rebrand.
- **D7. Pivot timing.** Site is paused. If the goal is a public relaunch as tour-operator, sequence: (1) hygiene this PR, (2) experience landing pages + inquiry form, (3) Wompi deposit, (4) relaunch.

---

## 4. Clarifying questions for Andrew

These are the calls that unblock the direction-change items above.

1. **Q1 — Direction.** Is the BIBLE-ruta-colombia-v2 / BP-14 tour-operator direction the one we're building toward (i.e., the live blog is the deviation), or is the blog now considered the product and we should retire the tour-operator framing?

2. **Q2 — AdSense.** If the answer to Q1 is "tour-operator," do we strip AdSense before relaunch (premium positioning), keep it on for revenue floor while the funnel ramps, or move ads to a content sub-domain (`blog.ruta-colombia.com`)?

3. **Q3 — Spanish strategy.** Should I (a) retire the 5 Spanish santa-marta articles now (one-language site), (b) tag them properly with `lang:'es'` + hreflang for this pass and you'll fund a proper bilingual pass later, or (c) leave them as-is until the bigger direction is settled?

4. **Q4 — Domain.** Is the `ruta-colombia.com` vs `santamartainsider.com` split decided yet? Affects how hard I push canonical/SEO this pass.

5. **Q5 — Reactivation gate.** Confirm: nothing on the branch/PR is to go live without your explicit "go." Hygiene fixes will rebuild and deploy automatically on merge unless you want me to push to a `paused-` branch instead of master.

6. **Q6 — Header/Footer city default.** Right now nav category links go to `/medellin/` always. OK to change them to `/santa-marta/` (Maia's local zone per `reference_maia_location_santa_marta`)? Or keep Medellín as the default city?

---

## 5. This pass's branch + PR scope

**Branch:** `ruta-colombia-finish-2026-06-28`

**In scope (hygiene only):** H1–H12 above, plus any P2/P3 items from the May 15 audit that haven't already landed (e.g., `globals.css.bak` removal).

**Out of scope (waiting on Q1–Q6):** D1–D7.

**Deploy posture:** PR will be opened for review but **not merged**. Nothing republishes without Andrew's go.
