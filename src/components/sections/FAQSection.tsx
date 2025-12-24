import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PixelBlock } from '../PixelBlock';

const faqs = [
  {
    question: 'What is the theme of this hackathon?',
    answer: 'The theme is open-ended! Build anything from DeFi to gaming, NFTs to social platforms. Let your creativity run wild in the blockchain world.',
    emoji: '🎮',
  },
  {
    question: 'What are the prizes?',
    answer: 'We have over $50,000 in prizes including tokens, NFTs, and special rewards from our sponsors. Top teams also get mentorship opportunities!',
    emoji: '🏆',
  },
  {
    question: 'Do I need a team to participate?',
    answer: 'You can participate solo or in a team of up to 4 members. We also have a team matching session at the start of the event!',
    emoji: '👥',
  },
  {
    question: 'What technologies can I use?',
    answer: 'Any technology is welcome! Popular choices include Solidity, Rust, React, and various blockchain frameworks. We provide starter kits and templates.',
    emoji: '⚙️',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No! The hackathon is completely free to participate. Just bring your skills, creativity, and enthusiasm!',
    emoji: '🎟️',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 px-4 relative bg-gradient-to-b from-background to-card/30">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-30 hidden md:block">
        <PixelBlock type="diamond" size={32} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-30 hidden md:block">
        <PixelBlock type="grass" size={28} />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-retro text-lg text-gold mb-4 block">📚 KNOWLEDGE BASE</span>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-4">
            <span className="text-primary text-glow">FREQUENTLY</span> ASKED
          </h2>
          <p className="font-retro text-xl text-muted-foreground">
            Everything you need to know about the hackathon
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={cn(
                  'w-full bg-card pixel-border p-4 text-left transition-all duration-200',
                  openIndex === index ? 'border-primary shadow-glow' : 'hover:border-border-light'
                )}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center pixel-border-sm shrink-0 transition-colors',
                    openIndex === index ? 'bg-primary' : 'bg-muted'
                  )}>
                    <span className="text-xl">{faq.emoji}</span>
                  </div>
                  <span className="font-pixel text-xs sm:text-sm text-foreground flex-1 leading-relaxed">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className={cn(
                      'w-5 h-5 transition-colors',
                      openIndex === index ? 'text-primary' : 'text-muted-foreground'
                    )} />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 bg-muted/30 border-x-4 border-b-4 border-border ml-0 sm:ml-16">
                      <p className="font-retro text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-card pixel-border p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="w-6 h-6 text-accent" />
              <span className="font-pixel text-sm text-foreground">Still have questions?</span>
            </div>
            <p className="font-retro text-lg text-muted-foreground">
              Join our <a href="#" className="text-accent hover:text-primary transition-colors underline">Discord community</a> for quick answers!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
