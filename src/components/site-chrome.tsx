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

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { t } = useTranslation();


  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" style={{ backgroundColor: "#0d0b1a" }}>
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center shrink-0" onClick={close}>
          <img
            src={logo}
            alt="fifthexit"
            className="block h-6 md:h-7 w-auto max-w-none object-contain"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition">
              {t(l.key)}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-5">
          <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="/#book">{t("nav.bookCall")}</a>
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
                onClick={close}
                className="px-2 py-3 text-base text-muted-foreground hover:text-foreground transition text-center"
              >
                {t(l.key)}
              </a>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-2 w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <a href="/#book" onClick={close}>{t("nav.bookCall")}</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const termsHref = "/terms";
  const privacyHref = "/privacy";
  const cookiesHref = "/cookies";
  const email = t("contact.email");
  const phone = t("contact.phone");
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
            <img src={logo} alt="fifthexit" className="h-7 w-auto" />
          </a>
          <p className="text-sm text-muted-foreground text-center lg:text-left">{t("footer.copyright")} {t("footer.builtWith")}</p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href={`mailto:${email}`} className="hover:text-foreground transition">{email}</a>
            {phone && (
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-foreground transition">{phone}</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

