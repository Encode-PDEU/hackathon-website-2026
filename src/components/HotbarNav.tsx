import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMinecraftSound } from '@/hooks/useMinecraftSound';

const navItems = [
  { id: 'hero', src: '/imgs/items/diamond-sword.png', label: 'Home' },
  { id: 'biomes', src: '/imgs/items/compass-up.png', label: 'Biomes' },
  { id: 'timeline', src: '/imgs/items/clock.png', label: 'Timeline' },
  { id: 'prizes', src: '/imgs/items/emerald.png', label: 'Prizes' },
  { id: 'registration', src: '/imgs/items/book-writable.png', label: 'Register' },
  { id: 'faqs', src: '/imgs/items/book-enchanted.png', label: 'FAQs' },
  { id: 'contact', src: '/imgs/items/map-filled.png', label: 'Contact' },
];

interface HotbarNavProps {
  activeSection: string;
}

export function HotbarNav({ activeSection }: HotbarNavProps) {
  const { play } = useMinecraftSound(0.4);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-0 right-0 z-50 flex justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="flex gap-1 p-2 bg-card/95 backdrop-blur-sm pixel-border">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => play()}
                onClickCapture={() => play()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'hotbar-slot transition-all duration-200',
                  isActive && 'hotbar-slot-active'
                )}
                title={item.label}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className={cn('w-8 h-8 pixelated')}
                  draggable={false}
                />
                {isActive && (
                  <motion.div
                    layoutId="hotbar-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Slot numbers */}
        <div className="flex justify-around w-full mt-1 px-2">
          {navItems.map((_, index) => (
            <span 
              key={index} 
              className="text-xs font-pixel text-muted-foreground w-12 text-center"
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
