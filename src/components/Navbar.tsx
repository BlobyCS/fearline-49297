import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaBook, FaUsers, FaCrown, FaEnvelope } from "react-icons/fa";
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
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.img
              src={logo}
              alt="Fearline.eu Logo"
              className="h-12 w-auto"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <motion.h1
              className="text-2xl font-bold text-gradient hidden sm:block"
              whileHover={{ scale: 1.05 }}
            >
              Fearline.eu
            </motion.h1>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground glow-red"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden md:inline font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
