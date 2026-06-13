import { useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface Project {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  deploy?: string;
  image?: string;
  gradient: string;
  accent: string;
  featured: boolean;
  index: number;
}

export function ProjectCard3D({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    setTilt({ x: (y / cy) * -8, y: (x / cx) * 8 });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      show: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(g => ({ ...g, show: false }));
  };

  const num = String(project.index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`card-project-${project.slug}`}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full group cursor-default"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'transform 0.08s linear',
        background: '#0a0f1a',
        boxShadow: glare.show
          ? `0 20px 60px -10px ${project.accent}55, 0 0 0 1px ${project.accent}33`
          : '0 4px 24px -4px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glare.show ? 1 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
        }}
      />

      {/* Gradient banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: project.gradient,
          height: project.featured ? '220px' : '160px',
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Noise texture */
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        {/* Bottom fade to card bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, #0a0f1a)' }} />

        {/* Number label */}
        <div className="absolute top-4 left-5 font-mono text-xs text-white/50 font-bold tracking-widest">
          {num}
        </div>

        {/* Slug label */}
        <div className="absolute bottom-4 left-5">
          <span className="font-mono text-xs text-white/70 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
            ./{project.slug}
          </span>
        </div>

        {/* Links top-right */}
        <div className="absolute top-4 right-4 flex gap-2 z-30">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-testid={`github-project-${project.slug}`}
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all flex items-center justify-center"
            >
              <Github size={14} />
            </a>
          )}
          {(project.deploy || project.link) && (
            <a
              href={project.deploy || project.link}
              target="_blank"
              rel="noreferrer"
              data-testid={`link-project-${project.slug}`}
              onClick={e => e.stopPropagation()}
              className="p-2 rounded-full bg-black/25 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all flex items-center justify-center"
            >
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Accent bar */}
        <div className="h-px w-full rounded-full opacity-40"
          style={{ background: project.gradient }} />

        <div>
          <h3
            className="font-bold text-foreground leading-snug mb-2"
            style={{ fontSize: project.featured ? '1.15rem' : '1rem' }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md font-mono"
              style={{
                background: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
