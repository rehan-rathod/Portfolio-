import React from 'react';
import { motion } from 'framer-motion';

const upcoming = [
  "Interactive Data Dashboard",
  "Multi-Step Form with n8n automation",
  "Markdown Blog CMS (Next.js + MDX)",
  "Notion-Style Notes App with n8n",
  "Visual CSS Generator Tool"
];

export function CurrentlyBuilding() {
  return (
    <section className="py-16 relative z-10 bg-black/20">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h3 className="text-2xl font-heading font-semibold mb-8 text-foreground/90">
          Currently Building / Roadmap
        </h3>
        
        <div className="flex flex-col gap-4">
          {upcoming.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-4 rounded-xl border border-white/5 bg-secondary/30 backdrop-blur-sm group overflow-hidden"
            >
              {/* Animated subtle border effect */}
              <div className="absolute inset-0 border border-primary/20 rounded-xl group-hover:border-primary/50 transition-colors pointer-events-none" style={{ borderStyle: 'dashed', borderWidth: '1px' }}></div>
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
