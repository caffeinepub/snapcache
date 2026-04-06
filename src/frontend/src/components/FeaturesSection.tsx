import { Archive, Copy, Layers, Save, Trash2, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <Zap size={24} />,
    title: "One-Click Save",
    description:
      "Paste any number of messages and hit Save All. Entire conversations captured in a single tap — no per-message friction.",
  },
  {
    icon: <Layers size={24} />,
    title: "Conversation Groups",
    description:
      "Messages are automatically organized by conversation name. Browse all your saved chats at a glance with sender attribution.",
  },
  {
    icon: <Copy size={24} />,
    title: "Instant Copy",
    description:
      "Copy any individual message or everything at once to your clipboard. Great for sharing receipts or referencing later.",
  },
  {
    icon: <Archive size={24} />,
    title: "Persistent Storage",
    description:
      "Your messages are stored securely on-chain. They persist across sessions so you never lose your saved receipts.",
  },
  {
    icon: <Save size={24} />,
    title: "Floating Overlay",
    description:
      "The save panel floats over any page, always accessible. Minimize it when not in use, expand it whenever you need it.",
  },
  {
    icon: <Trash2 size={24} />,
    title: "Clean Management",
    description:
      "Delete individual messages or nuke everything with Clear All. Keep your archive tidy without any clutter.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-snap-yellow">
            Features at a Glance
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-3 text-snap-text">
            Everything You Need to
            <br />
            <span className="text-snap-yellow">Never Lose a Message</span>
          </h2>
          <p className="text-snap-muted mt-4 max-w-xl mx-auto text-base">
            Built for people who move fast and chat faster. SnapCache has every
            tool you need to keep your conversations archived.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="features.section"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-snap-card border border-snap-border rounded-2xl p-6 hover:border-snap-yellow/30 transition-all duration-300 hover:shadow-card-hover group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              data-ocid={`features.item.${i + 1}`}
            >
              <div className="w-11 h-11 bg-snap-card2 border border-snap-border rounded-xl flex items-center justify-center text-snap-yellow mb-4 group-hover:bg-snap-yellow/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-display font-bold text-base text-snap-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-snap-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
