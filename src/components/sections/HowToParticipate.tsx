import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Users, Box, Presentation, LucideIcon } from 'lucide-react';

// --- TYPES ---
interface StepData {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// --- CSS TEXTURES ---
const textures = {
  // 1. Spruce Planks (Card Background)
  sprucePlanks: {
    backgroundColor: '#5d4024',
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.3) 2px, transparent 2px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)
    `,
    backgroundSize: '100% 32px, 4px 100%, 100% 8px',
    boxShadow: `
      inset 4px 4px 0px rgba(255,255,255,0.1), 
      inset -4px -4px 0px rgba(0,0,0,0.4),
      0px 8px 0px rgba(0,0,0,0.5)
    `,
    border: '4px solid #362211',
    imageRendering: 'pixelated' as const,
  },

  // 2. Command Block / Tech Panel (Title Background)
  commandPanel: {
    backgroundColor: '#1e1e1e',
    backgroundImage: `
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
    border: '4px solid #505050',
    boxShadow: '0px 8px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)',
    imageRendering: 'pixelated' as const,
  },

  // 3. Grass & Dirt
  grassTop: {
    backgroundColor: '#5ea938',
    backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)`,
    backgroundSize: '8px 8px',
    imageRendering: 'pixelated' as const,
  },
  grassSideDrip: {
    backgroundImage: `linear-gradient(90deg, #5ea938 50%, transparent 50%)`,
    backgroundSize: '16px 16px',
    imageRendering: 'pixelated' as const,
  },
  dirt: {
    backgroundColor: '#79553a',
    backgroundImage: `radial-gradient(rect, rgba(0,0,0,0.1) 1px, transparent 1px)`,
    backgroundSize: '12px 12px',
    imageRendering: 'pixelated' as const,
  },
};

// --- ANIMATIONS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 60, opacity: 0, scale: 0.9 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 12 },
  },
};

// Title Animation: "Block Drop" (Falls from sky and bounces)
const titleAnim: Variants = {
  hidden: { y: -200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.5, duration: 1 }
  }
};

const floatIcon: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const MinecraftCard: React.FC<StepData> = ({ number, title, description, icon: Icon, color }) => (
  <motion.div
    variants={cardVariants}
    className="relative z-20 flex flex-col items-center h-full group"
    whileHover={{ y: -16, scale: 1.02, transition: { duration: 0.2 } }}
  >

    <div
      className="p-6 w-full h-full flex flex-col items-center text-center relative"
      style={textures.sprucePlanks}
    >
      {/* Corner Bolts */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-[#25150a]" />
      <div className="absolute top-1 right-1 w-2 h-2 bg-[#25150a]" />
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#25150a]" />
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#25150a]" />

  
      <motion.div variants={floatIcon} animate="animate" className="mb-4 relative">
        <div className="w-20 h-20 bg-[#362211] border-2 border-[#5d4024] flex items-center justify-center shadow-inner">
          <Icon size={40} color={color} style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.5))' }} />
        </div>


        <div
          className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center text-white text-2xl border-2 border-black"
          style={{
            backgroundColor: color,
            fontFamily: '"VT323", monospace',
            boxShadow: '2px 2px 0px rgba(0,0,0,0.5)'
          }}
        >
          {number}
        </div>
      </motion.div>

 
      <h3
        className="text-3xl mb-3 uppercase tracking-wider"
        style={{
          color: color,
          fontFamily: '"VT323", monospace',
          textShadow: '2px 2px 0px #000'
        }}
      >
        {title}
      </h3>

      <p
        className="text-xl leading-tight font-medium"
        style={{
          color: color,
          filter: 'brightness(1.2)',
          fontFamily: '"VT323", monospace',
          textShadow: '1px 1px 0px #000'
        }}
      >
        {description}
      </p>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
export function HowToParticipate() {
  const steps: StepData[] = [
    { number: 1, title: "REGISTER", description: "Click the register button and fill out your details.", color: "#55efc4", icon: BookOpen },
    { number: 2, title: "FORM TEAM", description: "Team up with friends or join a squad at the event.", color: "#ff9f43", icon: Users },
    { number: 3, title: "BUILD", description: "Create an innovative project in 48 hours.", color: "#38b6ff", icon: Box },
    { number: 4, title: "PRESENT", description: "Showcase your project to judges and win prizes!", color: "#a29bfe", icon: Presentation }
  ];

  return (
    <section
      className="relative pb-12 pt-24 overflow-hidden flex flex-col"
      id="participate"
      style={{ backgroundColor: 'rgb(15, 21, 35)' }}
    >

     
      <div className="w-full flex justify-center mb-16 relative z-30 px-4">
        <motion.div
          variants={titleAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-12 py-6 relative"
          style={textures.commandPanel}
        >
          
          <motion.div
            className="absolute inset-0 border-2 border-white opacity-20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          
          <motion.h2
            className="text-5xl md:text-7xl text-white uppercase text-center"
            style={{
              fontFamily: '"VT323", monospace',
              textShadow: '4px 4px 0px #000'
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            HOW TO PARTICIPATE
          </motion.h2>
        </motion.div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative w-full flex-1 flex flex-col justify-end">

        {/* CARDS GRID */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 mb-[-12px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end"
          >
            {steps.map((step, index) => (
              <MinecraftCard key={index} {...step} />
            ))}
          </motion.div>
        </div>

   
        <div className="relative w-full z-10">
          
          <div className="w-full h-8 relative" style={textures.grassTop}>
            <div
              className="absolute -bottom-4 left-0 w-full h-4"
              style={textures.grassSideDrip}
            />
          </div>

        
          <div
            className="w-full h-24"
            style={textures.dirt}
          >
            {/* Fade into background color */}
            <div className="w-full h-full bg-gradient-to-b from-transparent to-[rgb(15,21,35)]" />
          </div>
        </div>

      </div>
    </section>
  );
}