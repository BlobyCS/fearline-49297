import { motion } from "framer-motion";
import { FaTools, FaCrown, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const VIP = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Animated Icon */}
          <motion.div
            className="relative inline-flex items-center justify-center w-40 h-40 mb-12"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl" />
            <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaTools className="text-7xl text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaCrown className="text-5xl text-primary" />
              <h1 className="text-5xl md:text-7xl font-black">
                <span className="text-gradient">VIP</span> Sekce
              </h1>
              <FaStar className="text-5xl text-accent" />
            </div>
          </motion.div>

          {/* Content Card */}
          <motion.div
            className="glass-strong rounded-3xl p-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 59, 48, 0.2)",
                    "0 0 40px rgba(255, 59, 48, 0.4)",
                    "0 0 20px rgba(255, 59, 48, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaTools className="text-primary" />
                <span className="text-primary font-bold">V PŘÍPRAVĚ</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-black">
                Připravujeme něco <span className="text-gradient">speciálního</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Právě pracujeme na VIP systému s exkluzivními benefity pro naše
                nejaktivnější hráče. Brzy zde najdeš informace o VIP balíčcích,
                výhodách a možnostech podpory našeho serveru.
              </p>
            </div>

            {/* Loading Animation */}
            <div className="flex items-center justify-center gap-3 pt-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-4 pt-6">
              {[
                { icon: FaCrown, text: "Exkluzivní výhody" },
                { icon: FaStar, text: "Prémiový obsah" },
                { icon: FaTools, text: "Speciální podpora" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-3"
                >
                  <feature.icon className="text-2xl text-primary" />
                  <span className="text-sm font-semibold">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 space-y-4"
          >
            <p className="text-muted-foreground text-lg">
              Máš nápad na VIP benefit? Podělej se s námi!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <a
                href="https://discord.gg/fearline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Navštívit Discord
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VIP;
