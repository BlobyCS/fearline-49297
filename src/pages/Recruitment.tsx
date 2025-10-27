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
      color: "from-blue-500 to-blue-700",
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
      color: "from-green-500 to-green-700",
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
      color: "from-purple-500 to-purple-700",
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
      color: "from-red-500 to-red-700",
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
      // Validate required fields
      const missingFields = selectedPosition?.questions
        .filter((q) => q.required && !formData[q.id])
        .map((q) => q.label);

      if (missingFields && missingFields.length > 0) {
        toast.error(`Vyplň prosím všechna povinná pole: ${missingFields.join(", ")}`);
        setIsSubmitting(false);
        return;
      }

      // Create embed for Discord
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
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Přidej se k <span className="text-gradient">Týmu</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hledáme aktivní a zodpovědné lidi. Vyber si pozici a vyplň formulář.
          </p>
        </motion.div>

        {!selectedPosition && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onClick={() => handlePositionSelect(position)}
                  className="glass rounded-2xl p-8 text-center space-y-4 cursor-pointer hover:glow-purple transition-all group"
                >
                  <div
                    className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${position.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <Icon className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold">{position.title}</h3>
                  <p className="text-muted-foreground text-sm">{position.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full font-bold"
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
            className="max-w-2xl mx-auto"
          >
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedPosition.color} flex items-center justify-center`}
                  >
                    <selectedPosition.icon className="text-white text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedPosition.title}</h2>
                    <p className="text-muted-foreground">{selectedPosition.description}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedPosition(null)}>
                  Zpět
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {selectedPosition.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label htmlFor={question.id} className="text-base">
                      {question.label}
                      {question.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {question.type === "textarea" ? (
                      <Textarea
                        id={question.id}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                        className="min-h-[120px] bg-background/50"
                      />
                    ) : (
                      <Input
                        id={question.id}
                        type={question.type}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        required={question.required}
                        className="bg-background/50"
                      />
                    )}
                  </div>
                ))}

                <Button 
                  type="submit" 
                  size="lg" 
                  variant="gradient"
                  className="w-full font-bold" 
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
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-strong rounded-2xl p-12 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center"
              >
                <FaCheckCircle className="text-white text-5xl" />
              </motion.div>
              <h2 className="text-4xl font-bold">Žádost odeslána!</h2>
              <p className="text-muted-foreground text-lg">
                Tvoje žádost byla úspěšně odeslána na náš Discord. Brzy se ti ozveme!
              </p>
              <Button
                onClick={() => {
                  setSelectedPosition(null);
                  setIsSubmitted(false);
                }}
                size="lg"
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
