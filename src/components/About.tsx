import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, GraduationCap, Linkedin } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 flex items-center gap-4">
            <span className="h-px w-12 bg-primary"></span>
            About Me
          </h2>

          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3 space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                I am a passionate Frontend Developer specializing in React.js, TypeScript, and integrating modern AI tools to build intelligent web applications.
              </p>
              <p>
                Currently pursuing my BCA at ITM (SLS) Baroda University, I balance academic learning with building real-world projects that solve actual problems—from campus notification systems to conversational AI interfaces.
              </p>
              <p>
                I love combining clean, maintainable code with stunning visual design, ensuring every digital experience is both powerful and beautiful.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="mailto:rehanrathod24903@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors text-sm text-foreground">
                  <Mail size={16} className="text-primary" /> Email Me
                </a>
                <a href="https://github.com/rehan-rathod" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors text-sm text-foreground">
                  <SiGithub size={16} /> GitHub
                </a>
                <a href="https://linkedin.com/in/rehan-rathod" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors text-sm text-foreground">
                  <Linkedin size={16} className="text-[#0A66C2]" /> LinkedIn
                </a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="bg-secondary/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  <GraduationCap size={24} />
                  <h3 className="font-heading font-semibold text-lg text-foreground">Education</h3>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">BCA (Year 2)</p>
                  <p className="text-sm text-muted-foreground">ITM (SLS) Baroda University</p>
                  <p className="text-xs text-primary/70 mt-2">2024 – 2027</p>
                </div>
              </div>

              <div className="bg-secondary/40 backdrop-blur-md border border-white/5 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={18} className="text-primary" />
                    <span className="text-sm">Vadodara, Gujarat, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={18} className="text-primary" />
                    <span className="text-sm">+91 8200408353</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
