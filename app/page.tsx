'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import ParticleField from '@/components/ParticleField';
import CustomCursor from '@/components/CustomCursor';

const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => null,
});

const HEADLINE = "Built in Silence.";
const HEADLINE2 = "Revealed with Impact.";

const services = ['Branding', 'Motion', 'UI/UX', 'Websites', 'Creative Direction'];

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function ServiceLabels() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % services.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      {services.map((s, i) => (
        <motion.span
          key={s}
          animate={{
            opacity: active === i ? 1 : 0.22,
            color: active === i ? '#B56DFF' : '#888',
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}

function GlassCard({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (mouseX - cx) / (rect.width / 2);
    const dy = (mouseY - cy) / (rect.height / 2);
    setRotX(-dy * 6);
    setRotY(dx * 6);
    setGlowX(((mouseX - rect.left) / rect.width) * 100);
    setGlowY(((mouseY - rect.top) / rect.height) * 100);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.08s ease-out',
        position: 'relative',
        borderRadius: '24px',
        padding: '3px',
        background: `radial-gradient(ellipse at ${glowX}% ${glowY}%, rgba(122,60,255,0.35) 0%, rgba(181,109,255,0.12) 40%, transparent 70%)`,
      }}
    >
      {/* Shimmer streak */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-60%',
            width: '40%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
            animation: 'shimmer-streak 5s ease-in-out infinite',
          }}
        />
      </div>

      <div
        className="glass-panel"
        style={{
          borderRadius: '22px',
          padding: '56px 48px 52px',
          maxWidth: '660px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
          background: `
            radial-gradient(ellipse at ${glowX}% ${glowY}%, rgba(122,60,255,0.06) 0%, transparent 60%),
            rgba(255,255,255,0.02)
          `,
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#B56DFF',
              boxShadow: '0 0 8px rgba(181,109,255,0.9), 0 0 16px rgba(122,60,255,0.5)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(181,109,255,0.8)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            ASHENOX — 2026
          </span>
        </motion.div>

        {/* Main headline */}
        <div style={{ marginBottom: '10px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5.1vw, 3.3rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.025em',
            }}
          >
            <div className="text-gradient">
              <LetterReveal text={HEADLINE} delay={0.5} />
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(220,200,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <LetterReveal text={HEADLINE2} delay={1.2} />
            </div>
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 2.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 400,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '48px',
            maxWidth: '480px',
          }}
        >
          Ashenox is crafting the future of branding,
          design, motion and digital experiences.
          <br />
          <span style={{ color: 'rgba(181,109,255,0.6)' }}>
            Something worth the wait.
          </span>
        </motion.p>

        {/* CTA Button */}
        <CTAButton />

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 3.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'left', marginBottom: '28px', marginTop: '48px' }}
        >
          <div className="glow-divider" />
        </motion.div>

        {/* Service labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
        >
          <ServiceLabels />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CTAButton() {
  const [clicked, setClicked] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
    setClicked(true);
    setTimeout(() => {
      setShowMsg(true);
      setClicked(false);
    }, 600);
    setTimeout(() => setShowMsg(false), 3200);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <AnimatePresence>
        {clicked && (
          <motion.div
            key="flash"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(181,109,255,0.35) 0%, rgba(122,60,255,0.15) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 9990,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showMsg ? (
          <motion.div
            key="msg"
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -6 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B56DFF',
              textShadow: '0 0 12px rgba(181,109,255,0.8)',
              padding: '14px 32px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Stay Tuned.
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            className="cta-btn"
            onClick={handleClick}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              borderRadius: '50px',
              padding: '14px 36px',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
            data-cursor-hover
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Reveal Soon</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              →
            </motion.span>

            {ripple && (
              <motion.span
                key={ripple.id}
                initial={{ width: 0, height: 0, opacity: 0.6 }}
                animate={{ width: 300, height: 300, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  background: 'rgba(181,109,255,0.4)',
                  left: ripple.x,
                  top: ripple.y,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function AmbientBackground() {
  return (
    <>
      {/* Base fog layers */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 30% 70%, rgba(60,20,120,0.35) 0%, transparent 60%)',
          animation: 'drift 18s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 75% 25%, rgba(100,30,200,0.2) 0%, transparent 55%)',
          animation: 'drift 24s ease-in-out infinite reverse',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 40% at 50% 90%, rgba(80,10,160,0.3) 0%, transparent 50%)',
          animation: 'drift 30s ease-in-out infinite 5s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Light streaks */}
      <div
        style={{
          position: 'fixed',
          top: '15%',
          left: '-10%',
          width: '60%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(122,60,255,0.3), transparent)',
          transform: 'rotate(-12deg)',
          animation: 'shimmer-streak 8s ease-in-out infinite 2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '30%',
          right: '-5%',
          width: '50%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(181,109,255,0.25), transparent)',
          transform: 'rotate(8deg)',
          animation: 'shimmer-streak 11s ease-in-out infinite 6s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Abstract blurred blobs */}
      <div
        style={{
          position: 'fixed',
          top: '-15%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,20,180,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 20s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          left: '-15%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,10,200,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'float-reverse 25s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#050507',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Ambient background layers */}
      <AmbientBackground />

      {/* Particle field */}
      {mounted && <ParticleField />}

      {/* Custom cursor */}
      {mounted && <CustomCursor />}

      {/* Three.js 3D scene — behind glass card */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {mounted && <ThreeScene />}
      </div>

      {/* Central ambient glow */}
      <div
        className="ambient-glow"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          animation: 'pulse-glow 6s ease-in-out infinite',
        }}
      />

      {/* Glass card — main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '700px',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Page entry animation wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: '100%' }}
        >
          <GlassCard mouseX={mousePos.x} mouseY={mousePos.y} />
        </motion.div>

        {/* Bottom caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
          style={{
            marginTop: '28px',
            fontSize: '0.68rem',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: "'Space Grotesk', sans-serif",
            textAlign: 'center',
          }}
        >
          The wait won&apos;t be long.
        </motion.p>
      </div>
    </main>
  );
}
