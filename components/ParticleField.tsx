'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn ambient particles
    const spawnAmbient = () => {
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.1,
          size: Math.random() * 1.5 + 0.3,
          alpha: Math.random() * 0.5 + 0.1,
          life: Math.random() * 300,
          maxLife: 200 + Math.random() * 400,
          hue: 255 + Math.random() * 60 - 30,
        });
      }
    };
    spawnAmbient();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // Spawn cursor trail particles
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2 + 0.5,
          alpha: 0.7 + Math.random() * 0.3,
          life: 0,
          maxLife: 40 + Math.random() * 60,
          hue: 260 + Math.random() * 60,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    let lastSpawn = 0;
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new ambient particles periodically
      if (timestamp - lastSpawn > 200) {
        lastSpawn = timestamp;
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.6 - 0.2,
          size: Math.random() * 1.8 + 0.3,
          alpha: Math.random() * 0.4 + 0.1,
          life: 0,
          maxLife: 300 + Math.random() * 300,
          hue: 250 + Math.random() * 80,
        });
      }

      // Mouse attraction zone
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.life++;

        // Soft mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && mx > 0) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        const fadeIn = Math.min(progress * 6, 1);
        const fadeOut = 1 - Math.pow(progress, 2);
        const alpha = p.alpha * fadeIn * fadeOut;

        const sat = dist < 180 ? 90 : 70;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${sat}%, 70%, ${alpha})`;
        ctx.fill();

        // Glow for close-to-cursor particles
        if (dist < 120 && mx > 0 && alpha > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.2})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
