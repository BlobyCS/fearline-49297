import { motion } from "framer-motion";
import { FaBook, FaGamepad, FaComments, FaDiscord, FaGavel } from "react-icons/fa";
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
      category: "Základní pravidla RP",
      icon: FaGamepad,
      color: "#ff3333",
      badge: "RP",
      rules: [
        {
          title: "Powergaming (PG)",
          description: "Zakázáno provádět akce, které nejsou možné v reálném životě nebo ignorovat fyzické limity postavy."
        },
        {
          title: "Metagaming (MG)",
          description: "Zakázáno využívat informace získané mimo hru (Discord, stream) pro výhodu v roleplayi."
        },
        {
          title: "Random Deathmatch (RDM)",
          description: "Zakázáno zabíjet hráče bez roleplay důvodu nebo náležité interakce."
        },
        {
          title: "Vehicle Deathmatch (VDM)",
          description: "Zakázáno používat vozidlo jako zbraň bez roleplay důvodu."
        },
        {
          title: "Fear RP",
          description: "Povinnost realisticky reagovat na ohrožení života - strach, poslušnost při aim."
        }
      ]
    },
    {
      category: "OOC pravidla",
      icon: FaComments,
      color: "#ff6666",
      badge: "OOC",
      rules: [
        {
          title: "Respekt ke všem",
          description: "Respektuj ostatní hráče, A-Team a dodržuj slušné chování."
        },
        {
          title: "Toxicita",
          description: "Zakázáno urážet, diskriminovat nebo šikanovat ostatní hráče."
        },
        {
          title: "OOC komunikace v IC",
          description: "V roleplayi se nehovoří o věcech mimo hru - žádné zmínky o Discordu, streamu apod."
        },
        {
          title: "Stream sniping",
          description: "Zakázáno sledovat stream jiného hráče pro získání výhody."
        }
      ]
    },
    {
      category: "Discord pravidla",
      icon: FaDiscord,
      color: "#5865F2",
      badge: "Discord",
      rules: [
        {
          title: "Slušné chování",
          description: "Na Discordu platí stejná pravidla respektu jako ve hře."
        },
        {
          title: "Spam",
          description: "Nespamuj zbytečnými zprávami, emoji nebo pingy."
        },
        {
          title: "Správné kanály",
          description: "Piš do příslušných kanálů podle jejich účelu."
        },
        {
          title: "Reklama",
          description: "Zakázáno sdílet odkazy na jiné servery nebo produkty bez povolení."
        }
      ]
    },
    {
      category: "Tresty",
      icon: FaGavel,
      color: "#ff3333",
      badge: "Tresty",
      rules: [
        {
          title: "Warn (varování)",
          description: "První upozornění při menším porušení pravidel."
        },
        {
          title: "Kick",
          description: "Vyhození ze serveru při opakovaném porušení."
        },
        {
          title: "Ban (dočasný)",
          description: "Dočasný zákaz vstupu na server - 1 den až několik měsíců."
        },
        {
          title: "Permaban",
          description: "Trvalý zákaz vstupu za závažné nebo opakované porušení pravidel."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-8">
            <div 
              className="p-6 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #ff3333, #ff6666)",
                boxShadow: "0 0 50px rgba(255, 51, 51, 0.4)"
              }}
            >
              <FaBook className="text-7xl text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            Pravidla <span className="text-gradient">serveru</span>
          </h1>
          <p className="text-[#cccccc] text-xl max-w-3xl mx-auto">
            Přečti si pečlivě všechna pravidla. Jejich nedodržování bude potrestáno.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {ruleCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="glass-strong rounded-3xl p-8 border border-[#ff3333]/20">
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
                        boxShadow: `0 0 30px ${category.color}66`
                      }}
                    >
                      <Icon className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-black mb-2">{category.category}</h2>
                      <Badge 
                        className="text-sm font-bold"
                        style={{
                          background: category.color,
                          color: "white"
                        }}
                      >
                        {category.badge}
                      </Badge>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <AccordionItem 
                        key={ruleIndex} 
                        value={`item-${categoryIndex}-${ruleIndex}`}
                        className="glass rounded-2xl border border-[#ff3333]/10 px-6 hover:border-[#ff3333]/30 transition-all"
                      >
                        <AccordionTrigger className="text-lg font-bold hover:text-[#ff3333] transition-colors py-5">
                          {rule.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#cccccc] text-base leading-relaxed pb-5">
                          {rule.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto border-2 border-[#ff3333]/30">
            <FaGavel className="text-6xl text-[#ff3333] mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-black mb-6">
              Důležité <span className="text-gradient">upozornění</span>
            </h3>
            <p className="text-[#cccccc] text-lg leading-relaxed">
              Neznalost pravidel není omluva. Každý hráč je povinen si pravidla přečíst
              a dodržovat je. A-Team má vždy poslední slovo v každé situaci.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rules;
