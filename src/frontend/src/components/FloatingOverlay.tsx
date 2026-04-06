import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Maximize2, Minus, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Message } from "../backend.d";
import { useSaveMessages } from "../hooks/useQueries";

export default function FloatingOverlay() {
  const [expanded, setExpanded] = useState(true);
  const [conversation, setConversation] = useState("");
  const [sender, setSender] = useState("");
  const [text, setText] = useState("");
  const saveMessages = useSaveMessages();

  const handleSaveAll = async () => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      toast.error("No messages to save — paste some first!");
      return;
    }

    const convName = conversation.trim() || "Unknown Conversation";
    const senderName = sender.trim() || "Unknown Sender";

    const messages: Message[] = lines.map((line) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      content: line,
      conversation: convName,
      sender: senderName,
      timestamp: BigInt(Date.now()),
    }));

    saveMessages.mutate(messages, {
      onSuccess: () => {
        toast.success(
          `💾 Saved ${messages.length} message${messages.length !== 1 ? "s" : ""}!`,
        );
        setText("");
      },
      onError: () => {
        toast.error("Failed to save messages");
      },
    });
  };

  const lineCount = text.split("\n").filter((l) => l.trim().length > 0).length;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      data-ocid="overlay.panel"
    >
      <AnimatePresence mode="sync">
        {expanded && (
          <motion.div
            key="overlay-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-80 bg-snap-card border border-snap-border rounded-2xl shadow-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.6), 0 0 30px oklch(0.91 0.19 100 / 0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-snap-border bg-snap-card2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-snap-yellow rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-snap-bg" fill="currentColor" />
                </div>
                <span className="text-sm font-bold text-snap-text">
                  Save Messages
                </span>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-snap-card text-snap-muted hover:text-snap-text transition-colors"
                aria-label="Minimize overlay"
                data-ocid="overlay.close_button"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <Input
                placeholder="Conversation name..."
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                className="bg-snap-card2 border-snap-border text-snap-text placeholder:text-snap-muted text-sm rounded-lg focus:border-snap-yellow/50 focus:ring-snap-yellow/20"
                data-ocid="overlay.input"
              />
              <Input
                placeholder="Sender name..."
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="bg-snap-card2 border-snap-border text-snap-text placeholder:text-snap-muted text-sm rounded-lg focus:border-snap-yellow/50 focus:ring-snap-yellow/20"
                data-ocid="overlay.input"
              />
              <div className="relative">
                <Textarea
                  placeholder="Paste messages here, one per line..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="bg-snap-card2 border-snap-border text-snap-text placeholder:text-snap-muted text-sm rounded-lg resize-none focus:border-snap-yellow/50 focus:ring-snap-yellow/20"
                  data-ocid="overlay.textarea"
                />
                {lineCount > 0 && (
                  <div className="absolute bottom-2 right-2 bg-snap-yellow/10 border border-snap-yellow/20 rounded-md px-2 py-0.5">
                    <span className="text-xs font-bold text-snap-yellow">
                      {lineCount} line{lineCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>

              <Button
                className="w-full bg-snap-yellow text-snap-bg hover:bg-snap-yellow/90 font-bold text-sm rounded-xl py-5 shadow-yellow-glow"
                onClick={handleSaveAll}
                disabled={saveMessages.isPending}
                data-ocid="overlay.primary_button"
              >
                {saveMessages.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-snap-bg/30 border-t-snap-bg rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  `💾 Save All${lineCount > 0 ? ` (${lineCount})` : ""}`
                )}
              </Button>

              {lineCount > 0 && (
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="w-full text-xs text-snap-muted hover:text-snap-text transition-colors py-1"
                  data-ocid="overlay.cancel_button"
                >
                  Clear input
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-snap-yellow text-snap-bg font-bold text-sm px-4 py-3 rounded-2xl shadow-yellow-glow hover:bg-snap-yellow/90 transition-colors"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        data-ocid="overlay.toggle"
        aria-label={expanded ? "Minimize SnapCache" : "Open SnapCache"}
      >
        <Zap size={16} fill="currentColor" />
        <span>SnapCache</span>
        {expanded ? <Minus size={14} /> : <Maximize2 size={14} />}
      </motion.button>
    </div>
  );
}
