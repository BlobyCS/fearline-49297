import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDiscordAuth } from "@/contexts/DiscordAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DiscordAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useDiscordAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleCallback(code);
    }
  }, [searchParams, login, navigate]);

  const handleCallback = async (code: string) => {
    try {
      const redirectUri = `${window.location.origin}/#/discord-auth`;
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discord-auth?code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      const data = await response.json();

      if (data.success && data.session) {
        login(data.session);
        toast.success(`Přihlášen jako @${data.session.discord_username}!`);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Discord auth error:', error);
      toast.error('Nepodařilo se přihlásit přes Discord');
    }
  };

  const handleLogin = () => {
    const clientId = "1266090505117372570";
    const redirectUri = encodeURIComponent(`${window.location.origin}/#/discord-auth`);
    const scope = "identify";
    
    const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
    
    window.location.href = authUrl;
  };

  // Show loading state when processing callback
  if (searchParams.get('code')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <FaDiscord className="text-6xl text-[#5865F2]" />
          </motion.div>
          <p className="text-xl text-[#cccccc]">Přihlašuji...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl p-12 max-w-md w-full text-center"
      >
        <motion.div
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <FaDiscord className="text-8xl text-[#5865F2]" style={{
            filter: "drop-shadow(0 0 30px rgba(88, 101, 242, 0.5))"
          }} />
        </motion.div>

        <h1 className="text-4xl font-black text-gradient mb-4">
          Přihlášení
        </h1>
        
        <p className="text-[#cccccc] mb-8 text-lg">
          Přihlas se pomocí Discord účtu pro přístup k webu
        </p>

        <motion.button
          onClick={handleLogin}
          className="w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:shadow-[0_0_40px_rgba(88,101,242,0.5)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDiscord className="text-2xl" />
          <span>Přihlásit se přes Discord</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DiscordAuth;
