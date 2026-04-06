import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Messages", href: "#messages" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-snap-bg/90 backdrop-blur-md border-b border-snap-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 bg-snap-yellow rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-snap-bg" fill="currentColor" />
          </div>
          <span className="font-display font-800 text-lg text-snap-text tracking-tight">
            Snap<span className="text-snap-yellow">Cache</span>
          </span>
        </button>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-snap-muted hover:text-snap-text transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-snap-muted hover:text-snap-text hover:bg-snap-card"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            onClick={() => scrollTo("#messages")}
            className="bg-snap-yellow text-snap-bg hover:bg-snap-yellow/90 font-semibold rounded-full px-5"
            data-ocid="nav.primary_button"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-snap-muted hover:text-snap-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-snap-card border-b border-snap-border px-4 pb-4 flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-sm text-snap-muted hover:text-snap-text transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <Button
            size="sm"
            onClick={() => scrollTo("#messages")}
            className="bg-snap-yellow text-snap-bg hover:bg-snap-yellow/90 font-semibold rounded-full w-full mt-1"
          >
            Get Started
          </Button>
        </motion.div>
      )}
    </header>
  );
}
