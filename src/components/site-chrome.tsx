import { Button } from "@/components/ui/button";
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
      <div className="mx-auto max-w-7xl px-6 flex flex-col gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="/terms" className="hover:text-foreground transition">Terms of Service</a>
          <a href="/privacy" className="hover:text-foreground transition">Privacy Policy</a>
          <a href="/cookies" className="hover:text-foreground transition">Cookie Policy</a>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/#top" className="flex items-center">
            <img src={logo} alt="Hype Street" className="h-8 w-auto" />
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
