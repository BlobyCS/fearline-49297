import { motion } from "framer-motion";
import { FaCrown, FaUserShield, FaHeadset } from "react-icons/fa";
import blobyczAvatar from "@/assets/team/blobycz.webp";
import thedizAvatar from "@/assets/team/thediz.png";

const ATeam = () => {
  const teamMembers = [
    {
      name: "BlobyCZ",
      role: "Majitel",
      roleColor: "bg-red-600",
      icon: FaCrown,
      avatar: blobyczAvatar,
    },
    {
      name: "TheDiz",
      role: "Majitel",
      roleColor: "bg-red-600",
      icon: FaCrown,
      avatar: thedizAvatar,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Náš <span className="text-gradient">A-Team</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Poznej lidi, kteří se starají o chod serveru a jsou tu pro tebe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 text-center space-y-4 hover:glow-red transition-all group"
              >
                <motion.div
                  className="relative mx-auto w-32 h-32"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/50 opacity-20 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full border-4 border-border object-cover relative z-10"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center z-20">
                    <Icon className="text-white text-lg" />
                  </div>
                </motion.div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold ${member.roleColor}`}
                  >
                    {member.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-strong rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Chceš se přidat?</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Hledáme aktivní a zodpovědné lidi do našeho týmu. Máš zájem?
              Podívej se na volné pozice!
            </p>
            <motion.a
              href="/nabor"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Zobrazit nábor
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ATeam;
