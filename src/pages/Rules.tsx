import { motion } from "framer-motion";
import { FaGamepad, FaDiscord, FaUserShield, FaShieldAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const Rules = () => {

  const ruleCategories = [
    {
      id: "game",
      label: "Herní pravidla",
      icon: FaGamepad,
      color: "from-primary to-accent",
      badge: "RP",
      badgeColor: "bg-primary",
    },
    {
      id: "discord",
      label: "Discord pravidla",
      icon: FaDiscord,
      color: "from-secondary to-accent",
      badge: "Komunita",
      badgeColor: "bg-secondary",
    },
    {
      id: "admin",
      label: "Admin pravidla",
      icon: FaUserShield,
      color: "from-accent to-primary",
      badge: "A-Team",
      badgeColor: "bg-accent",
    },
  ];

  const allRules = [
    {
      category: "game",
      title: "Základní pravidla RP",
      content:
        "Roleplay musí být realistický. Žádné RDM (Random Deathmatch), VDM (Vehicle Deathmatch) či fail RP.",
      tags: ["RP", "RDM", "VDM"],
    },
    {
      category: "game",
      title: "Komunikace",
      content:
        "Ve hře je povinná komunikace přes Discord nebo TeamSpeak. Respektuj ostatní hráče.",
      tags: ["Komunikace", "Discord"],
    },
    {
      category: "game",
      title: "Meta Gaming",
      content:
        "Informace získané mimo hru (Discord, stream) nesmí být použity in-game.",
      tags: ["Metagaming", "Zakázáno"],
    },
    {
      category: "game",
      title: "New Life Rule",
      content:
        "Po smrti zapomeneš vše, co se stalo před smrtí. Nemůžeš se vrátit na místo smrti 15 minut.",
      tags: ["NLR", "Smrt"],
    },
    {
      category: "game",
      title: "Power Gaming",
      content:
        "Zakázáno nutit ostatní hráče do nevýhodných situací bez možnosti reakce.",
      tags: ["PowerGaming", "Zakázáno"],
    },
    {
      category: "discord",
      title: "Respekt",
      content:
        "Respektuj všechny členy komunity. Žádné urážky, rasismus či hate speech.",
      tags: ["Respekt", "Toxicita"],
    },
    {
      category: "discord",
      title: "Spam",
      content:
        "Neposílej spam, flood nebo zbytečně nepinguj členy A-Teamu.",
      tags: ["Spam", "Flood"],
    },
    {
      category: "discord",
      title: "Obsah",
      content:
        "Zákaz NSFW obsahu, reklamy nebo jiného nevhodného materiálu.",
      tags: ["NSFW", "Zakázáno"],
    },
    {
      category: "discord",
      title: "Kanály",
      content:
        "Piš pouze do příslušných kanálů. Dodržuj strukturu serveru.",
      tags: ["Kanály", "Struktura"],
    },
    {
      category: "admin",
      title: "Fair Play",
      content:
        "Adminové musí být nestranní a fair ke všem hráčům bez rozdílu.",
      tags: ["FairPlay", "Nestrannost"],
    },
    {
      category: "admin",
      title: "Důkazy",
      content:
        "Každý ban nebo kick musí být podložen důkazy (video, screenshot).",
      tags: ["Důkazy", "Ban"],
    },
    {
      category: "admin",
      title: "Komunikace",
      content:
        "Před potrestáním hráče vždy vyslechni obě strany příběhu.",
      tags: ["Komunikace", "Fair"],
    },
    {
      category: "admin",
      title: "Abuse",
      content:
        "Zneužití admin pravomocí povede k okamžitému odebrání pozice.",
      tags: ["Abuse", "Zakázáno"],
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
          <div className="inline-flex items-center justify-center mb-6">
            <FaShieldAlt className="text-6xl text-primary animate-float" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Pravidla</span> serveru
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Přečti si naše pravidla a dodržuj je pro bezproblémovou hru
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {ruleCategories.map((category, index) => {
            const Icon = category.icon;
            const categoryRules = allRules.filter((r) => r.category === category.id);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}
                >
                  <Icon className="text-3xl text-white" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-2xl font-bold">{category.label}</h3>
                  <Badge className={`${category.badgeColor} text-white`}>
                    {category.badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {categoryRules.length} pravidel
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Rules Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {allRules.map((rule, index) => {
                const category = ruleCategories.find((c) => c.id === rule.category);
                return (
                  <AccordionItem
                    key={index}
                    value={`rule-${index}`}
                    className="glass rounded-xl px-6 border-none"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4 text-left">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-lg font-semibold">{rule.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2">
                      <p className="text-muted-foreground leading-relaxed mb-4 pl-14">
                        {rule.content}
                      </p>
                      <div className="flex flex-wrap gap-2 pl-14">
                        {rule.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="border-primary/30 text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </motion.div>

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
