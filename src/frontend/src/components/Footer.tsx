import { Github, MessageCircle, Twitter, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Messages", href: "#messages" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Documentation", href: "#how-it-works" },
        { label: "Help Center", href: "#features" },
        { label: "Contact", href: "#messages" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#features" },
        { label: "Terms of Service", href: "#features" },
      ],
    },
  ];

  const scrollTo = (href: string) => {
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-snap-border bg-snap-card py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-snap-yellow rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-snap-bg" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-lg text-snap-text">
                Snap<span className="text-snap-yellow">Cache</span>
              </span>
            </div>
            <p className="text-sm text-snap-muted leading-relaxed max-w-xs">
              Save all your Snapchat messages with one click. Built for people
              who move fast and chat faster.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-snap-card2 border border-snap-border rounded-lg flex items-center justify-center text-snap-muted hover:text-snap-yellow hover:border-snap-yellow/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={14} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-snap-card2 border border-snap-border rounded-lg flex items-center justify-center text-snap-muted hover:text-snap-yellow hover:border-snap-yellow/30 transition-colors"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-snap-card2 border border-snap-border rounded-lg flex items-center justify-center text-snap-muted hover:text-snap-yellow hover:border-snap-yellow/30 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-snap-yellow mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-snap-muted hover:text-snap-text transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-snap-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-snap-muted">
            © {currentYear} SnapCache. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-snap-muted hover:text-snap-text transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
