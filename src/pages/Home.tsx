import { motion } from "framer-motion";
import { FaCopy, FaDiscord, FaGamepad, FaUsers, FaServer, FaCode } from "react-icons/fa";
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
      title: "Kvalitní Roleplay",
      description: "Zažij autentický roleplay s profesionálním A-Teamem a unikátními skripty",
      gradient: "from-primary to-accent",
    },
    {
      icon: FaUsers,
      title: "Aktivní Komunita",
      description: "Přidej se k stovkám hráčů, kteří již hrají na Fearline denně",
      gradient: "from-secondary to-accent",
    },
    {
      icon: FaDiscord,
      title: "Discord Podpora",
      description: "Náš tým je vždy připraven ti pomoci 24/7 na našem Discord serveru",
      gradient: "from-accent to-primary",
    },
  ];

  const stats = [
    { label: "Aktivních hráčů", value: "500+", icon: FaUsers },
    { label: "Vlastních scriptů", value: "100+", icon: FaCode },
    { label: "Server uptime", value: "99.9%", icon: FaServer },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with enhanced overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${losSantosBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        
        {/* Enhanced glow effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-40 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(5 100% 60% / 0.2) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 z-20">
          <div className="text-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <motion.img
                src={logo}
                alt="Fearline.eu"
                className="h-32 w-auto drop-shadow-2xl"
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 20px hsl(5 100% 60% / 0.3))",
                    "drop-shadow(0 0 40px hsl(5 100% 60% / 0.5))",
                    "drop-shadow(0 0 20px hsl(5 100% 60% / 0.3))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-gradient drop-shadow-2xl leading-tight">
                Fearline.eu
              </h1>
              <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-medium">
                FiveM Roleplay komunita budovaná s vášní pro perfektní zážitek
              </p>
            </motion.div>

            {/* Connect Button Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-6 mt-12"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  onClick={handleConnect}
                  size="lg"
                  variant="gradient"
                  className="text-lg px-12 py-7 rounded-2xl font-bold shadow-2xl hover:shadow-[0_0_50px_rgba(255,59,48,0.5)] transition-all duration-300"
                >
                  <FaGamepad className="text-2xl" />
                  Připojit se k serveru
                </Button>
                
                <Button
                  onClick={handleCopy}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-7 rounded-2xl font-semibold"
                >
                  <FaCopy className="text-xl" />
                  Zkopírovat IP
                </Button>
              </div>

              <div className="glass-strong rounded-xl p-4 max-w-md">
                <code className="text-sm text-muted-foreground select-all break-all">
                  {connectLink}
                </code>
              </div>

              <p className="text-sm text-muted-foreground">
                nebo vlož IP do FiveM konzole (F8)
              </p>
            </motion.div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-8 h-14 border-2 border-primary rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-background/20">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [0, 20, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
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
                  className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
                >
                  <Icon className="text-5xl text-primary mx-auto mb-4" />
                  <div className="text-4xl font-black text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Proč hrát na <span className="text-gradient">Fearline</span>?
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Jsme komunita, která si váží každého hráče a snažíme se nabídnout
              nejlepší roleplay zážitek v České republice
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-strong rounded-2xl p-8 text-center space-y-6 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                  <feature.icon className="text-4xl text-white" />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass-strong rounded-3xl p-12 max-w-3xl mx-auto">
              <h3 className="text-4xl font-black mb-6">
                Připoj se k naší <span className="text-gradient">komunitě</span>
              </h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Máš dotazy? Potřebuješ pomoc? Náš tým je připraven ti pomoct
                na našem Discord serveru, kde najdeš přátelskou komunitu a
                veškeré informace o serveru.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-[0_0_50px_rgba(88,101,242,0.5)] transition-all duration-300"
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
