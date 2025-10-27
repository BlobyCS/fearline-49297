import { motion } from "framer-motion";
import { FaCopy, FaDiscord, FaGamepad, FaUsers } from "react-icons/fa";
import { toast } from "sonner";
import losSantosBg from "@/assets/los-santos-bg.jpg";

const Home = () => {
  const connectLink = "fivem://connect/fivem.fearline.eu:30120";

  const handleCopy = () => {
    navigator.clipboard.writeText(connectLink);
    toast.success("Připojovací link zkopírován!");
  };

  const features = [
    {
      icon: FaGamepad,
      title: "Kvalitní Roleplay",
      description: "Zažij autentický roleplay s profesionálním A-Teamem",
    },
    {
      icon: FaUsers,
      title: "Aktivní Komunita",
      description: "Přidej se k stovkám hráčů, kteří již hrají na Fearline",
    },
    {
      icon: FaDiscord,
      title: "Discord Podpora",
      description: "Náš tým je vždy připraven ti pomoci",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${losSantosBg})`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        
        {/* Glow effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-30 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(5 100% 60% / 0.15) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 z-20">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-bold mb-6 text-gradient drop-shadow-2xl">
                Fearline.eu
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                FiveM Roleplay komunita budovaná s vášní
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            >
              <div className="glass-strong rounded-lg p-4 flex items-center gap-3 group hover:glow-red transition-all">
                <code className="text-sm text-muted-foreground select-all">
                  {connectLink}
                </code>
                <motion.button
                  onClick={handleCopy}
                  className="p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaCopy className="text-lg" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-muted-foreground"
            >
              Zkopíruj link a vlož ho do FiveM konzole (F8)
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Proč hrát na <span className="text-gradient">Fearline</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jsme komunita, která si váží každého hráče a snažíme se nabídnout
              nejlepší roleplay zážitek
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-8 text-center space-y-4 hover:glow-red transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                  <feature.icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <a
              href="https://discord.gg/fearline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-8 py-4 rounded-lg bg-[#5865F2] text-white font-semibold text-lg hover:bg-[#4752C4] transition-all flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDiscord className="text-2xl" />
                Připoj se na Discord
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
