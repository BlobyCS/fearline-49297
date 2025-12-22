import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const DiscordLinkCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const linkDiscord = async () => {
      const code = searchParams.get("code");
      
      if (!code) {
        setStatus("error");
        toast.error("Chybí autorizační kód");
        navigate("/profile");
        return;
      }

      if (!user) {
        setStatus("error");
        toast.error("Musíte být přihlášeni");
        navigate("/auth");
        return;
      }

      try {
        const redirectUri = "https://fearline.eu/discord-link-callback";
        
        const { data, error } = await supabase.functions.invoke("link-discord", {
          body: {
            code,
            redirect_uri: redirectUri,
            user_id: user.id,
          },
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          setStatus("success");
          toast.success(`Discord účet ${data.discord.username} byl úspěšně propojen!`);
          navigate("/profile");
        } else {
          throw new Error(data.error || "Propojení selhalo");
        }
      } catch (error) {
        console.error("Discord link error:", error);
        setStatus("error");
        toast.error("Nepodařilo se propojit Discord účet");
        navigate("/profile");
      }
    };

    linkDiscord();
  }, [searchParams, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Propojování Discord účtu...</p>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-red-500 mb-4">Propojení selhalo</p>
            <p className="text-muted-foreground">Přesměrování...</p>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-green-500 mb-4">Discord účet propojen!</p>
            <p className="text-muted-foreground">Přesměrování...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DiscordLinkCallback;
