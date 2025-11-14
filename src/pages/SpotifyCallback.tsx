import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SpotifyCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [error, setError] = useState(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setStatus("error");
      setError(errorParam);
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    if (!code) {
      setStatus("error");
      setError("Missing authorization code");
      setTimeout(() => navigate("/"), 3000);
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
          setTimeout(() => navigate("/"), 2000);
        } else {
          throw new Error(data.error || "Unknown error");
        }

      } catch (err) {
        console.error("Callback error:", err);
        setStatus("error");
        setError(err.message);
        setTimeout(() => navigate("/"), 3000);
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

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
              Úspěch!
            </h1>
            <p className="text-muted-foreground">
              Spotify tracking je připraven
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Přesměrování...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Chyba
            </h1>
            <p className="text-muted-foreground mb-2">
              {error || "Něco se pokazilo"}
            </p>
            <p className="text-sm text-muted-foreground">
              Přesměrování...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotifyCallback;
