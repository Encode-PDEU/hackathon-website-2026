import { useState } from 'react';
import { motion } from 'framer-motion';
import { PixelButton } from '../PixelButton';
import { PixelBlock } from '../PixelBlock';
import { Mail, Send, MessageSquare, ExternalLink } from 'lucide-react';

export function ContactSection() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setEmail('');
    }, 2000);
  };

  const socialLinks = [
    { name: 'Discord', href: '#', emoji: '💬', color: 'hover:border-accent' },
    { name: 'Twitter', href: '#', emoji: '🐦', color: 'hover:border-accent' },
    { name: 'GitHub', href: '#', emoji: '🐙', color: 'hover:border-primary' },
    { name: 'Telegram', href: '#', emoji: '✈️', color: 'hover:border-accent' },
  ];

  const sponsors = ['Encode Club', 'MLH', 'Web3 Foundation', 'Ethereum Foundation'];

  return (
    <section id="contact" className="py-24 px-4 relative bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-retro text-lg text-primary mb-4 block">🏘️ COMMUNITY HUB</span>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-4">
            <span className="text-gold text-glow-gold">VILLAGE</span> NOTICE BOARD
          </h2>
          <p className="font-retro text-xl text-muted-foreground">
            Get in touch and join our community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card pixel-border p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-muted flex items-center justify-center pixel-border-sm">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-pixel text-sm text-foreground">SEND MESSAGE</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="hotbar-slot shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inventory-input flex-1"
                  required
                />
              </div>

              <textarea
                placeholder="Your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="inventory-input w-full resize-none"
                required
              />

              <PixelButton 
                type="submit" 
                variant={submitted ? 'gold' : 'primary'} 
                size="md" 
                className="w-full"
                disabled={submitted}
              >
                <span className="flex items-center justify-center gap-2">
                  {submitted ? (
                    <>✓ SENT!</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SEND MESSAGE
                    </>
                  )}
                </span>
              </PixelButton>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card pixel-border p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-muted flex items-center justify-center pixel-border-sm">
                <span className="text-xl">🌐</span>
              </div>
              <h3 className="font-pixel text-sm text-foreground">JOIN COMMUNITY</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 sm:p-4 bg-muted/50 pixel-border-sm ${link.color} transition-colors group`}
                >
                  <span className="text-xl sm:text-2xl">{link.emoji}</span>
                  <span className="font-retro text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <div className="mt-6 p-4 bg-muted/30 pixel-border-sm">
              <p className="font-pixel text-xs text-muted-foreground mb-2">DIRECT EMAIL</p>
              <a 
                href="mailto:hackathon@encode.club" 
                className="font-retro text-lg sm:text-xl text-accent hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                hackathon@encode.club
              </a>
            </div>
          </motion.div>
        </div>

        {/* Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-card/50 pixel-border p-6 text-center">
            <h3 className="font-pixel text-sm text-muted-foreground mb-6">⭐ OUR SPONSORS ⭐</h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-muted/50 pixel-border-sm"
                >
                  <span className="font-retro text-lg text-foreground">{sponsor}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer decoration */}
        <motion.div 
          className="mt-16 flex justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {(['grass', 'dirt', 'stone', 'diamond', 'gold'] as const).map((type, index) => (
            <motion.div
              key={type}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotate: 5 }}
            >
              <PixelBlock type={type} size={28} />
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-retro text-lg text-muted-foreground">
            © 2026 Encode Club Hackathon. Built with ❤️ and pixels.
          </p>
          <p className="font-retro text-sm text-muted-foreground/60 mt-2">
            Made for the MLH Grant Program
          </p>
        </motion.div>
      </div>
    </section>
  );
}
