import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PixelCursor } from "@/components/ui/PixelCursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HUD from "./components/HUD";
import { useEffect, useRef, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const tryPlay = () => {
      audio.muted = false;
      audio.play().catch(() => {});
    };

    if (audio) {
      audio.play().catch(() => {
        // Browser blocked autoplay
        window.addEventListener("click", () => {
          setUserInteracted(true);
          tryPlay();
        }, { once: true });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PixelCursor />
        <HUD />
        <audio
          ref={audioRef}
          src="/minecraft.mp3"
          autoPlay
          loop
          muted={!userInteracted}
          playsInline
          preload="auto"
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
