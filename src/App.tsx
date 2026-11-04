import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "@/pages/Index";
import TermsOfService from "@/pages/privacy/TermsOfService";
import PrivacyPolicy from "@/pages/privacy/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy/terms" element={<TermsOfService />} />
          <Route path="/privacy/policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

