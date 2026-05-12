import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/hype-street-logo.png";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#book", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center" onClick={close}>
          <img src={logo} alt="Hype Street" className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
            <a href="/#book">Book a call</a>
          </Button>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-white/5 transition"
        >
          {open ? <Menu className="h-5 w-5 hidden" /> : null}
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 glass">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="px-2 py-3 text-base text-muted-foreground hover:text-foreground transition"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              size="sm"
              className="mt-2 w-full bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow"
            >
              <a href="/#book" onClick={close}>Book a call</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="/terms" className="hover:text-foreground transition">Terms of Service</a>
          <a href="/privacy" className="hover:text-foreground transition">Privacy Policy</a>
          <a href="/cookies" className="hover:text-foreground transition">Cookie Policy</a>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/#top" className="flex items-center">
            <img src={logo} alt="Hype Street" className="h-10 w-auto" />
          </a>
          <p className="text-sm text-muted-foreground">© 2026 Hype Street. Built with hype.</p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="mailto:dev@hype-street.com" className="hover:text-foreground transition">dev@hype-street.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
