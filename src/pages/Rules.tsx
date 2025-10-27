import { motion } from "framer-motion";
import { useState } from "react";
import { FaGamepad, FaDiscord, FaUserShield } from "react-icons/fa";

const Rules = () => {
  const [activeCategory, setActiveCategory] = useState("game");

  const categories = [
    { id: "game", label: "Herní pravidla", icon: FaGamepad },
    { id: "discord", label: "Discord pravidla", icon: FaDiscord },
    { id: "admin", label: "Admin pravidla", icon: FaUserShield },
  ];

  const rules = {
    game: [
      {
        title: "1. Základní pravidla RP",
        content:
          "Roleplay musí být realistický. Žádné RDM (Random Deathmatch), VDM (Vehicle Deathmatch) či fail RP.",
      },
      {
        title: "2. Komunikace",
        content:
          "Ve hře je povinná komunikace přes Discord nebo TeamSpeak. Respektuj ostatní hráče.",
      },
      {
        title: "3. Meta Gaming",
        content:
          "Informace získané mimo hru (Discord, stream) nesmí být použity in-game.",
      },
      {
        title: "4. New Life Rule",
        content:
          "Po smrti zapomeneš vše, co se stalo před smrtí. Nemůžeš se vrátit na místo smrti 15 minut.",
      },
      {
        title: "5. Power Gaming",
        content:
          "Zakázáno nutit ostatní hráče do nevýhodných situací bez možnosti reakce.",
      },
    ],
    discord: [
      {
        title: "1. Respekt",
        content:
          "Respektuj všechny členy komunity. Žádné urážky, rasismus či hate speech.",
      },
      {
        title: "2. Spam",
        content:
          "Neposílej spam, flood nebo zbytečně nepinguj členy A-Teamu.",
      },
      {
        title: "3. Obsah",
        content:
          "Zákaz NSFW obsahu, reklamy nebo jiného nevhodného materiálu.",
      },
      {
        title: "4. Kanály",
        content:
          "Piš pouze do příslušných kanálů. Dodržuj strukturu serveru.",
      },
    ],
    admin: [
      {
        title: "1. Fair Play",
        content:
          "Adminové musí být nestranní a fair ke všem hráčům bez rozdílu.",
      },
      {
        title: "2. Důkazy",
        content:
          "Každý ban nebo kick musí být podložen důkazy (video, screenshot).",
      },
      {
        title: "3. Komunikace",
        content:
          "Před potrestáním hráče vždy vyslechni obě strany příběhu.",
      },
      {
        title: "4. Abuse",
        content:
          "Zneužití admin pravomocí povede k okamžitému odebrání pozice.",
      },
    ],
  };

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
            <span className="text-gradient">Pravidla</span> serveru
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Přečti si naše pravidla a dodržuj je pro bezproblémovou hru
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground glow-red"
                    : "glass hover:bg-secondary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="text-xl" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Rules Cards */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {rules[activeCategory as keyof typeof rules].map((rule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:glow-purple transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-3 text-primary">
                {rule.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {rule.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="glass-strong rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              <span className="text-primary font-semibold">Upozornění:</span>{" "}
              Neznalost pravidel tě neomlouvá. Za porušení pravidel můžeš být
              potrestán.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rules;
