import { motion } from "framer-motion";
import { FaCrown, FaWrench, FaStar, FaRocket, FaCog } from "react-icons/fa";

const VIP = () => {
  const futureFeatures = [
    {
      icon: FaCrown,
      title: "Exkluzivní výhody",
      description: "Speciální práva a funkce pro VIP členy"
    },
    {
      icon: FaStar,
      title: "Prioritní podpora",
      description: "Rychlejší reakce od našeho týmu"
    },
    {
      icon: FaRocket,
      title: "Unikátní obsah",
      description: "Přístup k exkluzivním vozidlům a předmětům"
    }
  ];

  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div 
              className="p-8 rounded-full"
              style={{
                background: "linear-gradient(135deg, #ff3333, #ff6666)",
                boxShadow: "0 0 80px rgba(255, 51, 51, 0.5)"
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaCog className="text-8xl text-white" />
              </motion.div>
            </div>
          </motion.div>

          <div className="glass-strong rounded-3xl p-16 space-y-8 border border-[#ff3333]/20">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-7xl font-black mb-4">
                  VIP <span className="text-gradient">Sekce</span>
                </h1>
                <p className="text-[#cccccc] text-2xl font-medium">
                  Momentálně v údržbě
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="h-1 w-32 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ff3333, #ff6666)"
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[#cccccc] text-lg leading-relaxed max-w-2xl mx-auto"
              >
                Pracujeme na přípravě VIP systému, který přinese exkluzivní výhody
                pro naše nejvěrnější hráče. Brzy se tu objeví více informací!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <h3 className="text-3xl font-black mb-8 text-[#ff3333]">
                Co můžeš očekávat
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {futureFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="glass rounded-2xl p-6 space-y-4 hover:border-[#ff3333]/50 transition-all border border-[#ff3333]/10"
                  >
                    <div 
                      className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #ff3333, #ff6666)",
                        boxShadow: "0 0 20px rgba(255, 51, 51, 0.3)"
                      }}
                    >
                      <feature.icon className="text-3xl text-white" />
                    </div>
                    <h4 className="text-xl font-bold">{feature.title}</h4>
                    <p className="text-[#cccccc] text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="pt-8 flex items-center justify-center gap-3"
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-[#ff3333]"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
              />
              <span className="text-[#cccccc] text-sm font-medium">
                V přípravě • Brzy dostupné
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VIP;
