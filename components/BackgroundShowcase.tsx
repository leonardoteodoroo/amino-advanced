import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, FlaskConical, Dna, Microscope, Zap, Database, Layers, ScanLine, Wind, Box, MoveUp } from 'lucide-react';
import { GlassCard } from './UI';

// --- Shared Wrapper for Showcase Blocks ---
const ShowcaseBlock: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({ title, subtitle, children }) => {
  return (
    <div className="relative w-full h-[400px] border border-white/10 rounded-3xl overflow-hidden bg-[#020617] group">
      {/* The Background Layer being tested */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {children}
      </div>

      {/* Foreground Content Simulation (to test contrast) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pointer-events-none">
        <GlassCard className="p-6 max-w-sm text-center backdrop-blur-md bg-black/40 border-white/20">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-300">{subtitle}</p>
        </GlassCard>
      </div>

      {/* Label Tag */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] font-mono text-gray-400 border border-white/5 uppercase tracking-wider">
        Background Test
      </div>
    </div>
  );
};

// --- 1. Molecular / Chemical Bonds ---
const MolecularBg = () => (
  <div className="absolute inset-0 opacity-60">
    <div 
      className="absolute inset-0" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L55.98 15V45L30 60L4.02 45V15L30 0Z' fill='none' stroke='rgba(168, 85, 247, 0.5)' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='3' fill='rgba(168, 85, 247, 0.6)'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-50" />
  </div>
);

// --- 2. DNA Helix (Abstract) ---
const DnaBg = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-40 overflow-hidden">
    <motion.svg 
      viewBox="0 0 800 200" 
      className="w-[150%] h-auto text-blue-400"
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    >
      <path d="M0 100 Q 100 0 200 100 T 400 100 T 600 100 T 800 100" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.8" />
      <path d="M0 100 Q 100 200 200 100 T 400 100 T 600 100 T 800 100" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.8" />
      
      {/* Connecting lines */}
      {[...Array(20)].map((_, i) => (
         <line key={i} x1={40 * i} y1="100" x2={40 * i} y2={i % 2 === 0 ? 140 : 60} stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      ))}
    </motion.svg>
    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] opacity-60" />
  </div>
);

// --- 3. Data / Graph Lines ---
const DataBg = () => (
  <div className="absolute inset-0 opacity-50">
    {/* Grid */}
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
    {/* Animated Line */}
    <svg className="absolute bottom-0 left-0 w-full h-1/2" preserveAspectRatio="none">
        <motion.path 
            d="M0 150 C 100 140, 200 100, 300 120 S 500 50, 600 80 S 800 20, 1000 40"
            fill="none"
            stroke="#10b981" // Green
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
        />
        <path d="M0 150 C 100 140, 200 100, 300 120 S 500 50, 600 80 S 800 20, 1000 40 L 1000 200 L 0 200 Z" fill="url(#grad1)" opacity="0.4" />
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#10b981", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#020617", stopOpacity:0}} />
            </linearGradient>
        </defs>
    </svg>
  </div>
);

// --- 4. Micro-Particles / Absorption ---
const ParticlesBg = () => (
  <div className="absolute inset-0 overflow-hidden bg-purple-900/10">
     {[...Array(15)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500 blur-md opacity-[0.4]"
            style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
            }}
            animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
     ))}
     {/* Grain Overlay */}
     <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
  </div>
);

// --- 5. Blueprint / Lab Grid ---
const BlueprintBg = () => (
  <div className="absolute inset-0 bg-[#0f172a]">
    <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
            backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
        }}
    />
    <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
            backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
        }}
    />
    {/* Tech Circles */}
    <div className="absolute top-10 right-10 w-32 h-32 border-2 border-sky-500/40 rounded-full flex items-center justify-center">
         <div className="w-24 h-24 border-2 border-sky-500/30 rounded-full border-dashed animate-spin-slow" />
    </div>
  </div>
);

// --- 6. Liquid Swirl (Premium) ---
const LiquidBg = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-50"
        style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #1e1b4b 0deg, #4c1d95 120deg, #db2777 240deg, #1e1b4b 360deg)',
            filter: 'blur(60px)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-0 bg-slate-950/40" /> {/* Darken layer */}
  </div>
);

// --- 7. Muscle Fiber (Abstract) ---
const MuscleBg = () => (
  <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg className="w-full h-full" preserveAspectRatio="none">
          {[...Array(8)].map((_, i) => (
             <motion.path 
                key={i}
                d={`M-100 ${50 + i * 40} Q 400 ${i % 2 === 0 ? 0 : 100} 1200 ${50 + i * 40}`}
                fill="none"
                stroke="#ef4444" // Red
                strokeWidth="3"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.1 }}
             />
          ))}
      </svg>
      {/* Texture mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]" />
  </div>
);

// --- 8. Clinical Badges / Motifs ---
const BadgeBg = () => (
    <div className="absolute inset-0 opacity-[0.15]">
        <div className="grid grid-cols-6 gap-8 p-8 transform -rotate-12 scale-110">
            {[...Array(24)].map((_, i) => (
                <div key={i} className="flex justify-center text-gray-300">
                    {i % 4 === 0 && <ShieldCheck size={48} strokeWidth={1.5} />}
                    {i % 4 === 1 && <Activity size={48} strokeWidth={1.5} />}
                    {i % 4 === 2 && <Microscope size={48} strokeWidth={1.5} />}
                    {i % 4 === 3 && <FlaskConical size={48} strokeWidth={1.5} />}
                </div>
            ))}
        </div>
    </div>
);

// --- NEW 9. Vitality Nebula (Organic/Ethereal) ---
const VitalityBg = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
        {/* Breathing Orbs */}
        <motion.div 
            className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-purple-600 mix-blend-screen opacity-20 filter blur-[80px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
            className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-600 mix-blend-screen opacity-20 filter blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
            className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-pink-500 mix-blend-screen opacity-10 filter blur-[60px]"
            animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    </div>
);

// --- NEW 10. Isometric Plane (Structural/3D) ---
const IsometricBg = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#020617] flex items-center justify-center perspective-[1000px]">
        {/* Tilted Plane */}
        <div 
            className="absolute w-[200%] h-[200%] bg-[#020617]"
            style={{ 
                transform: 'rotateX(60deg) rotateZ(-20deg) translateY(-20%)',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Grid Lines Moving */}
            <motion.div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 2px, transparent 2px)
                    `,
                    backgroundSize: '80px 80px',
                    opacity: 0.3
                }}
                animate={{ backgroundPosition: ['0px 0px', '0px 80px'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]" />
        </div>
    </div>
);

// --- NEW 11. Absorption Stream (Flow/Upward) ---
const StreamBg = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
        <div className="flex justify-between items-end h-full w-full px-4 opacity-40">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-[1px] bg-gradient-to-t from-transparent via-green-400 to-transparent"
                    style={{ height: '30%' }}
                    animate={{ 
                        y: [400, -500],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ 
                        duration: Math.random() * 2 + 1.5, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 2 
                    }}
                />
            ))}
        </div>
        {/* Horizontal scanline effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
    </div>
);

// --- NEW 12. Bio-Scan (Medical/Tech) ---
const ScanBg = () => (
    <div className="absolute inset-0 overflow-hidden bg-[#020617]">
        {/* Static Grid */}
        <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}
        />
        
        {/* Scanner Bar */}
        <motion.div 
            className="absolute left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
             <div className="absolute bottom-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </motion.div>

        {/* Hotspots appearing randomly */}
        {[...Array(5)].map((_, i) => (
             <motion.div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"
                style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
             />
        ))}
    </div>
);


// --- Main Evaluation Component ---
export const BackgroundEvaluationSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-[#010205] border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 font-serif">
                Background Concepts Evaluation
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
                Evaluation Mode: Opacity Increased (30-60%) for visibility check.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <ShowcaseBlock title="Molecular Pattern" subtitle="Hexagons / Chemical Bonds">
                <MolecularBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="DNA Helix" subtitle="Biology / Research / Life">
                <DnaBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Data Grid" subtitle="Metrics / Utilization Rate">
                <DataBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Micro Particles" subtitle="Absorption / Action">
                <ParticlesBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Blueprint Grid" subtitle="Engineering / Precision">
                <BlueprintBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Liquid Swirl" subtitle="Premium / Blend / Gradient">
                <LiquidBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Muscle Fiber" subtitle="Strength / Tissue Repair">
                <MuscleBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Clinical Motifs" subtitle="Trust / GMP / Certified">
                <BadgeBg />
            </ShowcaseBlock>
            
            {/* --- NEW ADVANCED EFFECTS --- */}
            
            <ShowcaseBlock title="Vitality Nebula" subtitle="Organic / Recovery / Energy">
                <VitalityBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Isometric Plane" subtitle="Structure / Foundation / 3D">
                <IsometricBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Absorption Stream" subtitle="Speed / Flow / Efficiency">
                <StreamBg />
            </ShowcaseBlock>

            <ShowcaseBlock title="Bio-Scan" subtitle="Medical / Diagnosis / Tech">
                <ScanBg />
            </ShowcaseBlock>

        </div>
      </div>
    </section>
  );
};