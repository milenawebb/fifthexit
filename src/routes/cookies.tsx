import { useTranslation } from "react-i18next";
import { Header, Footer } from "@/components/site-chrome";
import { BgCookiesContent } from "@/components/legal-bg/cookies";
import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection, type TocItem } from "@/components/legal-layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { name: "description", content: "How fifthexit uses cookies and similar tracking technologies on fifthexit.com." },
      { property: "og:description", content: "fifthexit's Cookie Policy." },
    ],
  }),
  component: LocalizedPage,
});

const toc: TocItem[] = [
  { id: "what-are-cookies", label: "1. What Are Cookies?" },
  { id: "types", label: "2. Types of Cookies We Use" },
  { id: "specific", label: "3. Specific Cookies We Use" },
  { id: "third-party", label: "4. Third-Party Cookies" },
  { id: "managing", label: "5. Managing Your Preferences" },
  { id: "dnt", label: "6. Do Not Track" },
  { id: "updates", label: "7. Updates to This Policy" },
  { id: "contact", label: "8. Contact Us" },
];

const cookies = [
  { name: "_hs_session", provider: "fifthexit", type: "Essential", purpose: "Maintains session state for visitors", duration: "Session" },
  { name: "_hs_cookie_consent", provider: "fifthexit", type: "Essential", purpose: "Stores your cookie consent preferences", duration: "12 months" },
  { name: "_ga", provider: "Google Analytics", type: "Analytics", purpose: "Distinguishes unique visitors; calculates visitor, session, and campaign data", duration: "2 years" },
  { name: "_ga_[ID]", provider: "Google Analytics", type: "Analytics", purpose: "Persists session state for Google Analytics 4", duration: "2 years" },
  { name: "_gid", provider: "Google Analytics", type: "Analytics", purpose: "Distinguishes users; stores page usage information", duration: "24 hours" },
  { name: "_gat", provider: "Google Analytics", type: "Analytics", purpose: "Throttles request rate to Google Analytics", duration: "1 minute" },
];

function CookiesPageEn() {
  return (
    <LegalLayout
      title="Cookie Policy"
      effectiveDate="Effective date: May 12, 2026 · Webb Consulting LLC / DBA Fifth Exit (DBA: fifthexit)"
      toc={toc}
    >
      <p className="mb-10 text-foreground/70">
        This Cookie Policy explains how fifthexit (Webb Consulting LLC / DBA Fifth Exit) uses cookies and similar
        tracking technologies on fifthexit.com. It should be read alongside our Privacy Policy.
      </p>

      <LegalSection id="what-are-cookies" title="1. What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow
          the website to recognize your device and remember certain information about your visit.
          Similar technologies include:
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong className="text-foreground">Web Beacons (Pixel Tags)</strong> — tiny transparent
            images used to track whether content has been viewed.
          </li>
          <li>
            <strong className="text-foreground">Local Storage</strong> — browser-based storage that
            persists data without an expiration date.
          </li>
          <li>
            <strong className="text-foreground">Session Storage</strong> — temporary storage cleared
            when the browser tab closes.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="types" title="2. Types of Cookies We Use">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Essential (Always Active):</strong> Required for the
            site to function. These enable core features like navigation, security, and access to
            secure areas. The site cannot function properly without them.
          </li>
          <li>
            <strong className="text-foreground">Analytics (Optional):</strong> Help us understand
            how visitors interact with the site by collecting anonymous data on page views, traffic
            sources, and user behavior.
          </li>
          <li>
            <strong className="text-foreground">Functional (Optional):</strong> Remember your
            preferences and settings to provide a more personalized experience on return visits.
          </li>
          <li>
            <strong className="text-foreground">Marketing (Optional):</strong> Used to track
            visitors across websites to deliver relevant ads. We do not currently serve third-party
            advertising but may use this for retargeting in the future.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="specific" title="3. Specific Cookies We Use">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="text-foreground/80">
              {cookies.map((c) => (
                <tr key={c.name} className="border-t border-border/60 align-top">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{c.name}</td>
                  <td className="px-4 py-3">{c.provider}</td>
                  <td className="px-4 py-3">{c.type}</td>
                  <td className="px-4 py-3">{c.purpose}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="third-party" title="4. Third-Party Cookies">
        <p>Third parties that may set cookies include:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong className="text-foreground">Google Analytics</strong> — website analytics (
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              policies.google.com/privacy
            </a>
            )
          </li>
          <li>
            <strong className="text-foreground">Google Fonts</strong> — typography loading (
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              policies.google.com/privacy
            </a>
            )
          </li>
        </ul>
        <p>
          We vet third-party tools before integrating them and only use those with appropriate data
          protections.
        </p>
      </LegalSection>

      <LegalSection id="managing" title="5. Managing Your Cookie Preferences">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Browser Settings:</strong> Most browsers allow you
            to view, manage, block, or delete cookies through their settings. Note that disabling
            essential cookies may impair site functionality.
          </li>
          <li>
            <strong className="text-foreground">Opt Out of Google Analytics:</strong> Install the
            Google Analytics Opt-out Browser Add-on at{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              tools.google.com/dlpage/gaoptout
            </a>
            .
          </li>
          <li>
            <strong className="text-foreground">Cookie Consent Banner:</strong> When you first visit
            our site, you will be presented with a cookie consent banner where you can accept or
            decline optional cookies. You can update your preferences at any time by clearing your
            browser cookies and revisiting our site, or by contacting us at{" "}
            <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
              info@fifthexit.com
            </a>
            .
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="dnt" title="6. Do Not Track">
        <p>
          Our website does not currently respond to Do Not Track (DNT) signals in a standardized
          way, as there is no uniform technical standard for their interpretation. We encourage you
          to use browser controls to manage your preferences.
        </p>
      </LegalSection>

      <LegalSection id="updates" title="7. Updates to This Policy">
        <p>
          We may update this Cookie Policy from time to time. We will post updates at
          fifthexit.com/cookies with a revised effective date.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="8. Contact Us">
        <p>
          Webb Consulting LLC / DBA Fifth Exit (DBA: fifthexit)
          <br />
          Email:{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>
          <br />
          Website: fifthexit.com
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

function LocalizedPage() {
  const { i18n } = useTranslation();
  if (i18n.language?.startsWith("bg")) {
    return (
      <>
        <Header />
        <BgCookiesContent />
        <Footer />
      </>
    );
  }
  return <CookiesPageEn />;
}
