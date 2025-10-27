import { motion } from "framer-motion";
import { FaDiscord, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="glass-strong mt-20 border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <span>© 2024 Fearline.eu</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Vytvořeno s <FaHeart className="text-primary inline" />
            </span>
          </motion.div>

          <motion.a
            href="https://discord.gg/fearline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDiscord className="text-xl" />
            <span className="font-medium">Připoj se na Discord</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
