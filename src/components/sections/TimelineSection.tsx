import { motion } from 'framer-motion';
import { PixelBlock } from '../PixelBlock';
import { Calendar, Rocket, Trophy, Award, CheckCircle } from 'lucide-react';

const timelineEvents = [
  {
    icon: Calendar,
    title: 'Registration Opens',
    date: 'January 15, 2026',
    description: 'Sign up your team and prepare for the adventure!',
    type: 'grass' as const,
    status: 'upcoming',
  },
  {
    icon: Rocket,
    title: 'Hack Starts',
    date: 'March 1, 2026',
    description: 'The building begins! 48 hours of intense creation.',
    type: 'diamond' as const,
    status: 'upcoming',
  },
  {
    icon: Trophy,
    title: 'Judging Period',
    date: 'March 3, 2026',
    description: 'Present your projects to our expert judges.',
    type: 'gold' as const,
    status: 'upcoming',
  },
  {
    icon: Award,
    title: 'Winners Announced',
    date: 'March 5, 2026',
    description: 'Celebrate the champions of the pixel world!',
    type: 'gold' as const,
    status: 'upcoming',
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-4 relative bg-gradient-to-b from-background to-card/50">
      {/* Decorative blocks */}
      <div className="absolute top-10 left-10 opacity-20">
        <PixelBlock type="stone" size={48} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <PixelBlock type="diamond" size={36} />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-retro text-lg text-accent mb-4 block">📅 MARK YOUR CALENDAR</span>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-4">
            <span className="text-gold text-glow-gold">EVENT</span> TIMELINE
          </h2>
          <p className="font-retro text-xl text-muted-foreground max-w-xl mx-auto">
            Your journey through the hackathon world begins here
          </p>
        </motion.div>

        {/* Timeline path */}
        <div className="relative">
          {/* Connecting line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-secondary -translate-x-1/2 hidden md:block pixel-border-sm">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-primary via-diamond to-gold"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Mobile connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-2 bg-secondary md:hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-gold"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-8 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                  className={`flex items-center gap-4 md:gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Mobile block */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="relative z-10 shrink-0 md:hidden"
                  >
                    <PixelBlock type={event.type} size={48} animate />
                  </motion.div>

                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="inline-block p-6 bg-card pixel-border hover:shadow-glow transition-shadow"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${
                        isLeft ? 'md:justify-end' : 'md:justify-start'
                      } justify-start`}>
                        <div className="w-10 h-10 bg-muted flex items-center justify-center pixel-border-sm">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <h3 className="font-pixel text-xs sm:text-sm text-foreground">
                          {event.title}
                        </h3>
                      </div>
                      <p className="font-retro text-lg text-accent mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary hidden sm:block" />
                        {event.date}
                      </p>
                      <p className="font-retro text-lg sm:text-xl text-muted-foreground">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Desktop center block */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="relative z-10 shrink-0 hidden md:block"
                  >
                    <PixelBlock type={event.type} size={56} animate />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-pixel text-xs text-muted-foreground">
                      {index + 1}/4
                    </span>
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-card/80 pixel-border p-6">
            <p className="font-retro text-xl text-muted-foreground mb-4">
              Don't miss any updates! Follow us for announcements.
            </p>
            <div className="flex justify-center gap-4">
              {['Discord', 'Twitter'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="font-retro text-lg text-accent hover:text-primary transition-colors px-4 py-2 bg-muted pixel-border-sm"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
