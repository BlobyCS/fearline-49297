import { Heart, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Projekt ukončen</h1>
          <p className="text-zinc-400 text-lg flex items-center justify-center gap-2">
            Děkujeme za vše <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </p>
        </div>

        {/* Card with reasons */}
        <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Důvody ukončení</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span className="text-zinc-300">Osobní důvody</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span className="text-zinc-300">Hosting</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer text */}
        <p className="text-zinc-500 text-sm">
          FEARLINE • 2025 - 2026
        </p>
      </div>
    </div>
  );
};

export default Index;
