import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      className={cn(
        'relative group cursor-pointer transition-all duration-500 h-full',
        isOtherHovered && 'opacity-40',
      )}
      style={{
        boxShadow: isSelected ? '0 0 0 3px hsl(var(--primary)) inset' : 'none',
      }}
      whileHover={{ scale: 1.03, y: -8 }}
    >
      <div
        className={cn(
          'h-full overflow-hidden flex flex-col border-4 border-muted/30 bg-card shadow-[inset_0_-8px_0_rgba(0,0,0,0.3),inset_0_4px_0_rgba(255,255,255,0.1)] relative aspect-[3/4]',
          isSelected && 'border-primary',
        )}
      >
        {/* Tinted background overlay */}
        <div
          className={cn(
            'absolute inset-0 pointer-events-none opacity-5 transition-opacity duration-300',
            theme.color === 'bg-emerald-500' && 'bg-emerald-500',
            theme.color === 'bg-yellow-500' && 'bg-yellow-500',
            theme.color === 'bg-emerald-600' && 'bg-emerald-600',
            theme.color === 'bg-purple-500' && 'bg-purple-500',
            theme.color === 'bg-red-700' && 'bg-red-700',
            theme.color === 'bg-blue-400' && 'bg-blue-400',
          )}
        />
        {/* Top 65% - Biome Illustration */}
        <div className="relative h-40 sm:h-52 md:h-60 w-full overflow-hidden bg-muted/20">
          <motion.img
            src={theme.image}
            alt={theme.title}
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
                className="absolute top-4 right-4 bg-primary px-3 py-1 border-2 border-primary-foreground shadow-md z-20"
              >
                <span className="font-pixel text-[10px] text-primary-foreground font-bold">BIOME SELECTED</span>
              </motion.div>
            )}
          </AnimatePresence>

          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40"
                  initial={{ x: Math.random() * 100 + '%', y: '100%', opacity: 0 }}
                  animate={{
                    y: '-10%',
                    opacity: [0, 1, 0],
                    x: Math.random() * 100 + (Math.random() * 20 - 10) + '%',
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom 35% - Details */}
        <div 
          className={cn(
            'p-3 sm:p-4 md:p-6 flex flex-col justify-center flex-1 transition-colors duration-300',
            theme.color === 'bg-emerald-500' && 'bg-emerald-950/40',
            theme.color === 'bg-yellow-500' && 'bg-yellow-950/40',
            theme.color === 'bg-emerald-600' && 'bg-emerald-950/40',
            theme.color === 'bg-purple-500' && 'bg-purple-950/40',
            theme.color === 'bg-red-700' && 'bg-red-950/40',
            theme.color === 'bg-blue-400' && 'bg-blue-950/40',
          )}
        >
          <h3 className="font-pixel text-sm sm:text-base md:text-lg text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
            {theme.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground italic tracking-wide uppercase">{theme.subtitle}</p>
        </div>

        {/* Depth highlights */}
        <div className="absolute top-0 left-0 w-full h-[4px] bg-white/10" />
        <div className="absolute top-0 left-0 w-[4px] h-full bg-white/10" />
      </div>
    </motion.div>
  );
}

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
      <div
        className={cn(
          'absolute inset-0 opacity-10 pointer-events-none transition-colors duration-700',
          hoveredId === 'medtech' && 'bg-emerald-500',
          hoveredId === 'fintech' && 'bg-yellow-500',
          hoveredId === 'social' && 'bg-emerald-600',
          hoveredId === 'aiml' && 'bg-purple-500',
          hoveredId === 'cybersecurity' && 'bg-red-700',
          hoveredId === 'innovation' && 'bg-blue-400',
          !hoveredId && 'bg-transparent',
        )}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">
            Choose Your Biome
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Every adventurer must choose their path. Each biome represents a different kind of challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto auto-rows-fr">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
