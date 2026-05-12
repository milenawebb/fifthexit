import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import logo from "@/assets/hype-street-logo.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center">
          <img src={logo} alt="Hype Street" className="h-9 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/#services" className="hover:text-foreground transition">Services</a>
          <a href="/#work" className="hover:text-foreground transition">Work</a>
          <a href="/#process" className="hover:text-foreground transition">Process</a>
          <a href="/#book" className="hover:text-foreground transition">Contact</a>
        </nav>
        <Button asChild size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow">
          <a href="/#book">Book a call</a>
        </Button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-hero">
            <Code2 className="h-3.5 w-3.5 text-primary-foreground" />
          </span>
          Hype Street
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Hype Street. Built with hype.</p>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="mailto:dev@hype-street.com" className="hover:text-foreground transition">dev@hype-street.com</a>
        </div>
      </div>
    </footer>
  );
}
