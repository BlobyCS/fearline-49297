import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DiscordAuthProvider } from "./contexts/DiscordAuthContext";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <DiscordAuthProvider>
      <App />
    </DiscordAuthProvider>
  </AuthProvider>
);
