import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { BiomeSection } from '@/components/sections/BiomeSection';
import { Sponsors } from '@/components/sections/Sponsors';
import { RegistrationSection } from '@/components/sections/RegistrationSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HowToParticipate } from '@/components/sections/HowToParticipate';
import { HotbarNav } from '@/components/HotbarNav';
import { PrizeSection } from '@/components/sections/PrizeSection';
import { Crew } from '@/components/sections/CrewSection';
import { DimensionLayer } from '@/components/DimensionLayer';

interface IndexProps {
  isLoading?: boolean;
}

const Index = ({ isLoading = false }: IndexProps) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'biomes', 'timeline', 'prizes', 'how-to-participate', 'sponsors', 'crew', 'registration', 'faqs', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="font-minecraft text-white overflow-x-hidden">
      {/* LAYER 1: OVERWORLD (Sky + Surface) */}
      <div className="relative">
        <HeroSection /> {/* Video Background */}
        <div className="bg-[#4C7C29]"> {/* Grass Green Background */}
          <Sponsors />
          <HowToParticipate />
        </div>
        {/* Transition into Nether: Obsidian Portal */}
        <div 
          className="h-16 w-full" 
          style={{ 
            backgroundImage: 'url(/imgs/blocks/obsidian.png)',
            backgroundSize: '64px',
            imageRendering: 'pixelated'
          }} 
        />
      </div>

      {/* LAYER 2: THE NETHER (Hot, Red, Dangerous) */}
      <DimensionLayer type="nether">
        <BiomeSection />
        <TimelineSection />
        <Crew />
      </DimensionLayer>

      {/* LAYER 3: THE END (Dark, Void, Loot) */}
      <DimensionLayer type="end">
        <PrizeSection /> {/* 3D Chest goes here */}
        <RegistrationSection />
        <FAQSection />
        <ContactSection />
      </DimensionLayer>

      {!isLoading && <HotbarNav activeSection={activeSection} />}

      {/* Bottom padding for hotbar */}
      <div className="h-24" />
    </main>
  );
};

export default Index;
