import { motion } from "framer-motion";
import { FaCopy, FaDiscord, FaGamepad, FaUsers, FaServer, FaCode, FaShieldAlt, FaRocket } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import losSantosBg from "@/assets/los-santos-bg.jpg";
import logo from "@/assets/logo.png";

const Home = () => {
  const connectLink = "fivem://connect/fivem.fearline.eu:30120";

  const handleCopy = () => {
    navigator.clipboard.writeText(connectLink);
    toast.success("Připojovací link zkopírován!", {
      description: "Vlož ho do FiveM konzole (F8)",
    });
  };

  const handleConnect = () => {
    window.location.href = connectLink;
    toast.success("Připojuji k serveru...");
  };

  const features = [
    {
      icon: FaGamepad,
      title: "Real RP",
      description: "Autentický roleplay s profesionálními hráči a realistickými mechaniky",
      color: "#ff3333",
    },
    {
      icon: FaShieldAlt,
      title: "Whitelist",
      description: "Chráníme naši komunitu pomocí whitelist systému pro kvalitní zážitek",
      color: "#ff6666",
    },
    {
      icon: FaRocket,
      title: "Vlastní skripty",
      description: "Unikátní vlastní skripty vytvořené našim developerským týmem",
      color: "#ff3333",
    },
  ];

  const stats = [
    { label: "Aktivních hráčů", value: "0+", icon: FaUsers },
    { label: "Vlastních scriptů", value: "2+", icon: FaCode },
    { label: "Server uptime", value: "99.9%", icon: FaServer },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${losSantosBg})`,
            filter: "blur(8px) brightness(0.3)",
          }}
        />
        
        {/* Red glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff3333]/5 to-[#0f0f0f]" />
        
        {/* Content */}
        <div className="container mx-auto px-4 z-20 relative">
          <div className="text-center space-y-12">
            {/* Logo with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <motion.img
                src={logo}
                alt="Fearline.eu"
                className="h-40 w-auto"
                style={{
                  filter: "drop-shadow(0 0 40px #ff3333)",
                }}
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 40px #ff3333)",
                    "drop-shadow(0 0 60px #ff6666)",
                    "drop-shadow(0 0 40px #ff3333)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-7xl md:text-9xl font-black mb-6 text-gradient leading-tight">
                FEARLINE
              </h1>
              <p className="text-xl md:text-2xl text-[#cccccc] max-w-3xl mx-auto font-light">
                Nejkvalitnější FiveM Roleplay komunita v České republice
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  onClick={handleConnect}
                  size="lg"
                  className="text-lg px-14 py-8 rounded-2xl font-bold bg-gradient-to-r from-[#ff3333] to-[#ff6666] hover:from-[#ff6666] hover:to-[#ff3333] shadow-[0_0_40px_rgba(255,51,51,0.5)] hover:shadow-[0_0_60px_rgba(255,51,51,0.7)] transition-all duration-300"
                >
                  <FaGamepad className="text-2xl" />
                  Připojit se na server
                </Button>
                
                <Button
                  onClick={handleCopy}
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-8 rounded-2xl font-semibold border-2 border-[#ff3333] text-[#ff3333] hover:bg-[#ff3333]/10"
                >
                  <FaCopy className="text-xl" />
                  Zkopírovat IP
                </Button>
              </div>

              <div className="glass rounded-2xl p-6 max-w-md border border-[#ff3333]/20">
                <code className="text-sm text-[#cccccc] select-all">
                  {connectLink}
                </code>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-14 border-2 border-[#ff3333] rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-2 h-2 bg-[#ff3333] rounded-full"
              animate={{ y: [0, 20, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* O nás section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-6">
              O <span className="text-gradient">projektu</span>
            </h2>
            <p className="text-[#cccccc] text-xl max-w-4xl mx-auto leading-relaxed">
              Fearline.eu je FiveM Roleplay komunita, která si klade za cíl poskytovat
              nejkvalitnější roleplay zážitek. Naše komunita je postavená na respektu,
              přátelství a vášni pro dokonalý herní zážitek.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-strong rounded-3xl p-10 text-center space-y-6 glow-hover"
              >
                <div 
                  className="mx-auto w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    boxShadow: `0 0 30px ${feature.color}66`,
                  }}
                >
                  <feature.icon className="text-5xl text-white" />
                </div>
                <h3 className="text-3xl font-bold">{feature.title}</h3>
                <p className="text-[#cccccc] leading-relaxed text-lg">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-strong rounded-3xl p-10 text-center group hover:border-[#ff3333] transition-all duration-300"
                >
                  <Icon className="text-6xl text-[#ff3333] mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <div className="text-5xl font-black text-gradient mb-3">
                    {stat.value}
                  </div>
                  <div className="text-[#cccccc] font-medium text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="glass-strong rounded-3xl p-16 max-w-4xl mx-auto border border-[#ff3333]/20">
              <div className="mb-8">
                <FaDiscord className="text-8xl text-[#5865F2] mx-auto" />
              </div>
              <h3 className="text-5xl md:text-6xl font-black mb-8">
                Připoj se k <span className="text-gradient">komunitě</span>
              </h3>
              <p className="text-[#cccccc] mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
                Máš dotazy? Potřebuješ pomoc? Náš tým je připraven ti pomoct
                24/7 na našem Discord serveru.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-12 py-8 text-xl rounded-2xl shadow-[0_0_40px_rgba(88,101,242,0.5)] hover:shadow-[0_0_60px_rgba(88,101,242,0.7)] transition-all duration-300 font-bold"
              >
                <a
                  href="https://discord.gg/fearline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <FaDiscord className="text-3xl" />
                  Připoj se na Discord
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
