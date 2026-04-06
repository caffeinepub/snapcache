import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";
import { motion } from "motion/react";

const previewMessages = [
  "Hey what's up?",
  "can u send that again",
  "omg lol yes",
];

export default function HeroSection() {
  const scrollToMessages = () => {
    const el = document.querySelector("#messages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-100 glow-yellow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: headline */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-snap-card border border-snap-border rounded-full px-4 py-1.5 text-xs text-snap-yellow font-semibold uppercase tracking-widest">
                <Zap size={12} fill="currentColor" />
                One-Click Message Saving
              </span>
            </motion.div>

            <motion.h1
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Save Every <span className="text-snap-yellow">Snap</span>
              <br />
              Without the{" "}
              <span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.91 0.19 100), oklch(0.85 0.15 80))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hassle
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-snap-muted max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              SnapCache lets you capture and store entire Snapchat conversations
              with a single tap. Never lose an important message again — perfect
              for heavy chatters and message spammers.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={scrollToMessages}
                className="bg-snap-yellow text-snap-bg hover:bg-snap-yellow/90 font-bold rounded-full px-8 text-base shadow-yellow-glow"
                data-ocid="hero.primary_button"
              >
                💾 Start Saving Messages
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-snap-muted hover:text-snap-text border border-snap-border rounded-full px-8 text-base"
                onClick={() => {
                  const el = document.querySelector("#features");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See Features
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-snap-yellow">
                  ∞
                </div>
                <div className="text-xs text-snap-muted">Messages Saved</div>
              </div>
              <div className="w-px h-10 bg-snap-border" />
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-snap-yellow">
                  1-click
                </div>
                <div className="text-xs text-snap-muted">Save Action</div>
              </div>
              <div className="w-px h-10 bg-snap-border" />
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-snap-yellow">
                  Always
                </div>
                <div className="text-xs text-snap-muted">Available</div>
              </div>
            </motion.div>
          </div>

          {/* Right: floating overlay preview */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Phone mockup image */}
              <div className="animate-float">
                <img
                  src="/assets/generated/hero-phone-mockup.dim_400x600.png"
                  alt="SnapCache overlay UI"
                  className="w-64 sm:w-72 lg:w-80 rounded-3xl shadow-2xl"
                />
              </div>

              {/* Floating overlay card preview */}
              <motion.div
                className="absolute -bottom-4 -right-4 sm:-right-8 bg-snap-card border border-snap-border rounded-2xl p-4 w-56 shadow-card-hover"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-snap-yellow rounded-md flex items-center justify-center">
                    <Zap
                      size={12}
                      className="text-snap-bg"
                      fill="currentColor"
                    />
                  </div>
                  <span className="text-xs font-bold text-snap-text">
                    SnapCache Overlay
                  </span>
                </div>
                <div className="space-y-1.5 mb-3">
                  {previewMessages.map((msg) => (
                    <div
                      key={msg}
                      className="text-xs text-snap-muted bg-snap-card2 rounded-md px-2.5 py-1.5 truncate"
                    >
                      {msg}
                    </div>
                  ))}
                </div>
                <div className="bg-snap-yellow rounded-lg py-2 text-center">
                  <span className="text-xs font-bold text-snap-bg">
                    💾 Save All (3)
                  </span>
                </div>
              </motion.div>

              {/* Saved badge */}
              <motion.div
                className="absolute -top-3 -left-4 bg-snap-card border border-snap-yellow/30 rounded-xl px-3 py-2 flex items-center gap-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <span className="text-snap-yellow text-sm">✓</span>
                <span className="text-xs font-semibold text-snap-text">
                  3 messages saved!
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector("#features");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-snap-muted hover:text-snap-text transition-colors"
            aria-label="Scroll to features"
          >
            <span className="text-xs tracking-widest uppercase">Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
