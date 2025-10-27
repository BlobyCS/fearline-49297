import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import ATeam from "./pages/ATeam";
import VIP from "./pages/VIP";
import Recruitment from "./pages/Recruitment";
import NotFound from "./pages/NotFound";
import DiscordAuth from "./pages/DiscordAuth";
import DiscordCallback from "./pages/DiscordCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<DiscordAuth />} />
          <Route path="/auth/callback" element={<DiscordCallback />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/pravidla" element={<Layout><Rules /></Layout>} />
          <Route path="/ateam" element={<Layout><ATeam /></Layout>} />
          <Route path="/vip" element={<Layout><VIP /></Layout>} />
          <Route path="/nabor" element={<Layout><Recruitment /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
