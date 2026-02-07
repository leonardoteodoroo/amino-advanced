import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Variant = 'molecular' | 'dna' | 'data';

interface BackgroundLayersProps {
  variant?: Variant;
  className?: string;
}

export const BackgroundLayers: React.FC<BackgroundLayersProps> = ({ variant = 'molecular', className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  // SVG Data URIs for distinct scientific patterns

  // A: Molecular - Hexagon network (Amino Acids structure)
  const molecularPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L55.98 15V45L30 60L4.02 45V15L30 0Z' fill='none' stroke='rgba(148, 163, 184, 0.07)' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='1.5' fill='rgba(148, 163, 184, 0.15)'/%3E%3C/svg%3E")`;

  // B: DNA - Double Helix stylized abstractly
  const dnaPattern = `url("data:image/svg+xml,%3Csvg width='100' height='60' viewBox='0 0 100 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q25 0 50 30 T100 30' fill='none' stroke='rgba(148, 163, 184, 0.05)' stroke-width='1'/%3E%3Cpath d='M0 30 Q25 60 50 30 T100 30' fill='none' stroke='rgba(148, 163, 184, 0.05)' stroke-width='1'/%3E%3Cline x1='25' y1='15' x2='25' y2='45' stroke='rgba(148, 163, 184, 0.03)' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cline x1='75' y1='15' x2='75' y2='45' stroke='rgba(148, 163, 184, 0.03)' stroke-width='1' stroke-dasharray='2 2'/%3E%3C/svg%3E")`;

  // C: Data - Technical Grid/Graph lines
  const dataPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='40' height='40' fill='none'/%3E%3Cline x1='0' y1='20' x2='40' y2='20' stroke='rgba(148, 163, 184, 0.04)' stroke-width='0.5'/%3E%3Cline x1='20' y1='0' x2='20' y2='40' stroke='rgba(148, 163, 184, 0.04)' stroke-width='0.5'/%3E%3Crect x='19' y='19' width='2' height='2' fill='rgba(148, 163, 184, 0.1)'/%3E%3C/svg%3E")`;

  const patterns = {
    molecular: molecularPattern,
    dna: dnaPattern,
    data: dataPattern
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Layer 1: Gradient Base (Clinical White) */}
      <div className="absolute inset-0 bg-surface-page bg-[radial-gradient(ellipse_at_top,_rgba(239,246,255,0.8)_0%,_rgba(248,250,252,1)_70%)]" />

      {/* Layer 2: Blueprint Grid (Pure CSS) - Light Gray Lines */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Layer 3: Scientific Pattern (SVG Data URI) - Darker Stroke for Visibility */}
      <motion.div
        className="absolute inset-0 opacity-100"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.5 }}
        style={{
          backgroundImage: patterns[variant].replace(/stroke='rgba\(148, 163, 184, 0.0[0-9]\)'/g, "stroke='rgba(30, 58, 138, 0.05)'"), // Darker stroke injection
          backgroundSize: variant === 'molecular' ? '60px 60px' : variant === 'dna' ? '100px 60px' : '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)'
        }}
      />

      {/* Ambient Glows (Subtle Blue) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.05)_0%,_transparent_70%)] pointer-events-none" />
    </div>
  );
};
