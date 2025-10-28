import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDiscordAuth } from "@/contexts/DiscordAuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";

const DiscordCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useDiscordAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      
      if (!code) {
        toast.error('Chybí autorizační kód');
        navigate('/auth');
        return;
      }

      try {
        const redirectUri = `${window.location.origin}/auth/callback`;
        // Call edge function with the code and redirect_uri
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
        navigate('/auth');
      }
    };

    handleCallback();
  }, [searchParams, login, navigate]);

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
};

export default DiscordCallback;
