import { motion } from 'framer-motion';
import { PixelButton } from '../PixelButton';
import { FloatingBlocks } from '../FloatingBlocks';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

export function HeroSection() {
  const scrollToRegistration = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Animated stars overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <FloatingBlocks />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="font-retro text-lg bg-gold/20 text-gold px-4 py-2 pixel-border-sm">
              ⚔️ 48-HOUR CODING ADVENTURE ⚔️
            </span>
          </motion.div>

          {/* Pixel art title effect */}
          <motion.h1 
            className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-relaxed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <span className="text-glow block drop-shadow-lg">ENCODE CLUB</span>
            <span className="text-primary text-glow mt-4 block drop-shadow-lg">HACKATHON</span>
          </motion.h1>
          
          <motion.p 
            className="font-retro text-xl sm:text-2xl md:text-3xl text-foreground/90 mb-4 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Build, Hack, Create in a Pixel World
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mb-10 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="font-retro text-gold text-xl flex items-center gap-2 bg-background/50 px-3 py-1 pixel-border-sm">
              <span className="w-3 h-3 bg-gold animate-pulse" />
              March 2026
            </span>
            <span className="font-retro text-accent text-xl flex items-center gap-2 bg-background/50 px-3 py-1 pixel-border-sm">
              <span className="w-3 h-3 bg-accent animate-pulse" />
              Virtual & On-Site
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <PixelButton 
              size="lg" 
              variant="primary"
              onClick={scrollToRegistration}
            >
              ⛏️ REGISTER NOW
            </PixelButton>
            <PixelButton 
              size="lg" 
              variant="gold"
              onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            >
              📜 VIEW TIMELINE
            </PixelButton>
          </motion.div>

          {/* Prize banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12"
          >
            <div className="inline-block bg-card/80 pixel-border px-6 py-3">
              <span className="font-retro text-xl text-muted-foreground">
                🏆 Over <span className="text-gold font-pixel text-lg">$50,000</span> in prizes!
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-retro text-sm text-muted-foreground">Scroll Down</span>
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
