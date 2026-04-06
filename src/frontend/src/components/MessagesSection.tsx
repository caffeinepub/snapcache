import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Copy,
  MessageSquare,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Message } from "../backend.d";
import {
  useClearAllMessages,
  useDeleteMessage,
  useMessages,
} from "../hooks/useQueries";

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts)).toLocaleString();
}

function groupByConversation(messages: Message[]): Record<string, Message[]> {
  return messages.reduce(
    (acc, msg) => {
      const key = msg.conversation || "Unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(msg);
      return acc;
    },
    {} as Record<string, Message[]>,
  );
}

export default function MessagesSection() {
  const { data: messages, isLoading, isError, refetch } = useMessages();
  const deleteMessage = useDeleteMessage();
  const clearAll = useClearAllMessages();

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleCopyAll = () => {
    if (!messages || messages.length === 0) return;
    const text = messages
      .map((m) => `[${m.conversation}] ${m.sender}: ${m.content}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${messages.length} messages to clipboard!`);
  };

  const handleDelete = (id: string) => {
    deleteMessage.mutate(id, {
      onSuccess: () => toast.success("Message deleted"),
      onError: () => toast.error("Failed to delete"),
    });
  };

  const handleClearAll = () => {
    clearAll.mutate(undefined, {
      onSuccess: () => toast.success("All messages cleared"),
      onError: () => toast.error("Failed to clear messages"),
    });
  };

  const grouped = messages ? groupByConversation(messages) : {};
  const conversationKeys = Object.keys(grouped);

  return (
    <section id="messages" className="py-24 border-t border-snap-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-snap-yellow">
                Saved Messages
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-1 text-snap-text">
                Your Message Archive
              </h2>
              <p className="text-snap-muted text-sm mt-2">
                {messages
                  ? `${messages.length} messages across ${conversationKeys.length} conversation${conversationKeys.length !== 1 ? "s" : ""}`
                  : "Loading..."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                className="text-snap-muted hover:text-snap-text border border-snap-border rounded-lg"
                data-ocid="messages.secondary_button"
              >
                <RefreshCw size={14} className="mr-2" />
                Refresh
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAll}
                disabled={!messages || messages.length === 0}
                className="text-snap-muted hover:text-snap-text border border-snap-border rounded-lg"
                data-ocid="messages.secondary_button"
              >
                <Copy size={14} className="mr-2" />
                Copy All
              </Button>
              <Button
                size="sm"
                onClick={handleClearAll}
                disabled={
                  clearAll.isPending || !messages || messages.length === 0
                }
                className="bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30 rounded-lg"
                data-ocid="messages.delete_button"
              >
                <Trash2 size={14} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-4" data-ocid="messages.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-32 w-full bg-snap-card rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div
            className="flex flex-col items-center gap-4 py-16 text-center"
            data-ocid="messages.error_state"
          >
            <AlertCircle size={40} className="text-destructive" />
            <p className="text-snap-muted">Failed to load messages.</p>
            <Button
              variant="ghost"
              onClick={() => refetch()}
              className="border border-snap-border text-snap-muted hover:text-snap-text"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && messages && messages.length === 0 && (
          <motion.div
            className="flex flex-col items-center gap-4 py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="messages.empty_state"
          >
            <div className="w-16 h-16 bg-snap-card border border-snap-border rounded-2xl flex items-center justify-center">
              <MessageSquare size={28} className="text-snap-muted" />
            </div>
            <h3 className="font-display font-bold text-lg text-snap-text">
              No saved messages yet
            </h3>
            <p className="text-snap-muted text-sm max-w-sm">
              Use the floating overlay in the bottom-right corner to paste and
              save your Snapchat messages.
            </p>
          </motion.div>
        )}

        {/* Messages grouped by conversation */}
        {!isLoading && !isError && messages && messages.length > 0 && (
          <div className="space-y-8" data-ocid="messages.list">
            {conversationKeys.map((conv, convIdx) => (
              <motion.div
                key={conv}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: convIdx * 0.05 }}
              >
                {/* Conversation header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-snap-yellow/10 border border-snap-yellow/30 rounded-lg flex items-center justify-center">
                    <MessageSquare size={14} className="text-snap-yellow" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-snap-text">
                      {conv}
                    </h3>
                    <p className="text-xs text-snap-muted">
                      {grouped[conv].length} message
                      {grouped[conv].length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-snap-border ml-2" />
                </div>

                {/* Message cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {grouped[conv].map((msg, msgIdx) => (
                    <div
                      key={msg.id}
                      className="bg-snap-card border border-snap-border rounded-xl p-4 hover:border-snap-yellow/20 transition-colors group"
                      data-ocid={`messages.item.${msgIdx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-snap-yellow/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-snap-yellow">
                              {msg.sender.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-snap-text truncate max-w-[80px]">
                            {msg.sender}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.content)}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-snap-card2 text-snap-muted hover:text-snap-yellow transition-colors"
                            title="Copy message"
                            data-ocid="messages.secondary_button"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(msg.id)}
                            disabled={deleteMessage.isPending}
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-destructive/20 text-snap-muted hover:text-destructive transition-colors"
                            title="Delete message"
                            data-ocid="messages.delete_button"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-snap-text leading-relaxed line-clamp-3">
                        {msg.content}
                      </p>
                      <p className="text-xs text-snap-muted mt-2">
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
