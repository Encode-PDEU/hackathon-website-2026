import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sword, Clock, Scroll, HelpCircle, Mail } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Sword, label: 'Home', color: 'text-primary' },
  { id: 'timeline', icon: Clock, label: 'Timeline', color: 'text-gold' },
  { id: 'registration', icon: Scroll, label: 'Register', color: 'text-accent' },
  { id: 'faqs', icon: HelpCircle, label: 'FAQs', color: 'text-primary' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'text-gold' },
];

interface HotbarNavProps {
  activeSection: string;
}

export function HotbarNav({ activeSection }: HotbarNavProps) {
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
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
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
                <Icon 
                  className={cn(
                    'w-6 h-6 transition-colors',
                    isActive ? item.color : 'text-muted-foreground'
                  )} 
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
