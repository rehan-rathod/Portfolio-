import React from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "Vite"]
  },
  {
    category: "AI & Automation",
    skills: ["OpenAI API", "Gemini API", "n8n"]
  },
  {
    category: "Backend & Data",
    skills: ["REST APIs", "Firebase", "Drizzle ORM", "Express"]
  },
  {
    category: "Currently Learning",
    skills: ["Next.js", "React Router v6", "Zustand", "Jest"]
  }
];

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-black/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 flex items-center gap-4">
          <span className="h-px w-12 bg-primary"></span>
          Technical Arsenal
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group, i) => (
            <div key={i}>
              <h3 className="text-lg font-heading font-semibold text-primary/90 mb-4 uppercase tracking-wider text-sm">
                {group.category}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {group.skills.map((skill) => (
                  <motion.span 
                    key={skill}
                    variants={item}
                    className="px-4 py-2 bg-secondary/80 backdrop-blur-sm border border-white/10 rounded-lg text-sm font-medium text-foreground hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
