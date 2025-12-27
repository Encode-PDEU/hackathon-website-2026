import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MinecraftPanel } from '@/components/MinecraftPanel';

// ... (keep themes array exactly the same) ...
const themes = [
  {
    id: 'medtech',
    title: 'Med-Tech',
    subtitle: 'Healing Biome',
    image: '/biomes/med-tech.jpg',
    color: 'bg-emerald-500',
    palette: 'from-green-500/20 to-white/20',
  },
  {
    id: 'fintech',
    title: 'Fin-Tech',
    subtitle: 'Treasury Biome',
    image: '/biomes/fin-tech.png',
    color: 'bg-yellow-500',
    palette: 'from-yellow-500/20 to-emerald-500/20',
  },
  {
    id: 'social',
    title: 'Social Impact',
    subtitle: 'Village & Society',
    image: '/biomes/social-impact.jpg',
    color: 'bg-emerald-600',
    palette: 'from-emerald-500/20 to-amber-500/20',
  },
  {
    id: 'aiml',
    title: 'AI / ML',
    subtitle: 'Enchantment Table',
    image: '/biomes/ai-ml.png',
    color: 'bg-purple-500',
    palette: 'from-purple-500/20 to-blue-500/20',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    subtitle: 'The Nether',
    image: '/biomes/cyber-sec.jpg',
    color: 'bg-red-700',
    palette: 'from-red-900/40 to-orange-900/40',
  },
  {
    id: 'innovation',
    title: 'Open Innovation',
    subtitle: 'Creative Mode',
    image: '/biomes/open-innovation.jpg',
    color: 'bg-blue-400',
    palette: 'from-blue-400/20 to-green-400/20',
  },
];

interface BiomeCardProps {
  theme: typeof themes[number];
  isHovered: boolean;
  isSelected: boolean;
  isOtherHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: () => void;
}

function BiomeCard({
  theme,
  isHovered,
  isSelected,
  isOtherHovered,
  onHover,
  onSelect,
}: BiomeCardProps) {
  return (
    <motion.div
      onMouseEnter={() => onHover(theme.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onSelect}
      // Added h-full here to ensure cards in the same row match height
      className={cn(
        'relative group cursor-pointer transition-all duration-500 h-full sign',
        isOtherHovered && 'opacity-40',
      )}
      style={{
        boxShadow: isSelected ? '0 0 0 3px hsl(var(--primary)) inset' : 'none',
      }}
      whileHover={{ scale: 1.03, y: -4 }} // Reduced hover lift slightly
    >
      <MinecraftPanel
        className={cn(
          'sign h-full overflow-hidden flex flex-col relative',
          isSelected && 'ring-2 ring-primary'
        )}
      >
        {/* Tinted background overlay */}
        <div
          className={cn(
            'absolute inset-0 pointer-events-none opacity-5 transition-opacity duration-300'
          )}
        />
        
        {/* IMAGE SECTION - CHANGED */}
        {/* Using aspect-[16/9] ensures a wide, dominant image ratio regardless of actual size. */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted/20 shrink-0">
          <motion.img
            src={theme.image}
            alt={theme.title}
            // object-cover ensures it fills the 16:9 box without stretching
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60',
              theme.palette,
            )}
          />

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                // Made badge smaller and positioned tighter
                className="absolute top-2 right-2 bg-primary px-1.5 py-0.5 border-2 border-primary-foreground shadow-md z-20"
              >
                <span className="font-pixel text-[7px] sm:text-[8px] text-primary-foreground font-bold leading-none">SELECTED</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => ( // Reduced particle count slightly
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40"
                  initial={{ x: Math.random() * 100 + '%', y: '100%', opacity: 0 }}
                  animate={{
                    y: '-10%',
                    opacity: [0, 1, 0],
                    x: Math.random() * 100 + (Math.random() * 20 - 10) + '%',
                  }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS SECTION - CHANGED */}
        <div 
          className={cn(
            'px-2 sm:px-3 py-2 sm:py-2 md:py-4 flex flex-col justify-center flex-1 transition-colors duration-300'
          )}
        >
          <h3 className="font-pixel text-sm sm:text-base md:text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
            {theme.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground italic tracking-wide uppercase">
            {theme.subtitle}
          </p>
        </div>

        {/* Depth highlights */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-[3px] h-full bg-white/10 pointer-events-none" />
      </MinecraftPanel>
    </motion.div>
  );
}

// ... (keep BiomeSection exactly the same) ...
export function BiomeSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="biomes"
      className={cn(
        'relative py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-700 ease-in-out',
      )}
    >
      {/* Removed section-wide overlay to keep shared background consistent */}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">
            Choose Your Realm
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Every adventurer must choose their path. Each realm represents a different kind of challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto auto-rows-fr">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // Important: kept h-full here so grid items stretch evenly
              className="h-full"
            >
              <BiomeCard
                theme={theme}
                isHovered={hoveredId === theme.id}
                isSelected={selectedId === theme.id}
                isOtherHovered={hoveredId !== null && hoveredId !== theme.id}
                onHover={setHoveredId}
                onSelect={() => setSelectedId(selectedId === theme.id ? null : theme.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}