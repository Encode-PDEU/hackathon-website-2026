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
    <div className="min-h-screen relative scanlines">
      <HeroSection />
      {/* Stone texture container for all sections below Hero */}
      <div
        className="relative"
        style={{
          backgroundImage: "url('/imgs/blocks/stone.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          imageRendering: 'pixelated'
        }}
      >
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="relative z-10">
          <BiomeSection />
          <TimelineSection />
          <PrizeSection />
          <HowToParticipate />
          <Sponsors />
          <Crew />
          <FAQSection />
          <ContactSection />
        </div>
      </div>
      {!isLoading && <HotbarNav activeSection={activeSection} />}

      {/* Bottom padding for hotbar */}
      <div className="h-24" />
    </div>
  );
};

export default Index;
