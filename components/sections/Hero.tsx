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

import { motion } from 'framer-motion';

interface HeroProps {
    onScrollToOffer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToOffer }) => {
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

                <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
                    <div className="order-2 md:order-1 flex flex-col justify-center">
                        {/* CSS-animated badge for reduced main thread work */}
                        <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full bg-red-800 text-white text-xs font-bold uppercase tracking-wider mb-6 css-fade-left">
                            <AlertTriangle size={14} className="mr-2 text-white" />
                            Muscle Health Alert
                        </div>

                        <LetterStagger
                            text={`Maybe it's not "Old Age". It's a biological lock called Anabolic Resistance.`}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-brand mb-6 leading-[1.1]"
                            highlightWords={["Anabolic", "Resistance."]}
                        />

                        {/* CSS-animated paragraph for reduced main thread work */}
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl font-medium css-fade-up css-delay-300">
                            New research reveals why traditional protein fails seniors—and the exact amino ratio clinical studies show can <span className="font-bold text-text-brand">restore muscle growth potential by 300%.</span>
                        </p>

                        {/* CSS-animated CTA for reduced main thread work */}
                        <div className="flex flex-col sm:flex-row gap-4 css-fade-up css-delay-500">
                            <button
                                onClick={onScrollToOffer}
                                className="group relative px-8 py-4 bg-action-strong hover:bg-red-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all overflow-hidden"
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
                        <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full scale-75" />
                        <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-navy/10 animate-[spin_40s_linear_infinite_reverse]" />

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
                                className="absolute inset-0 w-full h-full flex items-center justify-center"
                            >
                                {/* Inner Floating Animation Wrapper */}
                                <motion.img
                                    src="/test_images/advanced_amino_formula_hero_10-advanced_amino_formula-871.webp"
                                    alt="Advanced Amino Formula"
                                    animate={{ y: [-15, 15, -15] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                        ease: "easeInOut"
                                    }}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                    // Optimize for transparency rendering
                                    style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))" }}
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
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
