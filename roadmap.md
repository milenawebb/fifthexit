# Bellhouse portfolio card update
- [x] Swap in the uploaded preview and the new English/Bulgarian descriptions; title, tag, link and position unchanged.
- [x] Verify both languages in a browser: image loads, text exact, card still 8th of 11 between RIN and Elite Ride.

# RIN design-notes screenshots
- [x] Replace the placeholder with the two uploaded page screenshots: side by side on desktop, stacked on mobile, captions, alt text, lazy loading and fixed width/height.
- [x] Verify both languages at 1280px and 390px: layout, captions, alt, lazy flags, no overflow, no layout shift.

# RIN case study
- [x] Create shared bilingual case-study layout and supplied RIN content.
- [x] Link the RIN card internally and add domain-aware metadata and sitemap entry.
- [x] Check both languages locally at 390px and 1280px, navigation and both host sitemaps; final local English Lighthouse Accessibility 100, Performance 87, CLS 0 (development code).
- [ ] Verify real-domain localized source and 95+ Performance / 100 Accessibility on both markets: blocked until publishing, since the new page currently returns 404 on both live domains.

# Homepage scroll motion
- [x] Add compact navigation, hero depth, one-time reveals and counters.
- [x] Add MVP focus/progress and desktop/mobile portfolio scrolling.
- [x] Preserve lazy loading, translations, accessibility and reduced motion.
- [x] Verify both languages at desktop and 390px; test estimator, booking and quick question; clean test booking rows.
- [ ] Published-domain motion and PageSpeed/CLS comparison: blocked until changes are published and a fresh audit is available.

# Instagram link in the English nav
- [x] Add the unlabeled Instagram glyph after the last nav link (desktop) and at the end of the mobile menu list; English only.
- [ ] Confirm the accessibility and touch-target audits stay at 100 on the published fifthexit.com: blocked until the change is published and audited.


# Routing band to Webb Consulting
- [x] Last section above the footer on the landing page, fifthexit.com only: label, heading, body and webb-consulting.net link (new tab); footer DBA sentence untouched; no other section changed.
- [x] Verified in a browser at 1280px and 375px: copy exact, last section in main with the footer directly after, reveal fires, contrast body 7.2:1 / link 11.3:1, no overflow from the band; hidden when the language is Bulgarian. The homepage already scrolls 5px sideways at 375px from a decorative glow inside the contact section, left alone per the brief.
- [ ] Live-domain check: blocked until publishing.

# Bellhouse case study
- [x] Bilingual page at /work/bellhouse-real-estate with stats, service-map item, two screenshots; card, sitemap and RIN "Next" link updated.
- [ ] Verify on live domains and Lighthouse 95+/100: blocked until publishing.

# Finish my Lovable site offer (English only)
- [x] New /lovable page: hero, last-20% checklist, how-it-works, proof stats, FAQ accordion, closing quick-question form with required site URL field.
- [x] Homepage compact section after MVP journey, EN-only; nav "Lovable" link between Process and Estimate, EN-only.
- [x] Estimator: "Finish my Lovable site" type (From $1,500), skips Design step, flows to booking email.
- [x] Sitemap: /lovable EN-only entry; quick-question endpoint and email template accept siteUrl.
- [ ] Verify at 390px/1280px, estimator flow, form submit, sitemap, Lighthouse: in progress this turn.
- [ ] Live-domain check and published Lighthouse: blocked until publishing.
