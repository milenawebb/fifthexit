import { useTranslation } from "react-i18next";
import { Header, Footer } from "@/components/site-chrome";
import { BgTermsContent } from "@/components/legal-bg/terms";
import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection, type TocItem } from "@/components/legal-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { name: "description", content: "The Terms of Service governing your use of fifthexit's web and app development services." },
      { property: "og:description", content: "Read the Terms of Service for fifthexit (Webb Consulting LLC / DBA Fifth Exit)." },
    ],
  }),
  component: LocalizedPage,
});

const toc: TocItem[] = [
  { id: "agreement", label: "1. Agreement to Terms" },
  { id: "services", label: "2. Our Services" },
  { id: "accounts", label: "3. Accounts & Access" },
  { id: "payment", label: "4. Payment & Fees" },
  { id: "ip", label: "5. Intellectual Property" },
  { id: "acceptable-use", label: "6. Acceptable Use" },
  { id: "confidentiality", label: "7. Confidentiality" },
  { id: "warranties", label: "8. Warranties & Disclaimers" },
  { id: "liability", label: "9. Limitation of Liability" },
  { id: "indemnification", label: "10. Indemnification" },
  { id: "termination", label: "11. Termination" },
  { id: "governing-law", label: "12. Governing Law & Disputes" },
  { id: "changes", label: "13. Changes to Terms" },
  { id: "contact", label: "14. Contact" },
];

function TermsPageEn() {
  return (
    <LegalLayout
      title="Terms of Service"
      effectiveDate="Effective date: May 12, 2026 · Webb Consulting LLC / DBA Fifth Exit (DBA: fifthexit)"
      toc={toc}
    >
      <p className="mb-10 text-foreground/70">
        Please read these Terms carefully. By accessing or using any service provided by fifthexit
        (Webb Consulting LLC / DBA Fifth Exit), you agree to be bound by these Terms of Service. If you do not agree, do not
        use our services.
      </p>

      <LegalSection id="agreement" title="1. Agreement to Terms">
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you
          ("Client," "you," or "your") and Webb Consulting LLC / DBA Fifth Exit, doing business as fifthexit ("fifthexit," "we," "us," or "our"). These Terms govern your access to and use of our website
          at fifthexit.com and all services we provide.
        </p>
        <p>
          By submitting an inquiry, signing a project agreement, or engaging any of our services,
          you confirm that you are at least 18 years of age, have the legal authority to enter into
          this agreement, and agree to these Terms.
        </p>
      </LegalSection>

      <LegalSection id="services" title="2. Our Services">
        <p>
          fifthexit provides web development, mobile application development, brand and UI design,
          and digital product launch services. The specific deliverables, timeline, and pricing for
          your project will be outlined in a separate Statement of Work (SOW) or project agreement.
        </p>
        <p>Services include:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Website design and development</li>
          <li>Mobile application development (iOS and Android)</li>
          <li>Brand identity and UI/UX design</li>
          <li>Product launch and scaling strategy</li>
          <li>Ongoing maintenance and support retainers</li>
        </ul>
        <p>We reserve the right to decline, modify, or discontinue any service at our discretion.</p>
      </LegalSection>

      <LegalSection id="accounts" title="3. Accounts & Access">
        <p>
          If we provide you with access to a client portal, project management system, or any
          credentials, you are responsible for maintaining confidentiality of those credentials.
          Notify us immediately at{" "}
          <a href="mailto:info@fifthexit.com" className="text-primary hover:underline">
            info@fifthexit.com
          </a>{" "}
          if you suspect unauthorized access. You are solely responsible for all activity that
          occurs under your account.
        </p>
      </LegalSection>

      <LegalSection id="payment" title="4. Payment & Fees">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Deposits:</strong> Most projects require a deposit
            (typically 50%) before work begins. Deposits are non-refundable unless fifthexit fails
            to commence work within the agreed timeframe.
          </li>
          <li>
            <strong className="text-foreground">Invoices:</strong> Due within 14 days of issue
            unless otherwise specified in writing.
          </li>
          <li>
            <strong className="text-foreground">Late Payments:</strong> Overdue invoices may accrue
            interest at 1.5% per month. We reserve the right to pause all work until outstanding
            balances are resolved.
          </li>
          <li>
            <strong className="text-foreground">Scope Changes:</strong> Work outside the agreed SOW
            is subject to additional fees and requires written approval.
          </li>
          <li>
            <strong className="text-foreground">Taxes:</strong> All fees are exclusive of applicable
            taxes, which are your responsibility.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="ip" title="5. Intellectual Property">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Client-Owned Content:</strong> You retain ownership
            of all content, data, branding assets, and materials you provide to us. You grant us a
            limited license to use them solely for delivering your project.
          </li>
          <li>
            <strong className="text-foreground">Deliverables:</strong> Upon receipt of full payment,
            fifthexit assigns to you all ownership rights in the final delivered project files
            and code, except as noted below.
          </li>
          <li>
            <strong className="text-foreground">Retained Rights:</strong> fifthexit retains
            ownership of all tools, frameworks, libraries, processes, methodologies, and
            pre-existing intellectual property used to build your project. We grant you a perpetual,
            non-exclusive license to use this Background IP solely as incorporated in your
            Deliverables.
          </li>
          <li>
            <strong className="text-foreground">Portfolio Use:</strong> Unless you request otherwise
            in writing, we reserve the right to display your project in our portfolio and
            promotional materials.
          </li>
          <li>
            <strong className="text-foreground">Third-Party Components:</strong> Some deliverables
            may incorporate third-party open-source libraries or licensed components. You are
            responsible for complying with those licenses.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="acceptable-use" title="6. Acceptable Use">
        <p>You agree not to use our services to build, promote, or facilitate:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Illegal products, services, or activities</li>
          <li>Spam, phishing, or deceptive practices</li>
          <li>Harassment, hate speech, or discriminatory content</li>
          <li>Malware, ransomware, or any malicious software</li>
          <li>Unauthorized data collection or privacy violations</li>
          <li>Infringement of any third party's intellectual property rights</li>
        </ul>
        <p>
          We reserve the right to refuse or terminate any engagement where we reasonably believe
          the project violates this section or applicable law.
        </p>
      </LegalSection>

      <LegalSection id="confidentiality" title="7. Confidentiality">
        <p>
          Both parties may share confidential information in the course of our engagement. Each
          party agrees to hold the other's Confidential Information in strict confidence, use it
          only for purposes of the engagement, and not disclose it to third parties without prior
          written consent.
        </p>
        <p>
          Confidential Information does not include information that is publicly known, was already
          known to the receiving party, is independently developed, or is required to be disclosed
          by law.
        </p>
      </LegalSection>

      <LegalSection id="warranties" title="8. Warranties & Disclaimers">
        <p>
          fifthexit warrants that Services will be performed in a professional and workmanlike
          manner consistent with industry standards. We do not warrant that deliverables will be
          error-free or uninterrupted after handoff.
        </p>
        <p>
          Except as expressly stated above, all services and deliverables are provided "as is"
          without warranty of any kind. We make no guarantees regarding specific business outcomes,
          traffic, revenue, search rankings, or user acquisition resulting from our work.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by applicable law, fifthexit shall not be liable for
          any indirect, incidental, special, consequential, or punitive damages. Our total
          cumulative liability for any claims shall not exceed the total fees paid by you to fifthexit in the three (3) months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection id="indemnification" title="10. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless fifthexit, Webb Consulting LLC / DBA Fifth Exit, and their
          respective members, employees, and contractors from and against any claims, liabilities,
          damages, judgments, and expenses arising out of your breach of these Terms, your use of
          the Services, your provided materials, or your violation of any third-party rights or
          applicable law.
        </p>
      </LegalSection>

      <LegalSection id="termination" title="11. Termination">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">By You:</strong> You may terminate an engagement at
            any time by providing written notice. You remain responsible for payment of all work
            completed through the termination date, plus any non-refundable deposits.
          </li>
          <li>
            <strong className="text-foreground">By Us:</strong> We may suspend or terminate Services
            immediately if you breach these Terms, fail to make timely payment, or if continuing the
            engagement would be unlawful or harmful.
          </li>
          <li>
            <strong className="text-foreground">Effect of Termination:</strong> Each party shall
            return or destroy the other's Confidential Information. IP, Confidentiality, Warranty,
            Liability, Indemnification, and Governing Law sections survive termination.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="governing-law" title="12. Governing Law & Disputes">
        <p>
          These Terms are governed by the laws of the State of Florida. Any disputes shall first be
          addressed through good-faith negotiation. If unresolved, disputes shall be settled by
          binding arbitration in accordance with the rules of the American Arbitration Association,
          conducted in Florida.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes to Terms">
        <p>
          We reserve the right to update these Terms at any time. We will post the revised Terms at
          fifthexit.com/terms with an updated effective date. Continued use of our services after
          changes are posted constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14. Contact">
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
        <BgTermsContent />
        <Footer />
      </>
    );
  }
  return <TermsPageEn />;
}
