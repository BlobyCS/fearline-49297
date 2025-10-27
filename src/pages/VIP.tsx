import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

const VIP = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-8"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FaTools className="text-6xl text-primary" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">VIP</span> Sekce
          </h1>

          <motion.div
            className="glass-strong rounded-xl p-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-2xl font-semibold text-muted-foreground">
              Tato stránka je aktuálně v údržbě
            </p>
            <p className="text-muted-foreground">
              Pracujeme na přípravě VIP benefitů pro naše hráče. Brzy zde
              najdeš informace o VIP balíčcích a jejich výhodách.
            </p>
            <div className="pt-6">
              <motion.div
                className="inline-flex space-x-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-primary"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Máš nápad na VIP benefit? Napiš nám na Discord!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default VIP;
