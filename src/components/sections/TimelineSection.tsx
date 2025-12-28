import { motion } from 'framer-motion';
import { Calendar, Rocket, Trophy, Award } from 'lucide-react';
import villegeBackground from '../../assets/Backgrounds/villege.jpg';
import hangingSign from '../../../public/hanging-sign-removebg-preview.png';

const timelineEvents = [
  { icon: Calendar, title: 'Registration Opens', date: 'January 15, 2026', description: 'Sign up your team and prepare for the adventure!' },
  { icon: Rocket, title: 'Hack Starts', date: 'March 1, 2026', description: '48 hours of intense creation and building.' },
  { icon: Trophy, title: 'Judging Period', date: 'March 3, 2026', description: 'Present your project to expert judges.' },
  { icon: Award, title: 'Winners Announced', date: 'March 5, 2026', description: 'Celebrate the champions of the pixel world!' },
];

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative pt-32 sm:pt-60 pb-32 sm:pb-40 px-4 overflow-hidden select-none -mt-20 z-10"
      style={{
        backgroundImage: `url(${villegeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        <div className="text-center mb-20 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-pixel text-white mb-3">
            EVENT <span className="text-yellow-400">TIMELINE</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Follow the path through the hackathon
          </p>
        </div>

        {/* Timeline spine */}
        <div
          className="
            absolute left-1/2
            top-[140px] sm:top-[220px]
            bottom-0
            w-[5px] sm:w-[12px]
            -translate-x-1/2
            bg-[#eacb4a]
          "
        />

        <div className="relative z-10 flex flex-col items-center gap-20 sm:gap-28">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex justify-center w-full"
              >
                <div className="absolute -top-14 sm:-top-24 left-1/2 h-14 sm:h-24 w-[2px] bg-[#5a3e26] -translate-x-1/2" />

                <motion.div
                  className="relative w-[260px] sm:w-[440px]"
                  animate={{ rotate: [-1.2, 1.2, -1.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top center' }}
                >
                  <img
                    src={hangingSign}
                    alt="Timeline sign"
                    draggable={false}
                    className="w-full h-auto select-none pointer-events-none mix-blend-screen"
                  />

                  {/* ⬇️ ONLY CHANGE IS HERE */}
                  <div className="absolute left-0 right-0 top-[42%] sm:top-[46%] px-6 sm:px-12 text-center pointer-events-none">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#2a1a0f]" />
                      <h3 className="text-lg sm:text-2xl font-pixel text-[#1a0f08]">
                        {event.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-lg font-retro text-[#3b2414] mb-2 sm:mb-6">
                      {event.date}
                    </p>

                    <p className="text-xs sm:text-base font-minecraft text-[#120a05] leading-relaxed max-w-[220px] sm:max-w-[340px] mx-auto">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
