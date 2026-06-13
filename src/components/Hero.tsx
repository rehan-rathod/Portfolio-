import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Mail, ExternalLink } from 'lucide-react';
import { Linkedin } from 'lucide-react';

const ROLES = [
  'Frontend Developer',
  'React.js Engineer',
  'AI Integrations Dev',
  'TypeScript Builder',
];

function useTypingCycle(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const floatingBadges = [
  { label: 'React.js',     x: '78%', y: '18%', delay: 0.2  },
  { label: 'TypeScript',   x: '82%', y: '42%', delay: 0.5  },
  { label: 'OpenAI API',   x: '70%', y: '64%', delay: 0.8  },
  { label: 'Tailwind CSS', x: '76%', y: '82%', delay: 1.1  },
  { label: 'n8n',          x: '60%', y: '74%', delay: 1.35 },
  { label: 'Next.js',      x: '88%', y: '58%', delay: 1.6  },
];

export function Hero() {
  const role = useTypingCycle(ROLES);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative flex items-center pt-16 overflow-hidden"
    >
      {/* Radial spotlight that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,198,251,0.07) 0%, transparent 65%)`,
        }}
      />

      {/* Static ambient glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #005bea55, transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #c471ed44, transparent 70%)' }} />

      {/* Grid lines overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-0">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 flex flex-col items-start text-left max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Status pill */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="font-heading font-black leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="text-foreground">Rehan</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00c6fb 0%, #c471ed 100%)' }}
            >
              Rathod
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3 h-10">
            <span className="text-xl md:text-2xl font-mono text-muted-foreground">
              {role}
              <span className="ml-0.5 inline-block w-0.5 h-5 bg-primary align-middle animate-pulse" />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
            BCA student (Year 2) at ITM Baroda — building AI-powered web apps with
            React, TypeScript, and modern frontend tooling. Passionate about clean UI
            and real-world automation.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => scrollTo('projects')}
              data-testid="btn-view-projects"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-background transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #00c6fb, #005bea)' }}
            >
              View Projects <ArrowDown size={15} />
            </button>
            <a
              href="mailto:rehanrathod24903@gmail.com"
              data-testid="btn-email-hero"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-foreground border border-white/12 bg-white/4 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all duration-200"
            >
              <Mail size={15} /> Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/50 font-mono uppercase tracking-widest">Find me on</span>
            <div className="h-px w-8 bg-white/10" />
            <a
              href="https://github.com/rehan-rathod"
              target="_blank"
              rel="noreferrer"
              data-testid="link-github-hero"
              className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/25 transition-all"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/rehan-rathod"
              target="_blank"
              rel="noreferrer"
              data-testid="link-linkedin-hero"
              className="p-2 rounded-full border border-white/10 text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all"
            >
              <Linkedin size={17} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — floating badges ── */}
        <div className="hidden lg:block flex-1 relative h-[480px]">
          {/* Centre glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #00c6fb55, transparent 70%)', filter: 'blur(24px)' }} />

          {/* Decorative circle rings */}
          {[180, 270, 360].map((size, i) => (
            <motion.div
              key={size}
              className="absolute top-1/2 left-1/2 rounded-full border border-white/5"
              style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear', direction: i % 2 === 0 ? 'normal' : 'reverse' } as any}
            />
          ))}

          {/* Centre avatar/icon placeholder */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black font-heading border border-white/10"
            style={{ background: 'linear-gradient(135deg, #005bea22, #c471ed22)', backdropFilter: 'blur(12px)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
          >
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#00c6fb,#c471ed)' }}>RR</span>
          </motion.div>

          {/* Floating tech badges */}
          {floatingBadges.map((badge) => (
            <motion.div
              key={badge.label}
              className="absolute px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-white/10 bg-white/5 backdrop-blur-sm text-muted-foreground"
              style={{ left: badge.x, top: badge.y, transform: 'translate(-50%,-50%)' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: { delay: badge.delay, duration: 0.4 },
                scale: { delay: badge.delay, duration: 0.4 },
                y: { delay: badge.delay + 0.4, duration: 3 + badge.delay, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {badge.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
