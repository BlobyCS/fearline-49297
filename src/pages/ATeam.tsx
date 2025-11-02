import { motion } from "framer-motion";
import { FaCrown, FaCode, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blobyczAvatar from "@/assets/team/blobycz.webp";
import thedizAvatar from "@/assets/team/thediz.png";
import tomiokladaAvatar from "@/assets/team/tomioklada.png";
import bednqggAvatar from "@/assets/team/bednqgg.png";
import kuciikAvatar from "@/assets/team/kuciik.png";

const ATeam = () => {
  const owners = [
    {
      name: "BlobyCZ",
      role: "Majitel",
      roleColor: "bg-gradient-to-r from-red-600 to-red-700",
      icon: FaCrown,
      avatar: blobyczAvatar,
      description: "Zakladatel a hlavní admin serveru",
    },
    {
      name: "TheDiz",
      role: "Majitel",
      roleColor: "bg-gradient-to-r from-red-600 to-red-700",
      icon: FaCrown,
      avatar: thedizAvatar,
      description: "Spoluzakladatel a technický správce",
    },
  ];

  const developers = [
    {
      name: "BednqGG",
      role: "Developer",
      roleColor: "bg-gradient-to-r from-purple-600 to-purple-700",
      icon: FaCode,
      avatar: bednqggAvatar,
      description: "Vyvíjí a vylepšuje vlastní skripty",
    },
    {
      name: "Kuciik",
      role: "Developer",
      roleColor: "bg-gradient-to-r from-purple-600 to-purple-700",
      icon: FaCode,
      avatar: kuciikAvatar,
      description: "Vyvíjí a vylepšuje vlastní skripty",
    },
  ];

  const helpers = [
    {
      name: "Tomioklada",
      role: "Helper",
      roleColor: "bg-gradient-to-r from-green-600 to-green-700",
      icon: FaHeadset,
      avatar: tomiokladaAvatar,
      description: "Pomáhá hráčům s jejich dotazy",
    },
  ];

  const roles = [
    {
      title: "Majitel",
      color: "from-red-600 to-red-700",
      badge: "bg-red-600",
      icon: FaCrown,
      description: "Řídí server a rozhoduje o jeho směřování",
    },
    {
      title: "Developer",
      color: "from-purple-600 to-purple-700",
      badge: "bg-purple-600",
      icon: FaCode,
      description: "Vyvíjí a vylepšuje vlastní skripty",
    },
    {
      title: "Support",
      color: "from-green-600 to-green-700",
      badge: "bg-green-600",
      icon: FaHeadset,
      description: "Pomáhá hráčům s jejich dotazy",
    },
    {
      title: "Admin",
      color: "from-blue-600 to-blue-700",
      badge: "bg-blue-600",
      icon: FaShieldAlt,
      description: "Dohlíží na dodržování pravidel",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <FaShieldAlt className="text-6xl text-primary animate-float" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Náš <span className="text-gradient">A-Team</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Poznej lidi, kteří se starají o chod serveru a jsou tu pro tebe
            každý den
          </p>
        </motion.div>

        {/* Owners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            <span className="text-gradient">Majitelé</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {owners.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-strong rounded-3xl p-10 text-center space-y-6 hover:shadow-2xl transition-all duration-300 group"
                >
                  <motion.div
                    className="relative mx-auto w-40 h-40"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-700 opacity-30 group-hover:opacity-50 blur-xl transition-opacity" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full border-4 border-red-600/30 object-cover relative z-10 shadow-2xl"
                    />
                    <motion.div
                      className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center z-20 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white text-2xl" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-black">{member.name}</h3>
                    <Badge
                      className={`${member.roleColor} text-white px-6 py-2 text-base font-bold shadow-lg`}
                    >
                      <Icon className="mr-2" />
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Developers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            <span className="text-gradient">Developeři</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {developers.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-strong rounded-3xl p-10 text-center space-y-6 hover:shadow-2xl transition-all duration-300 group"
                >
                  <motion.div
                    className="relative mx-auto w-40 h-40"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 opacity-30 group-hover:opacity-50 blur-xl transition-opacity" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full border-4 border-purple-600/30 object-cover relative z-10 shadow-2xl"
                    />
                    <motion.div
                      className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center z-20 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white text-2xl" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-black">{member.name}</h3>
                    <Badge
                      className={`${member.roleColor} text-white px-6 py-2 text-base font-bold shadow-lg`}
                    >
                      <Icon className="mr-2" />
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Helpers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            <span className="text-gradient">Pomocníci</span>
          </h2>
          <div className="grid md:grid-cols-1 gap-10 max-w-md mx-auto">
            {helpers.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-strong rounded-3xl p-10 text-center space-y-6 hover:shadow-2xl transition-all duration-300 group"
                >
                  <motion.div
                    className="relative mx-auto w-40 h-40"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-600 to-green-700 opacity-30 group-hover:opacity-50 blur-xl transition-opacity" />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full border-4 border-green-600/30 object-cover relative z-10 shadow-2xl"
                    />
                    <motion.div
                      className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center z-20 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white text-2xl" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-black">{member.name}</h3>
                    <Badge
                      className={`${member.roleColor} text-white px-6 py-2 text-base font-bold shadow-lg`}
                    >
                      <Icon className="mr-2" />
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Roles Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
            Role v <span className="text-gradient">týmu</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass rounded-2xl p-6 text-center space-y-4 hover:shadow-xl transition-all duration-300 group"
                >
                  <div
                    className={`mx-auto w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  <Badge className={`${role.badge} text-white`}>
                    {role.title}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {role.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass-strong rounded-3xl p-12 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
              <FaCrown className="text-4xl text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black">
              Chceš se <span className="text-gradient">přidat</span>?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Hledáme aktivní a zodpovědné lidi do našeho týmu. Pokud máš zájem
              pomáhat komunitě a bavit se u toho, podívej se na volné pozice!
            </p>
            <Button
              asChild
              size="lg"
              variant="gradient"
              className="mt-6 px-10 py-7 text-lg rounded-2xl font-bold shadow-2xl"
            >
              <a href="/nabor">
                Zobrazit nábor
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ATeam;
