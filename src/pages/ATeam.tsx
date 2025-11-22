import { motion } from "framer-motion";
import { FaCrown, FaCode, FaHeadset, FaShieldAlt, FaUsers } from "react-icons/fa";
import { FaDiscord, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blobyczAvatar from "@/assets/team/blobycz.webp";
import thedizAvatar from "@/assets/team/thediz.png";
import tomiokladaAvatar from "@/assets/team/tomioklada.png";
import bednqggAvatar from "@/assets/team/bednqgg.png";
import kuciikAvatar from "@/assets/team/kuciik.png";
import { IconType } from "react-icons";

interface TeamMember {
  name: string;
  role: string;
  roleColor: string;
  icon: IconType;
  avatar: string;
  description: string;
  email?: string;
  instagram?: string;
  github?: string;
  discord?: string;
}

interface TeamSection {
  title: string;
  gradient: string;
  borderColor: string;
  members: TeamMember[];
}

const ATeam = () => {
  const owners: TeamMember[] = [
    {
      name: "BlobyCZ",
      role: "Majitel",
      roleColor: "bg-gradient-to-r from-red-600 to-red-700",
      icon: FaCrown,
      avatar: blobyczAvatar,
      description: "Zakladatel a hlavní admin serveru. Řídí celý projekt a rozhoduje o jeho směřování.",
      email: "michal@bloby.eu",
      instagram: "blobycz",
      github: "Bloby22",
      discord: "1178258199590228078",
    },
    {
      name: "TheDiz",
      role: "Majitel",
      roleColor: "bg-gradient-to-r from-red-600 to-red-700",
      icon: FaCrown,
      avatar: thedizAvatar,
      description: "Spoluzakladatel a technický správce. Stará se o infrastrukturu serveru.",
      email: "diz@fearline.eu",
    },
  ];

  const developers: TeamMember[] = [
    {
      name: "BednqGG",
      role: "Developer",
      roleColor: "bg-gradient-to-r from-purple-600 to-purple-700",
      icon: FaCode,
      avatar: bednqggAvatar,
      description: "Hlavní vývojář vlastních skriptů. Zodpovídá za nové funkce a optimalizaci.",
      email: "filipbenda32@seznam.cz",
      instagram: "_.bedna._",
      github: "BednqGG",
      discord: "1295789713818517575",
    },
    {
      name: "Kuciik",
      role: "Developer",
      roleColor: "bg-gradient-to-r from-purple-600 to-purple-700",
      icon: FaCode,
      avatar: kuciikAvatar,
      description: "Backend developer. Vyvíjí a vylepšuje herní mechaniky a systémy.",
      email: "kcr.com@email.cz",
      instagram: "majkyc_",
      discord: "1064215350390042644",
    },
  ];

  const helpers: TeamMember[] = [
    {
      name: "Tomioklada",
      role: "Helper",
      roleColor: "bg-gradient-to-r from-green-600 to-green-700",
      icon: FaHeadset,
      avatar: tomiokladaAvatar,
      description: "Support specialista. Pomáhá hráčům s dotazy a řeší jejich problémy.",
    },
  ];

  const teamSections: TeamSection[] = [
    {
      title: "Majitelé",
      gradient: "from-red-600 to-red-700",
      borderColor: "border-red-600/30",
      members: owners,
    },
    {
      title: "Developeři",
      gradient: "from-purple-600 to-purple-700",
      borderColor: "border-purple-600/30",
      members: developers,
    },
    {
      title: "Pomocníci",
      gradient: "from-green-600 to-green-700",
      borderColor: "border-green-600/30",
      members: helpers,
    },
  ];

  const roles = [
    {
      title: "Majitel",
      color: "from-red-600 to-red-700",
      badge: "bg-red-600",
      icon: FaCrown,
      description: "Řídí server, rozhoduje o jeho směřování a má konečné slovo ve všech rozhodnutích",
    },
    {
      title: "Developer",
      color: "from-purple-600 to-purple-700",
      badge: "bg-purple-600",
      icon: FaCode,
      description: "Vyvíjí vlastní skripty, vylepšuje funkce a optimalizuje výkon serveru",
    },
    {
      title: "Support",
      color: "from-green-600 to-green-700",
      badge: "bg-green-600",
      icon: FaHeadset,
      description: "Pomáhá hráčům s dotazy, řeší problémy a poskytuje technickou podporu",
    },
    {
      title: "Admin",
      color: "from-blue-600 to-blue-700",
      badge: "bg-blue-600",
      icon: FaShieldAlt,
      description: "Dohlíží na dodržování pravidel, řeší reporty a moderuje server",
    },
  ];

  const renderMemberCard = (member: TeamMember, gradient: string, borderColor: string, index: number) => {
    const Icon = member.icon;
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="glass-strong rounded-3xl p-8 text-center space-y-6 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <motion.div
          className="relative mx-auto w-36 h-36"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.4 }}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-300`} />
          <img
            src={member.avatar}
            alt={member.name}
            className={`w-full h-full rounded-full border-4 ${borderColor} object-cover relative z-10 shadow-2xl`}
          />
          <motion.div
            className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center z-20 shadow-xl`}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="text-white text-xl" />
          </motion.div>
        </motion.div>

        <div className="space-y-3 relative z-10">
          <h3 className="text-2xl font-black">{member.name}</h3>
          <Badge
            className={`${member.roleColor} text-white px-5 py-1.5 text-sm font-bold shadow-lg`}
          >
            <Icon className="mr-2" />
            {member.role}
          </Badge>
          <p className="text-muted-foreground text-sm leading-relaxed px-2">
            {member.description}
          </p>
          
          {/* Social Links */}
          {(member.email || member.instagram || member.discord || member.github) && (
            <div className="flex justify-center gap-3 pt-3">
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
                >
                  <FaEnvelope className="text-xl" />
                </motion.a>
              )}
              {member.instagram && (
                <motion.a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-muted-foreground hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-pink-500/10"
                >
                  <FaInstagram className="text-xl" />
                </motion.a>
              )}
              {member.discord && (
                <motion.a
                  href={`https://discord.com/users/${member.discord}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-muted-foreground hover:text-[#5865F2] transition-colors p-2 rounded-lg hover:bg-[#5865F2]/10"
                >
                  <FaDiscord className="text-xl" />
                </motion.a>
              )}
              {member.github && (
                <motion.a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-muted-foreground hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  <FaGithub className="text-xl" />
                </motion.a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

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
          <motion.div 
            className="inline-flex items-center justify-center mb-8"
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <div 
              className="p-6 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #ff3333, #9933ff)",
                boxShadow: "0 0 60px rgba(255, 51, 51, 0.4)"
              }}
            >
              <FaUsers className="text-7xl text-white" />
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            Náš <span className="text-gradient">A-Team</span>
          </h1>
          <p className="text-[#cccccc] text-xl max-w-3xl mx-auto leading-relaxed">
            Poznej lidi, kteří se starají o chod serveru a jsou tu pro tebe každý den.
            Každý člen týmu přináší unikátní dovednosti a vášeň pro roleplay.
          </p>
        </motion.div>

        {/* Team Sections */}
        {teamSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-black text-center mb-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient">{section.title}</span>
            </motion.h2>
            <div className={`grid ${section.members.length === 1 ? 'md:grid-cols-1 max-w-md' : 'md:grid-cols-2 max-w-4xl'} gap-8 mx-auto`}>
              {section.members.map((member, index) => 
                renderMemberCard(member, section.gradient, section.borderColor, index)
              )}
            </div>
          </motion.div>
        ))}

        {/* Roles Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            Role v <span className="text-gradient">týmu</span>
          </h2>
          <p className="text-[#cccccc] text-center mb-12 max-w-2xl mx-auto">
            Každá role má svou důležitost a zodpovědnost
          </p>
          
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
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="glass rounded-2xl p-6 text-center space-y-4 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <motion.div
                    className={`mx-auto w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg relative z-10`}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-3xl text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold relative z-10">{role.title}</h3>
                  <Badge className={`${role.badge} text-white relative z-10`}>
                    {role.title}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {role.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="glass-strong rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-black text-center mb-8">
              Síla <span className="text-gradient">našeho týmu</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: owners.length + developers.length + helpers.length, label: "Členů týmu", icon: FaUsers },
                { number: "24/7", label: "Podpora", icon: FaHeadset },
                { number: developers.length, label: "Developerů", icon: FaCode },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-2xl p-6 text-center space-y-2"
                  >
                    <Icon className="text-4xl text-primary mx-auto mb-2" />
                    <div className="text-4xl font-black text-gradient">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
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
          <div className="glass-strong rounded-3xl p-12 max-w-3xl mx-auto space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
            
            <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 relative z-10"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <FaCrown className="text-4xl text-white" />
            </motion.div>
            
            <h3 className="text-4xl md:text-5xl font-black relative z-10">
              Chceš se <span className="text-gradient">přidat</span>?
            </h3>
            <p className="text-[#cccccc] text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
              Hledáme aktivní a zodpovědné lidi do našeho týmu. Pokud máš zájem
              pomáhat komunitě, bavit se u toho a být součástí něčeho většího, podívej se na volné pozice!
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 px-10 py-7 text-lg rounded-2xl font-bold shadow-2xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform relative z-10"
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
