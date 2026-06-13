import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard3D } from './ProjectCard3D';

const projectsData = [
  {
    title: "Campus Event Notify",
    slug: "campus-event-notify",
    description: "Full-stack campus event notification platform with React + TypeScript frontend and Express + Drizzle ORM backend. Structured across client, server, and shared folders, demonstrating real full-stack architecture.",
    tech: ["React", "TypeScript", "Tailwind", "Express", "Drizzle ORM", "Vite"],
    github: "https://github.com/rehan-rathod/CampusEventNotify",
    gradient: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)",
    accent: "#00c6fb",
    featured: true,
  },
  {
    title: "AI Chat Interface",
    slug: "ai-chat-interface",
    description: "Conversational AI app with streaming response display, chat history, and model selection between different AI providers.",
    tech: ["React", "TypeScript", "OpenAI API", "Streaming"],
    gradient: "linear-gradient(135deg, #c471ed 0%, #f64f59 100%)",
    accent: "#c471ed",
    featured: true,
  },
  {
    title: "Kanban Board with Automation",
    slug: "kanban-board-with-automation",
    description: "Drag-and-drop task board integrated with n8n to trigger email/Telegram notifications automatically when tasks are marked complete.",
    tech: ["React", "TypeScript", "n8n", "DnD"],
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    accent: "#38ef7d",
    featured: true,
  },
  {
    title: "GitHub Profile Finder",
    slug: "github-profile-finder",
    description: "Search any GitHub username to view repos, stars, followers, and contribution activity via the GitHub REST API.",
    tech: ["React", "TypeScript", "GitHub API", "Tailwind"],
    github: "https://github.com/rehan-rathod/github-profile-finder",
    deploy: "https://github-profile-finder-rosy.vercel.app/",
    image: "/projects/github-profile-finder.png",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    accent: "#f093fb",
    featured: false,
  },
  {
    title: "Resume Builder",
    slug: "resume-builder",
    description: "Interactive resume builder with live preview that updates in real time, with one-click PDF export.",
    tech: ["React", "TypeScript", "PDF Export"],
    github: "https://github.com/rehan-rathod/resume-builder",
    deploy: "https://resume-builder-blush-two.vercel.app/",
    image: "/projects/resume-builder.png",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    accent: "#ffd200",
    featured: false,
  },
  {
    title: "Weather App",
    slug: "weather-app",
    description: "Real-time weather forecasting application providing current conditions, temperature details, and multi-day forecasts using the OpenWeather API.",
    tech: ["React", "TypeScript", "OpenWeather API", "Tailwind"],
    github: "https://github.com/rehan-rathod/weather",
    deploy: "https://weather-sand-chi.vercel.app/",
    image: "/projects/weather-app.png",
    gradient: "linear-gradient(135deg, #72afd3 0%, #37ecba 100%)",
    accent: "#37ecba",
    featured: false,
  },
  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    description: "Personal finance tracker with categorized transactions and interactive monthly charts, persisted via localStorage.",
    tech: ["React", "TypeScript", "Chart.js"],
    gradient: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
    accent: "#f953c6",
    featured: false,
  },
];

export function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const visible = filter === 'featured'
    ? projectsData.filter(p => p.featured)
    : projectsData;

  return (
    <section id="projects" className="py-28 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-mono text-primary tracking-[0.2em] mb-4 uppercase">
              03 &nbsp;/&nbsp; Projects
            </p>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4 leading-none">
              Selected<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg,#00c6fb,#c471ed)' }}>
                work.
              </span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Real projects built end-to-end — from scoping to deployment.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-1 bg-white/4 border border-white/8 rounded-full p-1 self-start md:self-auto"
          >
            {(['featured', 'all'] as const).map(f => (
              <button
                key={f}
                data-testid={`filter-${f}`}
                onClick={() => setFilter(f)}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                style={{ color: filter === f ? '#0a0f1a' : 'var(--muted-foreground)' }}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
          >
            {visible.map((project, i) => {
              const isBig = i === 0 && filter === 'all';
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className={isBig ? 'lg:col-span-2' : ''}
                >
                  <ProjectCard3D project={{ ...project, featured: isBig, index: i }} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
