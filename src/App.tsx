import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import ATeam from "./pages/ATeam";
import VIP from "./pages/VIP";
import Recruitment from "./pages/Recruitment";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DiscordLinkCallback from "./pages/DiscordLinkCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/pravidla" element={<Layout><Rules /></Layout>} />
            <Route path="/ateam" element={<Layout><ATeam /></Layout>} />
            <Route path="/vip" element={<Layout><VIP /></Layout>} />
            <Route path="/nabor" element={<Layout><Recruitment /></Layout>} />
            <Route path="/auth" element={<Layout><Auth /></Layout>} />
            <Route path="/discord-link-callback" element={
              <Layout>
                <DiscordLinkCallback />
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/tickets" element={
              <Layout>
                <ProtectedRoute>
                  <Tickets />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/profile" element={
              <Layout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/admin" element={
              <Layout>
                <ProtectedRoute requireAdmin>
                  <AdminPanel />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
