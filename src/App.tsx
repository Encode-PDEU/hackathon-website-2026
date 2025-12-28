import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PixelCursor } from "@/components/ui/PixelCursor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/sections/LoadingScreen";
import HUD from "./components/HUD";
import JukeBox from "./components/JukeBox";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);



  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && (
          <div
            className="fixed inset-0 z-40"
            style={{
              background:
                "radial-gradient(circle at center, #1a1a1a 0%, #000 70%)"
            }}
          >
            <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          </div>
        )}
        <PixelCursor />
        {!isLoading && <HUD />}
        {!isLoading && <JukeBox />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isLoading={isLoading} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
