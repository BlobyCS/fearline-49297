import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle Spotify callback logic here if needed
    // For now, just redirect to home
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Spotify Callback
        </h1>
        <p className="text-muted-foreground">Zpracovávám...</p>
      </div>
    </div>
  );
};

export default SpotifyCallback;
