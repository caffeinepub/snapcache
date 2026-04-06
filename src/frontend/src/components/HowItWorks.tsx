import { ClipboardPaste, FolderOpen, Zap } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: <ClipboardPaste size={28} />,
    title: "Paste Your Messages",
    description:
      "Copy all messages from Snapchat, paste them into the SnapCache overlay panel. Add a conversation name and sender.",
  },
  {
    number: "02",
    icon: <Zap size={28} />,
    title: "Hit Save All",
    description:
      "One click saves every line as a separate message entry, timestamped and attributed to the correct conversation.",
  },
  {
    number: "03",
    icon: <FolderOpen size={28} />,
    title: "Browse & Manage",
    description:
      "View all saved messages grouped by conversation. Copy, delete, or clear messages at any time from the dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-snap-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-snap-yellow">
            How It Works
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-3 text-snap-text">
            Three Steps to
            <span className="text-snap-yellow"> Save Everything</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-snap-yellow/30 via-snap-yellow/60 to-snap-yellow/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Step circle */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-snap-card border-2 border-snap-yellow/40 flex items-center justify-center mb-6 shadow-yellow-glow">
                <div className="text-snap-yellow">{step.icon}</div>
                <span className="absolute -top-1 -right-1 w-7 h-7 bg-snap-yellow rounded-full flex items-center justify-center text-snap-bg text-xs font-bold">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-snap-text mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-snap-muted leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
