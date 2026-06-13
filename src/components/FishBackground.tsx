import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  delta: number;
  speed: number;
}

interface Shooting {
  x: number;
  y: number;
  len: number;
  angle: number;
  speed: number;
  alpha: number;
  active: boolean;
  timer: number;
  nextAt: number;
}

export function FishBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;
    let stars: Star[] = [];
    let shooting: Shooting[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildStars();
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildStars = () => {
      const count = Math.floor((W * H) / 3000);
      stars = Array.from({ length: count }, () => ({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(0.3, 1.8),
        alpha: rand(0.2, 1),
        delta: rand(0.003, 0.012) * (Math.random() > 0.5 ? 1 : -1),
        speed: 0,
      }));

      shooting = Array.from({ length: 6 }, (_, i) => ({
        x: 0, y: 0, len: rand(80, 160), angle: rand(0.3, 0.6),
        speed: rand(6, 12), alpha: 0, active: false,
        timer: 0, nextAt: rand(60, 200) + i * 90,
      }));
    };

    const spawnShoot = (s: Shooting) => {
      s.x = rand(W * 0.1, W * 0.9);
      s.y = rand(H * 0.05, H * 0.4);
      s.alpha = 1;
      s.active = true;
      s.timer = 0;
    };

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Deep space gradient background
      const bg = ctx.createLinearGradient(0, 0, W * 0.4, H);
      bg.addColorStop(0,   '#020510');
      bg.addColorStop(0.5, '#050b1a');
      bg.addColorStop(1,   '#030812');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebula blobs
      const nebulas = [
        { cx: W * 0.15, cy: H * 0.25, rx: W * 0.22, ry: H * 0.22, c1: 'rgba(0,60,160,0.09)', c2: 'transparent' },
        { cx: W * 0.8,  cy: H * 0.5,  rx: W * 0.28, ry: H * 0.28, c1: 'rgba(100,0,160,0.07)', c2: 'transparent' },
        { cx: W * 0.5,  cy: H * 0.85, rx: W * 0.3,  ry: H * 0.2,  c1: 'rgba(0,120,180,0.06)', c2: 'transparent' },
        { cx: W * 0.65, cy: H * 0.15, rx: W * 0.18, ry: H * 0.18, c1: 'rgba(180,0,80,0.05)', c2: 'transparent' },
      ];
      nebulas.forEach(n => {
        const g = ctx.createRadialGradient(n.cx, n.cy, 0, n.cx, n.cy, Math.max(n.rx, n.ry));
        g.addColorStop(0,   n.c1);
        g.addColorStop(1,   n.c2);
        ctx.fillStyle = g;
        ctx.save();
        ctx.scale(1, n.ry / n.rx);
        ctx.beginPath();
        ctx.arc(n.cx, n.cy * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Stars — twinkle
      stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha <= 0.1 || s.alpha >= 1) s.delta *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
        ctx.fill();
      });

      // Shooting stars
      frame++;
      shooting.forEach(s => {
        s.timer++;
        if (!s.active && s.timer >= s.nextAt) {
          spawnShoot(s);
        }
        if (!s.active) return;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.025;

        if (s.alpha <= 0) {
          s.active = false;
          s.timer = 0;
          s.nextAt = rand(120, 400);
          return;
        }

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0,   'rgba(200,230,255,0)');
        grad.addColorStop(0.6, `rgba(180,210,255,${s.alpha * 0.5})`);
        grad.addColorStop(1,   `rgba(255,255,255,${s.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
        hg.addColorStop(0,   `rgba(255,255,255,${s.alpha})`);
        hg.addColorStop(1,   'transparent');
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
}
