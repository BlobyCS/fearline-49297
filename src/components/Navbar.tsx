import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaBook, FaUsers, FaCrown, FaEnvelope, FaDiscord } from "react-icons/fa";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Domů", icon: FaHome },
    { path: "/pravidla", label: "Pravidla", icon: FaBook },
    { path: "/ateam", label: "A-Team", icon: FaUsers },
    { path: "/vip", label: "VIP", icon: FaCrown },
    { path: "/nabor", label: "Nábor", icon: FaEnvelope },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[#ff3333]/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.img
              src={logo}
              alt="Fearline.eu Logo"
              className="h-12 w-auto"
              style={{
                filter: "drop-shadow(0 0 10px #ff3333)"
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h1
              className="text-2xl font-black text-gradient hidden sm:block"
              whileHover={{ scale: 1.05 }}
            >
              FEARLINE
            </motion.h1>
          </Link>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all font-semibold ${
                      isActive
                        ? "bg-gradient-to-r from-[#ff3333] to-[#ff6666] text-white shadow-[0_0_20px_rgba(255,51,51,0.4)]"
                        : "text-[#cccccc] hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
            
            <motion.a
              href="https://discord.gg/4MAgM4RgTG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-semibold shadow-[0_0_15px_rgba(88,101,242,0.3)] hover:shadow-[0_0_25px_rgba(88,101,242,0.5)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDiscord className="text-lg" />
              <span className="hidden md:inline">Discord</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
