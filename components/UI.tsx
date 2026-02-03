import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, CheckCircle, ShoppingBag, Code2 } from 'lucide-react';

// --- Shared Viewport Config ---
const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -15% 0px" // Triggers when element is well inside the viewport
};

// --- Dev Tag (Temporary Layout Helper) ---
export const DevTag: React.FC<{ label: string; desc?: string }> = ({ label, desc }) => (
  <div className="absolute top-4 left-4 z-50 pointer-events-none select-none opacity-40 hover:opacity-100 transition-opacity duration-300 hidden md:block">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md">
      <Code2 size={10} className="text-yellow-500" />
      <div className="text-[10px] font-mono uppercase tracking-widest text-yellow-200/80">
        <span className="font-bold text-yellow-400">[{label}]</span>
        {desc && <span className="ml-2 border-l border-yellow-500/20 pl-2 opacity-70 normal-case tracking-normal">{desc}</span>}
      </div>
    </div>
  </div>
);

// --- Clinical Card (Paper Style) ---
interface ClinicalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<ClinicalCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-md w-full ${className}`}
      whileHover={hoverEffect ? { scale: 1.01, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// --- Hero Toast Card (Nubank Style) ---
interface HeroToastCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

export const HeroToastCard: React.FC<HeroToastCardProps> = ({
  title,
  subtitle,
  icon,
  className = '',
  delay = 0
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut"
      }}
      className={`absolute z-30 ${className}`}
    >
      {/* Clinical Toast Style */}
      <div className="flex items-center gap-3 p-3 pr-5 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-blue/10 shadow-[0_8px_32px_0_rgba(30,58,138,0.1)] w-max max-w-[85vw] sm:max-w-xs transition-all hover:bg-white">
        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 text-brand-blue shrink-0 backdrop-blur-sm border border-blue-100">
          {icon}
        </div>
        <div>
          <h4 className="text-brand-navy font-bold text-xs md:text-sm leading-none mb-1">{title}</h4>
          <p className="text-text-secondary text-[10px] md:text-xs font-medium opacity-90 leading-tight">{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Hero Text Reveal (Legacy - kept for backward compatibility if needed) ---
interface HeroTextRevealProps {
  text: string;
  className?: string;
}

export const HeroTextReveal: React.FC<HeroTextRevealProps> = ({ text, className = '' }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100, duration: 0.6 },
    },
  };

  return (
    <motion.h1 className={`flex flex-wrap ${className}`} variants={container} initial="hidden" animate="visible">
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.25em] mb-1 inline-block origin-bottom">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// --- Letter Stagger (Pop Effect) ---
interface LetterStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[]; // Words to apply the jump effect to
}

export const LetterStagger: React.FC<LetterStaggerProps> = ({ text, className = '', delay = 0, highlightWords = [] }) => {
  const words = text.split(" ");

  // Estimate time for text to finish (words * letters approx * stagger)
  // This ensures the pop happens AFTER the text is fully readable
  const estimatedRevealTime = text.length * 0.03 + delay + 0.5;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };

  const letterAnim = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.h1
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => {
        // Remove punctuation for matching logic but keep it for display
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const isHighlight = highlightWords.some(hw => hw.includes(cleanWord));

        // Variant for the word wrapper to handle the "Pop" effect
        const wrapperVariant = isHighlight ? {
          visible: {
            y: [0, -15, 0],
            scale: [1, 1.15, 1],
            color: ["#1e3a8a", "#2563eb", "#1e3a8a"], // Flash Brand Blue
            textShadow: ["0px 0px 0px rgba(37, 99, 235, 0)", "0px 0px 20px rgba(37, 99, 235, 0.4)", "0px 0px 0px rgba(37, 99, 235, 0)"],
            transition: {
              delay: estimatedRevealTime, // Wait for text to finish
              duration: 0.8,
              times: [0, 0.4, 1], // Timing of keyframes
              ease: "easeInOut"
            }
          }
        } : {};

        return (
          <motion.div
            key={i}
            className="whitespace-nowrap mr-[0.25em] inline-block origin-bottom"
            variants={wrapperVariant}
          >
            {word.split("").map((char, j) => (
              <motion.span key={j} variants={letterAnim} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.div>
        );
      })}
    </motion.h1>
  );
};

// --- Blur-to-Sharp Text Reveal ---
interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
  return (
    <motion.h2
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {text}
    </motion.h2>
  );
};

// --- Staggered Text Reveal ---
interface StaggerTextProps {
  text: string;
  className?: string;
}

export const StaggerText: React.FC<StaggerTextProps> = ({ text, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-1.5 mb-1">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Toast Notification ---
interface ToastProps {
  message: string;
  subMessage: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-white/90 rounded-xl blur-lg shadow-lg" />
              <GlassCard className="flex items-center p-4 border-l-4 border-l-green-600 bg-white/95 border border-border-subtle shadow-xl">
                <div className="bg-green-50 p-2 rounded-full mr-3 shrink-0">
                  <ShoppingBag size={20} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-brand-navy truncate">{message}</p>
                  <p className="text-xs text-text-secondary truncate">{subMessage}</p>
                </div>
                <button onClick={onClose} className="ml-2 text-text-muted hover:text-brand-navy shrink-0">
                  <X size={16} />
                </button>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const BackgroundHeading: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full max-w-[100vw] text-center overflow-hidden ${className}`}>
      {/* 
         MATHEMATICAL OPTIMIZATION:
         Using clamp() ensures the text never exceeds screen width (18rem was too big for mobile).
         4rem = minimum size
         15vw = responsive scaling
         18rem = maximum size
      */}
      <h1 className="text-[clamp(4rem,15vw,18rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-navy/[0.04] to-transparent leading-none tracking-tighter uppercase font-sans whitespace-nowrap">
        {text}
      </h1>
    </div>
  );
};