
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AgeVerificationPage from "./pages/AgeVerificationPage";
import HomePage from "./pages/HomePage";
import SextingGeneratorPage from "./pages/SextingGeneratorPage";
import DirtyTalkIdeasPage from "./pages/DirtyTalkIdeasPage";
import EroticChatPage from "./pages/EroticChatPage";
import IncomeCalculatorPage from "./pages/IncomeCalculatorPage";
import AnniversaryIdeasPage from "./pages/AnniversaryIdeasPage";
import FirstDateIdeasPage from "./pages/FirstDateIdeasPage";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => {
  const [isVerified, setIsVerified] = useState<boolean>(
    localStorage.getItem("age-verified") === "true"
  );

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setIsVerified(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {!isVerified ? (
                <>
                  <Route path="/verify-age" element={<AgeVerificationPage onVerify={handleVerify} />} />
                  <Route path="*" element={<Navigate to="/verify-age" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sexting-generator" element={<SextingGeneratorPage />} />
                  <Route path="/dirty-talk-ideas" element={<DirtyTalkIdeasPage />} />
                  <Route path="/erotic-chat" element={<EroticChatPage />} />
                  <Route path="/income-calculator" element={<IncomeCalculatorPage />} />
                  <Route path="/anniversary-ideas" element={<AnniversaryIdeasPage />} />
                  <Route path="/first-date-ideas" element={<FirstDateIdeasPage />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
