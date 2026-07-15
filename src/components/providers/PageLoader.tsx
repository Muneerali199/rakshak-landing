"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => {
        setPhase(4);
        onComplete();
      }, 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase >= 4) return null;

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {phase >= 1 && phase < 3 && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="font-heading text-6xl font-bold text-rakshak-cyan devanagari-glow md:text-8xl"
            >
              रक्षक
            </motion.h1>
          )}
          {phase >= 2 && phase < 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute"
            >
              <ShieldParticles />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ShieldParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (i / 24) * Math.PI * 2,
    delay: i * 0.03,
  }));

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80">
      {particles.map((p) => (
        <motion.circle
          key={p.id}
          r="4"
          fill="#00E5FF"
          initial={{
            cx: 100 + Math.cos(p.angle) * 80,
            cy: 100 + Math.sin(p.angle) * 80,
            opacity: 0,
          }}
          animate={{
            cx: 100 + Math.cos(p.angle) * 40,
            cy: 100 + Math.sin(p.angle) * 40,
            opacity: 1,
          }}
          transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
        />
      ))}
      <motion.path
        d="M100 30 L160 60 V110 C160 150 100 175 100 175 C100 175 40 150 40 110 V60 Z"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
  );
}
