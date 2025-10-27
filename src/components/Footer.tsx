import { motion } from "framer-motion";
import { FaDiscord, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="glass-strong mt-20 border-t border-[#ff3333]/20">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-[#cccccc]"
          >
            <span className="font-semibold">© 2024 Fearline.eu</span>
            <span>•</span>
            <span className="flex items-center gap-2">
              Vytvořeno s <FaHeart className="text-[#ff3333] inline" />
            </span>
          </motion.div>

          <motion.a
            href="https://discord.gg/2X8YFkcTRt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-8 py-4 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:shadow-[0_0_40px_rgba(88,101,242,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDiscord className="text-2xl" />
            <span>Připoj se na Discord</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
