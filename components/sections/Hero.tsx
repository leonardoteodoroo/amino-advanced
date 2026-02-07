diff --git a/components/sections/Hero.tsx b/components/sections/Hero.tsx
index 01584540c8c6b2db5a7238d66e017fd69dd55a08..514d9d4fb7acafc68e4199eb13cecf4d97db276c 100644
--- a/components/sections/Hero.tsx
+++ b/components/sections/Hero.tsx
@@ -1,54 +1,48 @@
 import React from 'react';
 import { AlertTriangle, ArrowRight, ShieldCheck, Activity, TrendingUp, Battery } from 'lucide-react';
 import { LetterStagger, HeroToastCard } from '../UI';
-import { BackgroundLayers } from '../BackgroundLayers';
 
 const HERO_BG = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=2000&auto=format&fit=crop";
 const HERO_BG_MOBILE = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=800&auto=format&fit=crop";
 const HERO_BG_TABLET = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=1200&auto=format&fit=crop";
 
 const VIEWPORT_CONFIG = {
     once: true,
     amount: 0.3,
     margin: "0px 0px -15% 0px"
 };
 
 import { motion } from 'framer-motion';
 
 interface HeroProps {
     onScrollToOffer: () => void;
 }
 
 export const Hero: React.FC<HeroProps> = ({ onScrollToOffer }) => {
     return (
         <div className="relative">
-            {/* Background Layers - Keeping 'molecular' variant but ensuring it fits Clinical theme */}
-            <div className="fixed inset-0 z-0 pointer-events-none">
-                <BackgroundLayers variant="molecular" />
-            </div>
-
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
 
                 <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
                     <div className="order-2 md:order-1 flex flex-col justify-center">
                         {/* CSS-animated badge for reduced main thread work */}
                         <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full bg-warning-bg border border-feedback-warning/20 text-feedback-warning text-xs font-bold uppercase tracking-wider mb-6 css-fade-left">
                             <AlertTriangle size={14} className="mr-2 text-feedback-warning" />
                             Muscle Health Alert
