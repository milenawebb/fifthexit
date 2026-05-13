import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import logo from "@/assets/hype-street-logo.png";

const navLinks = [
  { href: "/#services", key: "nav.services" },
  { href: "/#stack", key: "nav.stack" },
  { href: "/#work", key: "nav.work" },
  { href: "/#process", key: "nav.process" },
  { href: "/#estimator", key: "nav.estimate" },
  { href: "/#book", key: "nav.contact" },
];

function LanguageToggle({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("bg") ? "bg" : "en";
  const setLang = (lng: "en" | "bg") => {
    localStorage.setItem("hs_lang", lng);
    i18n.changeLanguage(lng);
  };
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`}>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`transition ${current === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={current === "en"}
      >
        EN
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        type="button"
        onClick={() => setLang("bg")}
        className={`transition ${current === "bg" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-pressed={current === "bg"}
      >
        BG
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { t, i18n } = useTranslation();
  const persistLanguage = () => {
    localStorage.setItem("hs_lang", i18n.language?.startsWith("bg") ? "bg" : "en");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center" onClick={() => { persistLanguage(); close(); }}>
          <img src={logo} alt="Hype Street" className="h-10 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={persistLanguage} className="hover:text-foreground transition">
              {t(l.key)}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-5">
          <LanguageToggle />
          <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="/#book" onClick={persistLanguage}>{t("nav.bookCall")}</a>
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-white/5 transition"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 glass" style={{ backgroundColor: "#0d0b1a" }}>
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => { persistLanguage(); close(); }}
                className="px-2 py-3 text-base text-muted-foreground hover:text-foreground transition text-center"
              >
                {t(l.key)}
              </a>
            ))}
            <LanguageToggle className="mt-3" />
            <Button
              asChild
              size="sm"
              className="mt-2 w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <a href="/#book" onClick={() => { persistLanguage(); close(); }}>{t("nav.bookCall")}</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const isBg = i18n.language?.startsWith("bg");
  const termsHref = isBg ? "/bg/terms" : "/terms";
  const privacyHref = isBg ? "/bg/privacy" : "/privacy";
  const cookiesHref = isBg ? "/bg/cookies" : "/cookies";
  return (
    <footer className="border-t border-border py-12" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href={termsHref} className="hover:text-foreground transition">{t("footer.terms")}</a>
          <a href={privacyHref} className="hover:text-foreground transition">{t("footer.privacy")}</a>
          <a href={cookiesHref} className="hover:text-foreground transition">{t("footer.cookies")}</a>
        </nav>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <a href="/#top" className="flex items-center">
            <img src={logo} alt="Hype Street" className="h-10 w-auto" />
          </a>
          <p className="text-sm text-muted-foreground">{t("footer.copyright")} {t("footer.builtWith")}</p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="mailto:dev@hype-street.com" className="hover:text-foreground transition">dev@hype-street.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

