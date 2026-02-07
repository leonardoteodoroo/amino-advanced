diff --git a/components/BackgroundLayers.tsx b/components/BackgroundLayers.tsx
index f14c2c735fe7af4b0ea02cefa75e38b4a054c9be..3810608517c6e4a8e987b8b652ee4944f193801b 100644
--- a/components/BackgroundLayers.tsx
+++ b/components/BackgroundLayers.tsx
@@ -1,65 +1,66 @@
 import React from 'react';
-import { motion } from 'framer-motion';
+import { motion, useReducedMotion } from 'framer-motion';
 
 type Variant = 'molecular' | 'dna' | 'data';
 
 interface BackgroundLayersProps {
   variant?: Variant;
   className?: string;
 }
 
 export const BackgroundLayers: React.FC<BackgroundLayersProps> = ({ variant = 'molecular', className = '' }) => {
+  const shouldReduceMotion = useReducedMotion();
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
-        initial={{ opacity: 0 }}
+        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
-        transition={{ duration: 1.5 }}
+        transition={{ duration: shouldReduceMotion ? 0 : 1.5 }}
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
diff --git a/components/Carousel3D.tsx b/components/Carousel3D.tsx
index 2b7d6f916e9e27240c1d7bb6c79a87162b81332e..e32e497c81d37a22aa1cba963b26b1863efdc5fa 100644
--- a/components/Carousel3D.tsx
+++ b/components/Carousel3D.tsx
@@ -1,27 +1,27 @@
 import React, { useState, useEffect, useRef } from 'react';
-import { motion, useMotionValue, useTransform, PanInfo, animate, MotionValue } from 'framer-motion';
+import { motion, useMotionValue, useTransform, PanInfo, animate, MotionValue, useReducedMotion } from 'framer-motion';
 import { ChevronLeft, ChevronRight, Star, CheckCircle2, Quote, MoveRight, MapPin } from 'lucide-react';
 import { Review } from '../types';
 
 const reviews: Review[] = [
     {
         id: 1,
         name: "Jacqui",
         age: 67,
         quote: "Muscles are finally waking up",
         detail: "It feels like my muscles are finally waking up. My workouts improved and recovery became much faster after just two months.",
         rating: 5,
         image: "/images/reviews/jacqui.webp"
     },
     {
         id: 2,
         name: "Carolyn H.",
         age: 72,
         quote: "I feel more stable",
         detail: "I feel more stable on long walks. After three months, my joints felt less sore and my stability increased significantly.",
         rating: 5,
         image: "/images/reviews/carolyn.webp"
     },
     {
         id: 3,
         name: "Dr. Simmons",
@@ -144,50 +144,51 @@ const TestimonialCard: React.FC<{ review: Review }> = ({ review }) => {
                 <h3 className="text-lg font-bold text-fg-brand mb-2 leading-tight tracking-tight line-clamp-2">
                     "{review.quote}"
                 </h3>
                 <p className="text-fg-primary text-sm leading-relaxed font-medium line-clamp-4">
                     {review.detail}
                 </p>
             </div>
 
             {/* Footer */}
             <div className="mt-auto pt-4 border-t border-border-subtle flex justify-between items-center relative z-10">
                 <div className="flex items-center gap-1.5 opacity-70">
                     <MapPin size={12} className="text-fg-muted" />
                     <span className="text-[10px] font-semibold text-fg-muted">United States</span>
                 </div>
                 <span className="text-[10px] text-fg-muted font-medium">Recently posted</span>
             </div>
         </div>
     );
 };
 
 // --- Dimensions & Config ---
 const DRAG_BUFFER = 10;
 const VELOCITY_THRESHOLD = 50;
 
 export const Carousel3D: React.FC = () => {
+    const shouldReduceMotion = useReducedMotion();
     // Responsive Gap Calculation
     const [gap, setGap] = useState(290);
 
     useEffect(() => {
         const handleResize = () => {
             // On very small screens, use smaller gap to prevent cutoff
             setGap(window.innerWidth < 768 ? 250 : 290);
         };
         handleResize(); // Init
         window.addEventListener('resize', handleResize);
         return () => window.removeEventListener('resize', handleResize);
     }, []);
 
     const [activeIndex, setActiveIndex] = useState(1);
     const x = useMotionValue(-gap); // Start at index 1
     const containerRef = useRef<HTMLDivElement>(null);
 
     const prevGap = useRef(gap);
 
     // React to gap changes to update position immediately without breaking animations
     useEffect(() => {
         if (prevGap.current !== gap) {
             x.stop(); // Stop any ongoing animation before snapping
             x.set(-activeIndex * gap);
             prevGap.current = gap;
@@ -288,95 +289,101 @@ export const Carousel3D: React.FC = () => {
                         <motion.div
                             className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-pan-y"
                             onPan={handlePan}
                             onPanEnd={handleDragEnd}
                             whileTap={{ cursor: "grabbing" }}
                         />
 
                         {/* The Cards */}
                         {reviews.map((review, i) => (
                             <CarouselCard
                                 key={review.id}
                                 index={i}
                                 review={review}
                                 x={x}
                                 gap={gap}
                             />
                         ))}
                     </div>
 
                     {/* Mobile Controls & Hint */}
                     <div className="flex md:hidden flex-col items-center mt-6 gap-4 relative z-50 pointer-events-none">
                         <div className="flex gap-8 pointer-events-auto">
                             <button
                                 onClick={prevSlide}
                                 aria-label="Previous testimonial"
-                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-md transition-all hover:bg-white shadow-md active:scale-95"
+                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-sm sm:backdrop-blur-md transition-all hover:bg-white shadow-sm sm:shadow-md active:scale-95"
                             >
                                 <ChevronLeft className="text-brand-navy" size={20} />
                             </button>
                             <button
                                 onClick={nextSlide}
                                 aria-label="Next testimonial"
-                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-md transition-all hover:bg-white shadow-md"
+                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-sm sm:backdrop-blur-md transition-all hover:bg-white shadow-sm sm:shadow-md"
                             >
                                 <ChevronRight className="text-brand-navy" size={20} />
                             </button>
                         </div>
 
                         <div className="flex items-center gap-2 opacity-80">
                             <span className="text-brand-blue font-serif italic text-xs tracking-wide">Swipe to read</span>
-                            <MoveRight className="text-brand-blue animate-pulse" size={20} />
+                            <MoveRight className="text-brand-blue animate-pulse motion-reduce:animate-none" size={20} />
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     );
 };
 
 interface CarouselCardProps {
     index: number;
     review: Review;
     x: MotionValue<number>;
     gap: number;
 }
 
 const CarouselCard: React.FC<CarouselCardProps> = ({ index, review, x, gap }) => {
+    const shouldReduceMotion = useReducedMotion();
+    const isCompact = gap < 290;
     // Explicit typing for the transform callback to avoid TS errors
     const position = useTransform(x, (currentX: number) => currentX + index * gap);
 
     // Optimized rotation and scale
-    const rotateY = useTransform(position, [-gap, 0, gap], [25, 0, -25]);
+    const rotateY = useTransform(position, [-gap, 0, gap], shouldReduceMotion ? [0, 0, 0] : [25, 0, -25]);
     // More aggressive scaling on mobile to ensure neighbor cards are visible but non-intrusive
-    const scale = useTransform(position, [-gap, 0, gap], [0.85, 1, 0.85]);
+    const scale = useTransform(position, [-gap, 0, gap], shouldReduceMotion ? [0.95, 1, 0.95] : [0.85, 1, 0.85]);
     const opacity = useTransform(position, [-gap * 1.5, 0, gap * 1.5], [0.4, 1, 0.4]);
-    const blur = useTransform(position, [-gap, 0, gap], [2, 0, 2]);
+    const blur = useTransform(
+        position,
+        [-gap, 0, gap],
+        shouldReduceMotion ? [0, 0, 0] : isCompact ? [0.5, 0, 0.5] : [2, 0, 2]
+    );
     const z = useTransform(position, (pos) => -Math.abs(pos) * 1.2);
     const translateX = useTransform(position, (pos) => pos * 0.6);
 
     // Performance Optimization: Hide cards that are far off-screen
     const display = useTransform(position, (pos: number) => Math.abs(pos) >= gap * 2.2 ? "none" : "block");
 
     return (
         <motion.div
             className="absolute w-[280px] h-[360px] md:h-[380px] max-w-[85vw] rounded-[24px] pointer-events-none will-change-transform"
             style={{
                 x: translateX,
                 rotateY,
                 scale,
                 opacity,
                 z,
                 display,
                 filter: `blur(${blur})`,
                 zIndex: useTransform(position, (pos) => 100 - Math.round(Math.abs(pos))),
             }}
         >
             {/* Inner Card Wrapper */}
-            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-2xl bg-white border border-border-subtle relative transform-gpu">
+            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-xl sm:shadow-2xl bg-white border border-border-subtle relative transform-gpu">
                 {/* Subtle Gloss */}
                 <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 via-transparent to-black/5 pointer-events-none z-50 rounded-[24px]" />
                 <TestimonialCard review={review} />
             </div>
         </motion.div>
     );
-};
\ No newline at end of file
+};
diff --git a/components/ComparisonChart.tsx b/components/ComparisonChart.tsx
index a56021105c32aeb87588afa2399f5fe26986aa50..e6e0586b0c9125d3288106255993dc4aaffa3b6a 100644
--- a/components/ComparisonChart.tsx
+++ b/components/ComparisonChart.tsx
@@ -1,29 +1,30 @@
 import React from 'react';
-import { motion } from 'framer-motion';
+import { motion, useReducedMotion } from 'framer-motion';
 
 export const ComparisonChart: React.FC = () => {
+  const shouldReduceMotion = useReducedMotion();
   const data = [
     { label: 'Whey/Soy', subLabel: '& Nuts', value: 17, color: 'bg-slate-300', info: '83% Nitrogen Waste (Waste products like Ammonia strain the kidneys).' },
     { label: 'Meat/Fish', subLabel: '& Poultry', value: 32, color: 'bg-slate-400', info: '68% Waste. Requires complex digestion before absorption.' },
     { label: 'Whole Eggs', subLabel: '', value: 48, color: 'bg-slate-500', info: 'Best whole food source, but still releases 52% as waste.' },
     { label: 'Advanced Amino', subLabel: 'Formula', value: 99, color: 'bg-[#f97316]', info: '99% Perfect Utilization. Virtually ZERO metabolic waste.' },
   ];
 
   return (
     <div className="w-full h-full flex flex-col justify-center">
       {/* Title Section: Added generous bottom margin (mb-10) to prevent 99% label from overlapping text */}
       <div className="text-center mb-10 relative z-20">
         <h4 className="text-sm md:text-base text-brand-navy font-bold uppercase tracking-wider">
           Protein Utilization Rates
         </h4>
         <p className="text-[10px] text-text-secondary mt-1">Net Nitrogen Utilization (NNU)</p>
       </div>
 
       {/* Chart Container: Restored original height, kept safe padding-top */}
       <div className="w-full h-[320px] md:h-[360px] flex items-end justify-between gap-2 md:gap-6 relative px-2 md:px-6 pb-2 pt-12">
 
         {/* Y-Axis Grid Lines */}
         <div className="absolute inset-x-0 top-12 bottom-8 flex flex-col justify-between pointer-events-none opacity-[0.1] z-0 px-4">
           {[100, 75, 50, 25, 0].map((tick) => (
             <div key={tick} className="w-full h-px bg-brand-navy border-t border-dashed border-brand-navy/50 relative">
               <span className="absolute -left-6 -top-2 text-[9px] text-text-muted font-mono">{tick}%</span>
@@ -54,56 +55,56 @@ export const ComparisonChart: React.FC = () => {
               transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
               className={`w-full max-w-[40px] md:max-w-[60px] rounded-t-lg relative flex-shrink-0 origin-bottom overflow-visible ${index === 3 ? 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-xl shadow-orange-500/20' : 'bg-gradient-to-t from-slate-400 to-slate-300 opacity-60'}`}
             >
               {/* Tooltip */}
               {/* Dynamic Tooltip Alignment */}
               <div className={`absolute -top-2 mb-3 w-40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] pointer-events-none 
                     ${index === 0 ? 'left-0 translate-x-0 origin-bottom-left' :
                   index === 3 ? 'right-0 translate-x-0 origin-bottom-right' :
                     'left-1/2 -translate-x-1/2'}`}>
                 <div className="bg-brand-navy p-2 rounded-lg text-[10px] text-white leading-tight shadow-xl border border-white/10 text-center relative">
                   {item.info}
                   {/* Arrow adjustment based on position */}
                   <div className={`absolute bottom-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-navy
                         ${index === 0 ? 'left-4' :
                       index === 3 ? 'right-4' :
                         'left-1/2 -translate-x-1/2 translate-y-full'}`}></div>
                 </div>
               </div>
 
               {/* Glossy Effect on Bar */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-50 rounded-t-lg overflow-hidden" />
 
               {/* Pulse effect for 99% bar */}
               {index === 3 && (
                 <motion.div
-                  animate={{ opacity: [0.2, 0.5, 0.2] }}
-                  transition={{ duration: 2, repeat: Infinity }}
+                  animate={shouldReduceMotion ? { opacity: 0.35 } : { opacity: [0.2, 0.5, 0.2] }}
+                  transition={{ duration: shouldReduceMotion ? 0 : 2, repeat: shouldReduceMotion ? 0 : Infinity }}
                   className="absolute inset-x-0 -top-1 h-3 bg-orange-400 blur-md rounded-full pointer-events-none"
                 />
               )}
             </motion.div>
 
             {/* X-Axis Label */}
             <div className="mt-3 min-h-[40px] flex flex-col items-center justify-start text-center">
               <span className={`text-[10px] md:text-xs font-bold leading-tight block ${index === 3 ? 'text-brand-navy' : 'text-text-secondary'}`}>
                 {item.label}
               </span>
               {item.subLabel && (
                 <span className="text-[9px] md:text-[10px] text-text-muted leading-tight block">
                   {item.subLabel}
                 </span>
               )}
             </div>
           </div>
         ))}
       </div>
 
       <div className="mt-8 md:mt-12 p-3 bg-blue-50/50 rounded-lg border border-blue-100 backdrop-blur-sm text-center mx-auto max-w-sm">
         <p className="text-[10px] md:text-xs text-text-secondary leading-relaxed">
           <span className="text-orange-600 font-bold block mb-1">NNU: The Clinical Gold Standard</span>
           Virtually zero metabolic waste (Ammonia) means zero stress on kidneys.
         </p>
       </div>
     </div>
   );
-};
\ No newline at end of file
+};
diff --git a/components/ReviewTicker.tsx b/components/ReviewTicker.tsx
index b46289ac784a033f781ccaf022dbdaa5e322aa63..20fe28f6d1fd6fe899be6ad5b728925d0ea43cb8 100644
--- a/components/ReviewTicker.tsx
+++ b/components/ReviewTicker.tsx
@@ -1,30 +1,31 @@
 import React, { useEffect, useRef, useState } from 'react';
 import {
     motion,
     useMotionValue,
-    useAnimationFrame
+    useAnimationFrame,
+    useReducedMotion
 } from 'framer-motion';
 import { Star, ShieldCheck } from 'lucide-react';
 
 const reviews = [
     {
         name: "Jacqui",
         age: 67,
         text: "It feels like my muscles are finally waking up. My workouts improved and recovery became much faster after just two months.",
         highlight: "Muscles waking up",
         image: "/images/reviews/jacqui.webp"
     },
     {
         name: "Carolyn H.",
         age: 72,
         text: "I feel more stable on long walks. After three months, my joints felt less sore and my stability increased significantly.",
         highlight: "More stable",
         image: "/images/reviews/carolyn.webp"
     },
     {
         name: "Dr. Simmons",
         age: 55,
         text: "My doctor noticed the difference. Many users report their doctors are surprised by the improvement in muscle tone and general vitality.",
         highlight: "Doctor impressed",
         image: "/images/reviews/dr-simmons.webp"
     },
@@ -40,73 +41,75 @@ const reviews = [
         age: 71,
         text: "The 'heavy leg' feeling is gone. I walk my dog every morning without needing to stop for breaks anymore.",
         highlight: "No more heavy legs",
         image: "/images/reviews/david.webp"
     },
     {
         name: "Margaret T.",
         age: 64,
         text: "I was buying expensive whey protein for years with zero results. This formula changed my leg strength in just weeks.",
         highlight: "Leg strength returned",
         image: "/images/reviews/margaret.webp"
     },
     {
         name: "Sarah L.",
         age: 58,
         text: "I thought my weakness was just 'getting old'. Turns out my muscles were just hungry. Amazing difference.",
         highlight: "Not just 'old age'",
         image: "/images/reviews/sarah.webp"
     }
 ];
 
 // Triplicate the array to ensure smooth infinite looping even on large screens
 const tickerReviews = [...reviews, ...reviews, ...reviews];
 
 export const ReviewTicker: React.FC = () => {
+    const shouldReduceMotion = useReducedMotion();
     const containerRef = useRef<HTMLDivElement>(null);
     const [contentWidth, setContentWidth] = useState(0);
     const [isHovered, setIsHovered] = useState(false);
 
     // Motion value for the x position
     const x = useMotionValue(0);
 
     // Speed of auto-scroll (pixels per frame) - Increased for better energy
-    const baseVelocity = -1.5;
+    const baseVelocity = shouldReduceMotion ? 0 : -1.5;
 
     useEffect(() => {
         if (containerRef.current) {
             // Measure one set of reviews (approx 1/3 of total rendered width)
             // We divide by 3 because we tripled the data
             const totalWidth = containerRef.current.scrollWidth;
             if (totalWidth > 0) {
                 setContentWidth(totalWidth / 3);
             }
         }
     }, []);
 
     // The animation loop
     useAnimationFrame((t, delta) => {
+        if (shouldReduceMotion) return;
         if (!contentWidth) return;
 
         let moveBy = baseVelocity * (delta / 16); // Normalize based on frame rate
 
         // If user is interacting, stop auto-movement
         if (isHovered) {
             moveBy = 0;
         }
 
         let currentX = x.get();
         let newX = currentX + moveBy;
 
         // Loop logic: If we've scrolled past the first set, reset to 0 (visually identical point)
         // If we dragged too far right (positive), snap back to the end of the previous set
         if (newX <= -contentWidth) {
             newX += contentWidth;
         } else if (newX > 0) {
             newX -= contentWidth;
         }
 
         x.set(newX);
     });
 
     return (
         <div className="w-full py-10 overflow-hidden bg-surface-section border-y border-border-subtle relative z-20">
@@ -167,38 +170,42 @@ export const ReviewTicker: React.FC = () => {
 
                             <p className="text-text-secondary text-sm leading-relaxed mb-4 min-h-[60px] pointer-events-none">"{review.text}"</p>
 
                             <div className="flex items-center gap-3 pt-3 border-t border-border-subtle pointer-events-none">
                                 <img
                                     src={review.image}
                                     alt={review.name}
                                     className="w-10 h-10 rounded-full object-cover border border-border-subtle bg-surface-section"
                                     width="40"
                                     height="40"
                                     loading="lazy"
                                 />
                                 <div>
                                     <p className="text-brand-navy font-bold text-xs">{review.name}</p>
                                     <p className="text-xs text-text-muted">{review.age} years old • Verified Buyer</p>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </motion.div>
 
                 {/* Drag Hint for Mobile */}
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40 md:hidden pointer-events-none">
                     <span className="text-[10px] uppercase tracking-tighter font-bold text-text-primary">Swipe to browse</span>
                     <div className="flex gap-1">
-                        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1 rounded-full bg-brand-navy" />
+                        <motion.div
+                            animate={shouldReduceMotion ? { x: 0 } : { x: [0, 5, 0] }}
+                            transition={{ repeat: shouldReduceMotion ? 0 : Infinity, duration: shouldReduceMotion ? 0 : 1.5 }}
+                            className="w-1 h-1 rounded-full bg-brand-navy"
+                        />
                         <div className="w-1 h-1 rounded-full bg-brand-navy opacity-50" />
                         <div className="w-1 h-1 rounded-full bg-brand-navy opacity-25" />
                     </div>
                 </div>
 
                 {/* Fade Edges - Light Theme */}
                 <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-surface-section to-transparent z-10 pointer-events-none" />
                 <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-surface-section to-transparent z-10 pointer-events-none" />
             </div>
         </div>
     );
-};
\ No newline at end of file
+};
diff --git a/components/UI.tsx b/components/UI.tsx
index 6630f1db4af35c182fa1193b92c11fb62ca04351..1e552d8aa9d43cbf30089f5a740ca04ce019b261 100644
--- a/components/UI.tsx
+++ b/components/UI.tsx
@@ -50,51 +50,51 @@ interface HeroToastCardProps {
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
-      <div className="flex items-center gap-3 p-3 pr-5 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-blue/10 shadow-[0_8px_32px_0_rgba(30,58,138,0.1)] w-max max-w-[85vw] sm:max-w-xs transition-all hover:bg-white">
+      <div className="flex items-center gap-3 p-3 pr-5 rounded-2xl bg-white/90 backdrop-blur-sm sm:backdrop-blur-md border border-brand-blue/10 shadow-[0_4px_16px_0_rgba(30,58,138,0.08)] sm:shadow-[0_8px_32px_0_rgba(30,58,138,0.1)] w-max max-w-[85vw] sm:max-w-xs transition-all hover:bg-white">
         <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 text-brand-blue shrink-0 backdrop-blur-sm border border-blue-100">
           {icon}
         </div>
         <div>
           <h4 className="text-brand-navy font-bold text-xs md:text-sm leading-none mb-1">{title}</h4>
           <p className="text-text-secondary text-xs font-medium opacity-90 leading-tight">{subtitle}</p>
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
@@ -317,26 +317,26 @@ export const Toast: React.FC<ToastProps> = ({ message, subMessage, isVisible, on
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
       <div aria-hidden="true" className="text-[clamp(4rem,15vw,18rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-brand-navy/[0.04] to-transparent leading-none tracking-tighter uppercase font-sans whitespace-nowrap">
         {text}
       </div>
     </div>
   );
-};
\ No newline at end of file
+};
diff --git a/components/sections/Hero.tsx b/components/sections/Hero.tsx
index 01584540c8c6b2db5a7238d66e017fd69dd55a08..90df3c01f0ae969db1bc714bd7b3be3943e50439 100644
--- a/components/sections/Hero.tsx
+++ b/components/sections/Hero.tsx
@@ -1,47 +1,49 @@
 import React from 'react';
 import { AlertTriangle, ArrowRight, ShieldCheck, Activity, TrendingUp, Battery } from 'lucide-react';
 import { LetterStagger, HeroToastCard } from '../UI';
 import { BackgroundLayers } from '../BackgroundLayers';
 
 const HERO_BG = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=2000&auto=format&fit=crop";
 const HERO_BG_MOBILE = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=800&auto=format&fit=crop";
 const HERO_BG_TABLET = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=1200&auto=format&fit=crop";
 
 const VIEWPORT_CONFIG = {
     once: true,
     amount: 0.3,
     margin: "0px 0px -15% 0px"
 };
 
-import { motion } from 'framer-motion';
+import { motion, useReducedMotion } from 'framer-motion';
 
 interface HeroProps {
     onScrollToOffer: () => void;
 }
 
 export const Hero: React.FC<HeroProps> = ({ onScrollToOffer }) => {
+    const shouldReduceMotion = useReducedMotion();
+
     return (
         <div className="relative">
             {/* Background Layers - Keeping 'molecular' variant but ensuring it fits Clinical theme */}
             <div className="fixed inset-0 z-0 pointer-events-none">
                 <BackgroundLayers variant="molecular" />
             </div>
 
             <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center overflow-hidden">
 
                 {/* Background Image (LCP Candidate) */}
                 <div className="absolute inset-0 z-0">
                     <img
                         src={HERO_BG}
                         srcSet={`${HERO_BG_MOBILE} 800w, ${HERO_BG_TABLET} 1200w, ${HERO_BG} 2000w`}
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                         alt="Senior Fitness Model running outdoors"
                         className="w-full h-full object-cover opacity-20 md:opacity-30 mix-blend-multiply" // Adjusted opacity/blend for Clinical Theme
                         width="2000"
                         height="1333"
                         // @ts-ignore - React 19 support
                         fetchPriority="high"
                         loading="eager"
                     />
                     <div className="absolute inset-0 bg-gradient-to-b from-surface-page via-surface-page/90 to-surface-page/40" />
                 </div>
@@ -63,80 +65,78 @@ export const Hero: React.FC<HeroProps> = ({ onScrollToOffer }) => {
                         {/* CSS-animated paragraph for reduced main thread work */}
                         <p className="text-lg md:text-xl text-fg-primary leading-relaxed mb-8 max-w-xl font-medium css-fade-up css-delay-300">
                             New research reveals why traditional protein fails seniors—and the exact amino ratio clinical studies show can <span className="font-bold text-text-brand">restore muscle growth potential by 300%.</span>
                         </p>
 
                         {/* CSS-animated CTA for reduced main thread work */}
                         <div className="flex flex-col sm:flex-row gap-4 css-fade-up css-delay-500">
                             <button
                                 onClick={onScrollToOffer}
                                 className="group relative px-8 py-4 bg-cta-accent hover:bg-cta-accent-hover text-white rounded-full font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all overflow-hidden"
                             >
                                 <span className="relative z-10 flex items-center justify-center gap-2">
                                     Get The Formula <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                 </span>
                                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                             </button>
                             <div className="flex items-center gap-2 text-sm text-text-secondary font-medium justify-center sm:justify-start">
                                 <ShieldCheck className="text-action-primary" /> 90-Day Guarantee
                             </div>
                         </div>
                     </div>
 
                     {/* Hero Feature Component */}
                     <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
                         {/* Simplified Background for Clinical Theme - Removed excessive blur/pulse if needed, but keeping primarily for visual interest */}
-                        <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full scale-75" />
-                        <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite]" />
-                        <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-navy/10 animate-[spin_40s_linear_infinite_reverse]" />
+                        <div className="absolute inset-0 bg-blue-100/30 blur-2xl sm:blur-3xl rounded-full scale-75" />
+                        <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite] motion-reduce:animate-none" />
+                        <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-navy/10 animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none" />
 
                         {/* Central Image (Bottle) - LCP Element */}
                         <div className="relative z-20 w-full md:w-[800px] h-[500px] md:h-[800px] flex items-center justify-center">
                             <motion.div
                                 initial={{ opacity: 0, scale: 0.9, y: 10, rotate: 6 }}
                                 animate={{
                                     opacity: 1,
                                     scale: 1.8,
                                     y: 0,
                                     rotate: 6,
                                     transition: { duration: 0.5 }
                                 }}
                                 className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
                             >
                                 {/* Inner Floating Animation Wrapper */}
                                 <motion.img
                                     src="/test_images/advanced_amino_formula_hero_10-advanced_amino_formula-871.webp"
                                     alt="Advanced Amino Formula"
-                                    animate={{ y: [-15, 15, -15] }}
+                                    animate={shouldReduceMotion ? { y: 0 } : { y: [-15, 15, -15] }}
                                     transition={{
-                                        repeat: Infinity,
-                                        duration: 5,
+                                        repeat: shouldReduceMotion ? 0 : Infinity,
+                                        duration: shouldReduceMotion ? 0 : 5,
                                         ease: "easeInOut"
                                     }}
-                                    className="w-full h-full object-contain drop-shadow-2xl will-change-transform"
-                                    // Optimize for transparency rendering
-                                    style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))" }}
+                                    className="w-full h-full object-contain drop-shadow-lg sm:drop-shadow-2xl will-change-transform"
                                 />
                             </motion.div>
                         </div>
 
                         {/* Floating Cards */}
                         <HeroToastCard
                             icon={<Activity size={20} />}
                             title="Anabolic Rate"
                             subtitle="Restored to 99%"
                             className="top-0 -left-6 md:top-[20%] md:-left-[10%] scale-90 md:scale-100 origin-bottom-left"
                             delay={0.5}
                         />
                         <HeroToastCard
                             icon={<TrendingUp size={20} />}
                             title="Muscle Protein"
                             subtitle="+ Synthesis"
                             className="bottom-12 -right-6 md:bottom-[20%] md:-right-[5%] scale-90 md:scale-100 origin-top-right"
                             delay={0.8}
                         />
                         <HeroToastCard
                             icon={<Battery size={20} />}
                             title="Energy Reserve"
                             subtitle="Optimized"
                             className="top-12 -right-6 md:top-[10%] md:right-[10%] scale-90 md:scale-100 origin-bottom-right"
                             delay={1.1}
