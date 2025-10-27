import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DiscordAuthProvider } from "./contexts/DiscordAuthContext";

createRoot(document.getElementById("root")!).render(
  <DiscordAuthProvider>
    <App />
  </DiscordAuthProvider>
);
