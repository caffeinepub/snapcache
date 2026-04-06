import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import FeaturesSection from "./components/FeaturesSection";
import FloatingOverlay from "./components/FloatingOverlay";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import MessagesSection from "./components/MessagesSection";
import Navbar from "./components/Navbar";
import { useActor } from "./hooks/useActor";
import { useMessages, useSeedDemoMessages } from "./hooks/useQueries";

export default function App() {
  const { actor, isFetching: actorLoading } = useActor();
  const { data: messages } = useMessages();
  const seedMutation = useSeedDemoMessages();
  const seeded = useRef(false);

  useEffect(() => {
    if (
      actor &&
      !actorLoading &&
      messages !== undefined &&
      messages.length === 0 &&
      !seeded.current
    ) {
      seeded.current = true;
      seedMutation.mutate();
    }
  }, [actor, actorLoading, messages, seedMutation.mutate]);

  return (
    <div className="min-h-screen bg-snap-bg text-snap-text font-body">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.17 0.004 285)",
            border: "1px solid oklch(0.22 0.005 285)",
            color: "oklch(0.955 0.003 285)",
          },
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <MessagesSection />
      </main>
      <Footer />
      <FloatingOverlay />
    </div>
  );
}
