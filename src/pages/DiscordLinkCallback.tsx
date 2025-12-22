import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DiscordLinkCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Propojování Discord účtu...");

  useEffect(() => {
    const linkDiscord = async () => {
      const code = searchParams.get("code");
      
      if (!code) {
        setStatus("error");
        setMessage("Chybí autorizační kód");
        toast.error("Chybí autorizační kód");
        setTimeout(() => navigate("/profile"), 2000);
        return;
      }

      // Wait for session to be available
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        // Store the code in sessionStorage and redirect to login
        sessionStorage.setItem("discord_link_code", code);
        setStatus("error");
        setMessage("Musíte být přihlášeni");
        toast.error("Musíte být přihlášeni pro propojení Discord účtu");
        setTimeout(() => navigate("/auth"), 2000);
        return;
      }

      try {
        setMessage("Propojování Discord účtu...");
        const redirectUri = "https://fearline.eu/discord-link-callback";
        
        console.log("Calling link-discord function with:", {
          code: code.substring(0, 10) + "...",
          redirect_uri: redirectUri,
          user_id: session.user.id,
        });
        
        const { data, error } = await supabase.functions.invoke("link-discord", {
          body: {
            code,
            redirect_uri: redirectUri,
            user_id: session.user.id,
          },
        });

        console.log("link-discord response:", { data, error });

        if (error) {
          console.error("Edge function error:", error);
          throw error;
        }

        if (data?.success) {
          setStatus("success");
          setMessage(`Discord účet ${data.discord.username} byl úspěšně propojen!`);
          toast.success(`Discord účet ${data.discord.username} byl úspěšně propojen!`);
          setTimeout(() => navigate("/profile"), 2000);
        } else {
          throw new Error(data?.error || "Propojení selhalo");
        }
      } catch (error) {
        console.error("Discord link error:", error);
        setStatus("error");
        setMessage("Nepodařilo se propojit Discord účet");
        toast.error("Nepodařilo se propojit Discord účet");
        setTimeout(() => navigate("/profile"), 2000);
      }
    };

    linkDiscord();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-red-500 text-4xl mb-4">✕</div>
            <p className="text-red-500 mb-2">{message}</p>
            <p className="text-muted-foreground text-sm">Přesměrování...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-green-500 mb-2">{message}</p>
            <p className="text-muted-foreground text-sm">Přesměrování...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DiscordLinkCallback;
