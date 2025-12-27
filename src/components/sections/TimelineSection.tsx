import { motion } from 'framer-motion';
import { Calendar, Rocket, Trophy, Award } from 'lucide-react';

const timelineEvents = [
  {
    icon: Calendar,
    title: 'Registration Opens',
    date: 'January 15, 2026',
    description: 'Sign up your team and prepare for the adventure!',
  },
  {
    icon: Rocket,
    title: 'Hack Starts',
    date: 'March 1, 2026',
    description: '48 hours of intense creation and building.',
  },
  {
    icon: Trophy,
    title: 'Judging Period',
    date: 'March 3, 2026',
    description: 'Present your project to expert judges.',
  },
  {
    icon: Award,
    title: 'Winners Announced',
    date: 'March 5, 2026',
    description: 'Celebrate the champions of the pixel world!',
  },
];

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative py-40 px-4 bg-[#000000] overflow-hidden select-none"
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0),_rgba(0,0,0,0.8)_70%)] pointer-events-none" />


      <div className="relative max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-32">
          <h2 className="text-4xl font-pixel text-white mb-3 tracking-wider">
            EVENT <span className="text-yellow-400">TIMELINE</span>
          </h2>

          <p className="text-base text-white/60 mb-8">
            Follow the path through the hackathon
          </p>

          <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 shadow-[0_0_12px_rgba(255,215,0,0.9)]" />
            <span className="text-[10px] font-pixel tracking-tighter text-yellow-400">
              START
            </span>
          </div>
        </div>

        {/* SPINE */}
        <div
          className="
            absolute left-1/2 top-[220px] bottom-0 w-[3px]
            -translate-x-1/2
            bg-gradient-to-b
            from-[#f5c76b]
            to-[#7a522d]
            opacity-90
          "
        />

        {/* EVENTS */}
        <div className="relative z-10 flex flex-col items-center gap-28">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative flex justify-center w-full"
              >
                {/* Chain */}
                <div className="absolute -top-24 left-1/2 h-24 w-[2px] bg-[#5a3e26] -translate-x-1/2" />

                {/* SIGN */}
                <motion.div
                  className="relative w-[440px]"
                  animate={{ rotate: [-1.2, 1.2, -1.2] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: 'top center' }}
                >
                  <img
                    src="/hanging-sign.png"
                    alt="Timeline sign"
                    draggable={false}
                    className="w-full h-auto select-none pointer-events-none"
                  />

                  {/*FIXED TEXT POSITION */}
                  <div className="absolute left-0 right-0 top-[46%] flex flex-col items-center px-12 text-center pointer-events-none">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-7 h-7 text-[#2a1a0f]" />
                      <h3 className="text-2xl font-pixel text-[#1a0f08]">
                        {event.title}
                      </h3>
                    </div>

                    <p className="text-lg font-retro text-[#3b2414] mb-6">
                      {event.date}
                    </p>

                    <p className="text-base font-minecraft text-[#120a05] leading-relaxed max-w-[340px]">
                      {event.description}
                    </p>
                  </div>
                </motion.div>

                {/* Node */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
