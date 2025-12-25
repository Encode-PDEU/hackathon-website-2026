'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '../PixelButton';
import { FloatingBlocks } from '../FloatingBlocks';
import { ChevronDown } from 'lucide-react';

const UNSTOP_URL = 'https://unstop.com'; // put your exact Unstop link here

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const handlePortalComplete = () => {
    setShowPortal(true);
  
    setTimeout(() => {
      setShowPortal(false)
      window.open(UNSTOP_URL, "_blank");
    }, 3000); // small delay for smooth unmount
  };

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background + image loader */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Loader / fallback image */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: "url('/hero/hero-cover.jpg')" }}
        />

        {/* Background video */}
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src="/hero/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        />

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
              onClick={handlePortalComplete}
            >
              ⛏️ REGISTER NOW
            </PixelButton>
            <PixelButton 
              size="lg" 
              variant="gold"
              onClick={scrollToTimeline}
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
        className="absolute bottom-24 left-0 right-0 mx-auto w-fit"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-retro text-sm text-muted-foreground">Scroll Down</span>
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </motion.div>

      {/* FULL-SCREEN NETHER PORTAL OVERLAY */}
      {showPortal && <NetherPortalOverlay onComplete={handlePortalComplete} />}

    </section>
  );
}

function NetherPortalOverlay({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/95 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Center Wrapper */}
      <div className="flex flex-col items-center justify-center">
        
        {/* PORTAL */}
        <motion.div
          className="relative w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[26rem]"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Obsidian frame */}
          <div className="absolute inset-0 border-[10px] border-[#12051C] bg-[#05000a]
                          shadow-[0_0_50px_rgba(147,51,234,0.8)]">
            <div className="absolute inset-1 grid grid-cols-4 grid-rows-8 gap-[2px]">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#1b0629]"
                  style={{ opacity: 0.6 + (i % 4) * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Portal swirl */}
          <motion.div
            className="absolute inset-[14%]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 30%, #f472b6, transparent 60%), radial-gradient(circle at 70% 40%, #818cf8, transparent 55%), radial-gradient(circle at 40% 80%, #34d399, transparent 55%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              boxShadow: [
                '0 0 25px rgba(216,180,254,0.7)',
                '0 0 45px rgba(147,51,234,1)',
                '0 0 25px rgba(216,180,254,0.7)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* TEXT + LOADING */}
        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-pixel text-lg text-purple-200">
            Entering the Nether Portal...
          </p>

          {/* CENTERED LOADING BAR */}
          <div className="mt-4 w-40 h-2 overflow-hidden border border-purple-300/60 bg-purple-950">
            <motion.div
              className="h-full bg-gradient-to-r from-fuchsia-400 via-purple-300 to-emerald-300"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.3, ease: 'easeInOut' }}
              onAnimationComplete={onComplete}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
