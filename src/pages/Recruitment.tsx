import { motion } from "framer-motion";
import { useState } from "react";
import { FaUserShield, FaHeadset, FaCode, FaVideo, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Position {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder: string;
  required: boolean;
}

const Recruitment = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions: Position[] = [
    {
      id: "admin",
      title: "Admin",
      icon: FaUserShield,
      color: "#3498db",
      description: "Starej se o chod serveru a pomáhej komunitě",
      questions: [
        { id: "name", label: "Tvoje jméno", type: "text", placeholder: "Jan Novák", required: true },
        { id: "discord", label: "Discord ID", type: "text", placeholder: "username#1234", required: true },
        { id: "age", label: "Věk", type: "number", placeholder: "18", required: true },
        { id: "experience", label: "Zkušenosti s administrací", type: "textarea", placeholder: "Popiš své zkušenosti...", required: true },
        { id: "availability", label: "Kolik hodin týdně můžeš věnovat?", type: "number", placeholder: "20", required: true },
        { id: "why", label: "Proč chceš být admin?", type: "textarea", placeholder: "Tvoje motivace...", required: true },
      ],
    },
    {
      id: "support",
      title: "Support",
      icon: FaHeadset,
      color: "#2ecc71",
      description: "Pomáhej hráčům s jejich problémy a dotazy",
      questions: [
        { id: "name", label: "Tvoje jméno", type: "text", placeholder: "Jan Novák", required: true },
        { id: "discord", label: "Discord ID", type: "text", placeholder: "username#1234", required: true },
        { id: "age", label: "Věk", type: "number", placeholder: "18", required: true },
        { id: "experience", label: "Zkušenosti se supportem", type: "textarea", placeholder: "Popiš své zkušenosti...", required: true },
        { id: "languages", label: "Jaké jazyky ovládáš?", type: "text", placeholder: "Čeština, Angličtina...", required: true },
        { id: "availability", label: "Kolik hodin denně jsi online?", type: "number", placeholder: "5", required: true },
      ],
    },
    {
      id: "developer",
      title: "Developer",
      icon: FaCode,
      color: "#9b59b6",
      description: "Vyvíjej a vylepšuj server",
      questions: [
        { id: "name", label: "Tvoje jméno", type: "text", placeholder: "Jan Novák", required: true },
        { id: "discord", label: "Discord ID", type: "text", placeholder: "username#1234", required: true },
        { id: "age", label: "Věk", type: "number", placeholder: "18", required: true },
        { id: "languages", label: "Programovací jazyky", type: "text", placeholder: "Lua, JavaScript, C#...", required: true },
        { id: "portfolio", label: "Portfolio / GitHub", type: "text", placeholder: "https://github.com/...", required: false },
        { id: "experience", label: "Zkušenosti s FiveM vývojem", type: "textarea", placeholder: "Popiš své zkušenosti a projekty...", required: true },
        { id: "availability", label: "Kolik hodin týdně můžeš věnovat?", type: "number", placeholder: "15", required: true },
      ],
    },
    {
      id: "streamer",
      title: "Streamer",
      icon: FaVideo,
      color: "#ff3333",
      description: "Streamuj náš server a přiveď nové hráče",
      questions: [
        { id: "name", label: "Tvoje jméno", type: "text", placeholder: "Jan Novák", required: true },
        { id: "discord", label: "Discord ID", type: "text", placeholder: "username#1234", required: true },
        { id: "age", label: "Věk", type: "number", placeholder: "18", required: true },
        { id: "platform", label: "Streamovací platforma", type: "text", placeholder: "Twitch, YouTube...", required: true },
        { id: "channel", label: "Odkaz na kanál", type: "text", placeholder: "https://twitch.tv/...", required: true },
        { id: "followers", label: "Počet followerů", type: "number", placeholder: "1000", required: true },
        { id: "schedule", label: "Jak často plánuješ streamovat?", type: "textarea", placeholder: "Kolikrát týdně a jak dlouho...", required: true },
      ],
    },
  ];

  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position);
    setFormData({});
    setIsSubmitted(false);
  };

  const handleInputChange = (questionId: string, value: string) => {
    setFormData({ ...formData, [questionId]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const missingFields = selectedPosition?.questions
        .filter((q) => q.required && !formData[q.id])
        .map((q) => q.label);

      if (missingFields && missingFields.length > 0) {
        toast.error(`Vyplň prosím všechna povinná pole: ${missingFields.join(", ")}`);
        setIsSubmitting(false);
        return;
      }

      const embed = {
        embeds: [
          {
            title: `🎯 Nová žádost - ${selectedPosition?.title}`,
            color: selectedPosition?.id === "admin" ? 3447003 : 
                   selectedPosition?.id === "support" ? 3066993 :
                   selectedPosition?.id === "developer" ? 10181046 : 15158332,
            fields: selectedPosition?.questions.map((q) => ({
              name: q.label,
              value: formData[q.id] || "Nevyplněno",
              inline: q.type === "text" || q.type === "number",
            })),
            timestamp: new Date().toISOString(),
            footer: {
              text: "Fearline.eu Nábor",
            },
          },
        ],
      };

      const response = await fetch(
        "https://discord.com/api/webhooks/1432380924246491197/cZHy5IVORKA1tD-Rqc-f7POHE5czoEMAOQ4ueP0tnXTDQbLzkR0b4WJ20WWldIfsLP-z",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(embed),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Žádost úspěšně odeslána!");
        setFormData({});
      } else {
        throw new Error("Chyba při odesílání");
      }
    } catch (error) {
      toast.error("Nepodařilo se odeslat žádost. Zkus to prosím znovu.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            Přidej se k <span className="text-gradient">Týmu</span>
          </h1>
          <p className="text-[#cccccc] text-xl max-w-2xl mx-auto">
            Hledáme aktivní a zodpovědné lidi. Vyber si pozici a vyplň formulář.
          </p>
        </motion.div>

        {!selectedPosition && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => handlePositionSelect(position)}
                  className="glass-strong rounded-3xl p-10 text-center space-y-6 cursor-pointer glow-hover"
                >
                  <div
                    className="mx-auto w-24 h-24 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${position.color}, ${position.color}dd)`,
                      boxShadow: `0 0 30px ${position.color}66`
                    }}
                  >
                    <Icon className="text-white text-4xl" />
                  </div>
                  <h3 className="text-3xl font-bold">{position.title}</h3>
                  <p className="text-[#cccccc] text-sm leading-relaxed">{position.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full font-bold border-2 hover:bg-[#ff3333]/10 hover:border-[#ff3333]"
                  >
                    Vybrat pozici
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}

        {selectedPosition && !isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-strong rounded-3xl p-12 border border-[#ff3333]/20">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedPosition.color}, ${selectedPosition.color}dd)`,
                      boxShadow: `0 0 30px ${selectedPosition.color}66`
                    }}
                  >
                    <selectedPosition.icon className="text-white text-3xl" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black">{selectedPosition.title}</h2>
                    <p className="text-[#cccccc] text-lg">{selectedPosition.description}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedPosition(null)}
                  className="hover:bg-[#ff3333]/10"
                >
                  Zpět
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {selectedPosition.questions.map((question) => (
                  <div key={question.id} className="space-y-3">
                    <Label htmlFor={question.id} className="text-lg font-semibold">
                      {question.label}
                      {question.required && <span className="text-[#ff3333] ml-1">*</span>}
                    </Label>
                    {question.type === "textarea" ? (
                      <Textarea
                        id={question.id}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                        className="min-h-[140px] bg-[#1a1a1a] border-[#ff3333]/20 focus:border-[#ff3333] text-base"
                      />
                    ) : (
                      <Input
                        id={question.id}
                        type={question.type}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                        className="bg-[#1a1a1a] border-[#ff3333]/20 focus:border-[#ff3333] h-14 text-base"
                      />
                    )}
                  </div>
                ))}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full py-8 text-xl font-bold rounded-2xl bg-gradient-to-r from-[#ff3333] to-[#ff6666] hover:from-[#ff6666] hover:to-[#ff3333] shadow-[0_0_40px_rgba(255,51,51,0.5)] hover:shadow-[0_0_60px_rgba(255,51,51,0.7)] transition-all duration-300" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Odesílám..." : "Odeslat žádost"}
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="glass-strong rounded-3xl p-16 space-y-8 border border-[#2ecc71]/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                  boxShadow: "0 0 50px rgba(46, 204, 113, 0.5)"
                }}
              >
                <FaCheckCircle className="text-white text-7xl" />
              </motion.div>
              <h2 className="text-5xl font-black">Žádost odeslána!</h2>
              <p className="text-[#cccccc] text-xl leading-relaxed">
                Tvoje žádost byla úspěšně odeslána na náš Discord. Brzy se ti ozveme!
              </p>
              <Button
                onClick={() => {
                  setSelectedPosition(null);
                  setIsSubmitted(false);
                }}
                size="lg"
                className="px-12 py-7 text-lg rounded-2xl font-bold bg-gradient-to-r from-[#ff3333] to-[#ff6666] hover:from-[#ff6666] hover:to-[#ff3333]"
              >
                Zpět na výběr pozice
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recruitment;
