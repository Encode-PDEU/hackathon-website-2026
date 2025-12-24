import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelButton } from '../PixelButton';
import { User, Mail, Users, Code, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
  teamName: z.string().trim().min(2, 'Team name must be at least 2 characters').max(50),
  experience: z.string().min(1, 'Please select your experience level'),
});

type FormData = z.infer<typeof registrationSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export function RegistrationSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    teamName: '',
    experience: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      registrationSchema.shape[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registrationSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof FormData] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', teamName: '', experience: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const inputFields = [
    { name: 'name' as const, type: 'text', placeholder: 'Your Name', icon: User },
    { name: 'email' as const, type: 'email', placeholder: 'Email Address', icon: Mail },
    { name: 'teamName' as const, type: 'text', placeholder: 'Team Name', icon: Users },
  ];

  return (
    <section id="registration" className="py-24 px-4 relative bg-gradient-to-b from-card/50 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-primary/10 rotate-45" />
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-gold/10 rotate-12" />
      </div>

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-retro text-lg text-primary mb-4 block">✨ LIMITED SPOTS AVAILABLE</span>
          <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground mb-4">
            <span className="text-accent">JOIN</span> THE ADVENTURE
          </h2>
          <p className="font-retro text-xl text-muted-foreground">
            Register your team for the hackathon
          </p>
        </motion.div>

        {/* Inventory-style form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card pixel-border p-6 sm:p-8"
        >
          <div className="text-center mb-6">
            <span className="font-pixel text-xs sm:text-sm text-muted-foreground">
              ═══ REGISTRATION INVENTORY ═══
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {inputFields.map((field, index) => {
              const Icon = field.icon;
              const hasError = errors[field.name];
              return (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`hotbar-slot shrink-0 ${hasError ? 'border-destructive' : ''}`}>
                      <Icon className={`w-5 h-5 ${hasError ? 'text-destructive' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`inventory-input w-full ${hasError ? 'border-destructive' : ''}`}
                      />
                    </div>
                  </div>
                  {hasError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-destructive font-retro text-sm mt-1 ml-16 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {hasError}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}

            {/* Experience dropdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`hotbar-slot shrink-0 ${errors.experience ? 'border-destructive' : ''}`}>
                  <Code className={`w-5 h-5 ${errors.experience ? 'text-destructive' : 'text-gold'}`} />
                </div>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={`inventory-input flex-1 cursor-pointer ${errors.experience ? 'border-destructive' : ''}`}
                >
                  <option value="">Select Experience Level</option>
                  <option value="beginner">🌱 Beginner (New to hackathons)</option>
                  <option value="intermediate">⚔️ Intermediate (1-3 hackathons)</option>
                  <option value="expert">👑 Expert (4+ hackathons)</option>
                </select>
              </div>
              {errors.experience && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-destructive font-retro text-sm mt-1 ml-16 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.experience}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4 text-center"
            >
              <PixelButton type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  SUBMIT REGISTRATION
                </span>
              </PixelButton>
            </motion.div>
          </form>

          {/* Info note */}
          <p className="text-center font-retro text-muted-foreground mt-6 text-sm">
            🔒 Your data is safe with us. We never share your information.
          </p>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="bg-card pixel-border p-8 text-center max-w-md w-full"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  📦
                </motion.div>
                <h3 className="font-pixel text-lg text-primary mb-4 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  CHEST OPENED!
                </h3>
                <p className="font-retro text-xl text-muted-foreground">
                  Registration received! Check your email for confirmation.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ delay: i * 0.1, repeat: Infinity, duration: 0.5 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
