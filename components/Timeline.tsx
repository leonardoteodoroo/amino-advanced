import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BlurText, GlassCard } from './UI';
import { Brain, Zap, Shield, CheckCircle2, Barcode, Activity, TrendingUp } from 'lucide-react';
import { TimelineItem } from '../types';

const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -15% 0px"
};

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Break The Anabolic Lock",
    description: "After 50, muscles develop 'Anabolic Resistance'—a biological lock that shuts out ordinary protein. Advanced Amino is the specific 'key' that forces the muscle to accept nutrition again.",
    icon: <Brain className="text-fg-brand opacity-90" size={24} />,
  },
  {
    id: 2,
    title: "99% Master Utilization",
    description: "While Whey protein leaves 83% metabolic waste, this precise ratio provides 99% Net Nitrogen Utilization (NNU). Practically every gram goes straight to tissue repair, not 'garbage'.",
    icon: <Barcode className="text-fg-brand opacity-80" size={24} />,
  },
  {
    id: 3,
    title: "Protect Your Kidneys",
    description: "Unlike high-protein diets that stress your filtration system with ammonia waste, Advanced Amino creates almost zero metabolic byproduct. It's the safest way to rebuild for seniors.",
    icon: <Shield className="text-fg-brand opacity-70" size={24} />,
  },
  {
    id: 4,
    title: "Bypass Digestion",
    description: "Ordinary protein takes hours to break down. These amino acids reach your bloodstream in minutes, providing an immediate 'Anabolic Strike' to starving muscle fibers.",
    icon: <Zap className="text-fg-brand opacity-90" size={24} />,
  }
];

export const ScienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Adjusted offsets: 
  // "start 70%" -> Start filling when the top of the container is at 70% of viewport height (near bottom)
  // "end 50%" -> Finish filling when the bottom of the container is at 50% of viewport height (center)
  // This ensures the line is fully drawn when the user finishes reading the section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"]
  });

  // Add spring physics for a fluid "filling" sensation that handles rapid scrolling gracefully
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16 px-2 relative z-10">
        <BlurText text="The Math of Strength" className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mt-2 mb-6" />
      </div>

      <div className="relative">
        {/* Line Container: 
            Adjusted bottom to 'bottom-12' (approx 3rem/48px) to better align with the last item center.
            The items have padding, so the line needs to span most of the height. 
        */}
        <div className="absolute left-6 md:left-1/2 top-12 bottom-12 -translate-x-1/2 w-1 md:w-0.5">
          {/* Background Line */}
          <div className="absolute inset-0 bg-slate-200 rounded-full" />

          {/* Progress Line */}
          <motion.div
            style={{ height }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-blue via-blue-400 to-blue-300 rounded-full z-10 origin-top shadow-sm"
          />
        </div>

        <div className="space-y-12 md:space-y-24">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineNode key={item.id} item={item} isEven={isEven} index={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TimelineNodeProps {
  item: TimelineItem;
  isEven: boolean;
  index: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ item, isEven, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Spacer for desktop layout to center the line */}
      <div className="hidden md:block md:w-1/2" />

      {/* Icon Node */}
      {/* 
          z-20 ensures icon sits ON TOP of the line. 
          Added bg-white to hide the line running "through" the icon visually if transparent.
      */}
      <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-brand-blue shadow-lg shadow-blue-900/10 group">
        <div className="scale-75 group-hover:scale-90 transition-transform duration-300">
          {item.icon}
        </div>
      </div>

      {/* Content Card */}
      <div className={`ml-16 md:ml-0 md:w-1/2 w-[calc(100%-4rem)] min-w-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
        <GlassCard
          className={`p-6 md:p-8 bg-surface-card border border-border-subtle shadow-md ${isEven ? 'border-r-2 border-r-brand-blue/50' : 'border-l-2 border-l-brand-blue/50'}`}
          hoverEffect
        >
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-bold text-brand-navy break-words">{item.title}</h3>
          </div>
          <p className="text-text-secondary leading-relaxed text-sm md:text-base break-words">
            {item.description}
          </p>
        </GlassCard>
      </div>
    </motion.div>
  );
};