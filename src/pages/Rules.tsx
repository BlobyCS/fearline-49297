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
        },
        {
          title: "Fail RP",
          description: "Zakázáno hrát nerealisticky nebo porušovat logiku roleplayu (např. mluvit když jsi svázaný)."
        },
        {
          title: "Pain RP",
          description: "Musíš realisticky reagovat na zranění - nemůžeš běhat s prostřelenou nohou."
        },
        {
          title: "Value of Life",
          description: "Musíš si vážit svého života - nesmíš se zbytečně vystavovat smrtelnému nebezpečí."
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
        },
        {
          title: "Nahrávání RP",
          description: "Doporučeno nahrávat své RP pro případné report situace a důkazy."
        }
      ]
    },
    {
      category: "Pravidla pro smrt a NLR",
      icon: FaSkull,
      color: "#9933ff",
      badge: "NLR",
      rules: [
        {
          title: "New Life Rule (NLR)",
          description: "Po smrti zapomínáš vše z předchozího života - nesmíš se vrátit na místo smrti 15 minut."
        },
        {
          title: "Respawn a léčení",
          description: "Po smrtelném zranění musíš čekat na EMS. Respawn pouze s povolením admina nebo po stanovené době."
        },
        {
          title: "Pomsta po smrti",
          description: "Zakázáno se mstít osobám, které tě zabily, pokud si to nepamatuješ (NLR)."
        },
        {
          title: "Combat logging",
          description: "Zakázáno odpojit se ze hry během aktivního roleplayu nebo souboje."
        },
        {
          title: "Hra na mrtvého",
          description: "Když jsi v bezvědomí, nesmíš mluvit ani poslouchat konverzace. Výjimka je šeptání k EMS."
        }
      ]
    },
    {
      category: "Criminal RP pravidla",
      icon: FaMask,
      color: "#ff9933",
      badge: "CRIME",
      rules: [
        {
          title: "Loupež a kidnapping",
          description: "Loupež a únos vyžadují kvalitní roleplay. Minimálně 3 online policisté pro bankovní loupež."
        },
        {
          title: "Hostage RP",
          description: "S rukojmími musíš zacházet realisticky, nesmíš je zabít bez důvodu."
        },
        {
          title: "Green Zones",
          description: "Na určených místech (spawn, nemocnice) je zakázána jakákoli kriminální aktivita."
        },
        {
          title: "Limit loupeží",
          description: "Dodržuj cooldown mezi velkými akcemi (banky, obchody). Max. 1 velká loupež za 2 hodiny."
        },
        {
          title: "Maskování identity",
          description: "S maskou nebo helmou nemůžeš být rozpoznán. Musíš mít celý obličej zakrytý."
        }
      ]
    },
    {
      category: "Pravidla pro vozidla",
      icon: FaCar,
      color: "#33ccff",
      badge: "VEHICLE",
      rules: [
        {
          title: "Vehicle Deathmatch (VDM)",
          description: "Zakázáno záměrně přejíždět hráče vozidlem bez RP důvodu."
        },
        {
          title: "Realistické řízení",
          description: "Řiď realisticky podle situace - respektuj rychlostní limity ve městě, nepřejíždě červenou bez důvodu."
        },
        {
          title: "Stunt driving",
          description: "Zakázáno dělat nerealistické skoky a kaskadérské kousky bez RP důvodu."
        },
        {
          title: "Únik před policií",
          description: "Při honičce s policií musíš hrát realisticky - nelituj pneumatik a nezneužívej terén."
        },
        {
          title: "Opuštění vozidla",
          description: "Nesmíš skákat z jedoucího vozidla nebo okamžitě vytahovat zbraň po vystoupení."
        }
      ]
    },
    {
      category: "Pravidla pro frakce",
      icon: FaUsers,
      color: "#ff33cc",
      badge: "GANG",
      rules: [
        {
          title: "Gang wars",
          description: "Války mezi gangami musí mít RP důvod a schválení adminů. Dodržuj territory pravidla."
        },
        {
          title: "Aliance a vztahy",
          description: "Udržuj konzistentní vztahy mezi frakcemi. Nelze být ve válce a zároveň spolupracovat."
        },
        {
          title: "Verbování členů",
          description: "Nováčky musíš řádně prověřit a zapracovat. Žádné instant povýšení do vysokých pozic."
        },
        {
          title: "Frakční území",
          description: "Respektuj území jiných frakcí. Narušení cizího území může vést ke konfliktu."
        }
      ]
    },
    {
      category: "Pravidla pro PD/EMS",
      icon: FaShieldAlt,
      color: "#3366ff",
      badge: "LEO",
      rules: [
        {
          title: "Profesionalita",
          description: "Jako člen PD/EMS musíš být profesionální, slušný a dodržovat protokoly služby."
        },
        {
          title: "Korupce",
          description: "Korupce je možná pouze s předchozím schválením vedení a admina. Nelze zneužívat pravomoci."
        },
        {
          title: "Použití síly",
          description: "Policie používá přiměřenou sílu. Střelba pouze při ohrožení života nebo útěku s těžkým zločinem."
        },
        {
          title: "Zadržení a vyšetřování",
          description: "Před zatčením musí proběhnout řádné vyšetřování a důkazy. Nelze zatknout bez důvodu."
        }
      ]
    },
    {
      category: "Ekonomika a business",
      icon: FaDollarSign,
      color: "#33ff77",
      badge: "ECO",
      rules: [
        {
          title: "Money transfers",
          description: "Větší převody peněz musí mít RP důvod. Žádné darování velkých sum bez pozadí."
        },
        {
          title: "Podnikání",
          description: "Vlastníš-li business, musíš ho aktivně provozovat a poskytovat RP ostatním."
        },
        {
          title: "Ceny a služby",
          description: "Dodržuj realistické ceny za zboží a služby. Nelze účtovat extrémní částky."
        },
        {
          title: "Money laundering",
          description: "Praní špinavých peněz vyžaduje propracovaný RP a používání legálních businessů."
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
