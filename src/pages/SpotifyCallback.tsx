import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      setError(errorParam);
      return;
    }

    if (!code) {
      setStatus("error");
      setError("Missing authorization code");
      return;
    }

    const exchangeCode = async () => {
      try {
        setStatus("processing");

        const response = await fetch("http://localhost:3000/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Token exchange failed");
        }

        const data = await response.json();

        if (data.success) {
          setStatus("success");
        } else {
          throw new Error(data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    exchangeCode();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              🎵 Spotify Callback
            </h1>
            <p className="text-muted-foreground">
              Zpracovávám autorizaci...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Úspěch! Tracker nyní běží.
            </h1>
            <p className="text-muted-foreground mb-4">
              Podívejte se do terminálu pro statistiky.
            </p>
            <code className="text-xs bg-muted px-3 py-2 rounded mt-2 inline-block">
              http://localhost:3000
            </code>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Chyba
            </h1>
            <p className="text-muted-foreground mb-4">
              {error || "Něco se pokazilo"}
            </p>
            <p className="text-sm text-muted-foreground">
              Zkuste to prosím znovu.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotifyCallback;
