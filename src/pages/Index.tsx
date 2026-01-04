import { Heart, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center space-y-8 max-w-md w-full relative z-10">
        {/* Icon */}
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-500/20 flex items-center justify-center shadow-2xl shadow-red-500/20">
            <XCircle className="w-14 h-14 text-red-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div 
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Projekt ukončen
          </h1>
          <p className="text-zinc-400 text-lg flex items-center justify-center gap-2">
            Děkujeme za vše <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
          </p>
        </motion.div>

        {/* Card with reasons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 space-y-5">
              <h2 className="text-xl font-semibold text-white tracking-wide">Důvody ukončení</h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 transition-all hover:bg-white/10">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50" />
                  <span className="text-zinc-200">Osobní důvody</span>
                </li>
                <li className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 transition-all hover:bg-white/10">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50" />
                  <span className="text-zinc-200">Hosting</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer text */}
        <motion.p 
          className="text-zinc-600 text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          FEARLINE • 2025 - 2026
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
