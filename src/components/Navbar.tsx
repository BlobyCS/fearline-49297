import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaBook, FaUsers, FaCrown, FaEnvelope, FaDiscord, FaSignInAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={undefined} />
                      <AvatarFallback className="bg-[#ff3333] text-white text-sm">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-[#cccccc] text-sm">{user.email?.split('@')[0]}</span>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-[#333]">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                      <FaCog className="text-sm" />
                      <span>Nastavení</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <FaCrown className="text-sm text-[#ff3333]" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-[#333]" />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center gap-2 cursor-pointer text-red-400"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Odhlásit se</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <motion.div
                  className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff3333] to-[#ff6666] text-white hover:from-[#ff4444] hover:to-[#ff7777] transition-all font-semibold shadow-[0_0_15px_rgba(255,51,51,0.3)] hover:shadow-[0_0_25px_rgba(255,51,51,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="hidden md:inline">Přihlásit</span>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
