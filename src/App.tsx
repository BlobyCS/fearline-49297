import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import ATeam from "./pages/ATeam";
import VIP from "./pages/VIP";
import Recruitment from "./pages/Recruitment";
import NotFound from "./pages/NotFound";
import DiscordAuth from "./pages/DiscordAuth";
import DiscordCallback from "./pages/DiscordCallback";
import SpotifyCallback from "./pages/SpotifyCallback";

import Auth from "./pages/Auth";
import Tickets from "./pages/Tickets";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/discord-auth" element={<DiscordAuth />} />
          <Route path="/auth/callback" element={<DiscordCallback />} />
          <Route path="/spotify/callback" element={<SpotifyCallback />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/pravidla" element={<Layout><Rules /></Layout>} />
          <Route path="/ateam" element={<Layout><ATeam /></Layout>} />
          <Route path="/vip" element={<Layout><VIP /></Layout>} />
          <Route path="/nabor" element={<Layout><Recruitment /></Layout>} />
          <Route path="/tickety" element={<Layout><ProtectedRoute><Tickets /></ProtectedRoute></Layout>} />
          <Route path="/profil" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
          <Route path="/nastaveni" element={<Layout><ProtectedRoute><Settings /></ProtectedRoute></Layout>} />
          <Route path="/admin" element={<Layout><ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
