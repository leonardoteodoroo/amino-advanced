import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Zap,
  Menu,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Battery
} from 'lucide-react';
import { GlassCard, BlurText, StaggerText, Toast, BackgroundHeading, HeroToastCard, LetterStagger } from './components/UI';
import { BackgroundLayers } from './components/BackgroundLayers';
import { ScienceTimeline } from './components/Timeline';
import { Carousel3D } from './components/Carousel3D';

import { ComparisonChart } from './components/ComparisonChart';
import { FAQ } from './components/FAQ';
import { PricingOptions } from './components/PricingOptions';

// --- Assets ---
const HERO_BG = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=2000&auto=format&fit=crop";

// --- Config ---
const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -15% 0px"
};

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ msg: "", sub: "" });

  // Simulate Recent Purchases
  useEffect(() => {
    const locations = ["Florida", "Texas", "California", "Arizona", "Ohio", "New York", "Colorado"];
    const names = ["Robert", "Mary", "James", "Patricia", "John", "Jennifer", "Michael"];

    const triggerToast = () => {
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      setToastMessage({ msg: `New Verification`, sub: `${name} from ${loc} just secured their supply.` });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    };

    const interval = setInterval(triggerToast, 12000); // Every 12s
    setTimeout(triggerToast, 3000); // First one

    return () => clearInterval(interval);
  }, []);

  const scrollToOffer = () => {
    const el = document.getElementById('offer-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 bg-surface-page text-text-primary overflow-x-hidden relative w-full">

      {/* --- Global Background (Scientific/Clinical) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundLayers variant="molecular" />
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-border-subtle bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-serif font-bold text-xl tracking-wider text-brand-navy">
              ADVANCED<span className="text-brand-blue">BIO</span>
            </div>
            <div className="hidden md:block">
              <button onClick={scrollToOffer} className="px-6 py-2 rounded-full bg-brand-navy hover:bg-blue-800 text-white transition-all text-xs font-semibold uppercase tracking-widest shadow-md hover:shadow-lg">
                Check Availability
              </button>
            </div>
            <div className="md:hidden text-white">
              <Menu />
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center overflow-hidden">

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center self-start px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6"
            >
              <AlertTriangle size={14} className="mr-2 text-red-600" />
              Muscle Health Alert
            </motion.div>

            <LetterStagger
              text={`Maybe it's not "old age". Maybe your muscles are just starving.`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-brand-navy drop-shadow-sm"
              delay={0.2}
              highlightWords={["starving."]}
            />

            <div className="mb-8 border-l-4 border-brand-blue pl-4 bg-blue-50/50 p-4 rounded-r-lg">
              <StaggerText
                text='"I saw my active uncle struggle to open a jar, and he was drinking two protein shakes a day. That&apos;s when I realized something was very wrong."'
                className="text-sm md:text-lg text-text-secondary italic leading-relaxed font-medium"
              />
            </div>

            <motion.button
              onClick={scrollToOffer}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(30, 58, 138, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 0 0px rgba(37, 99, 235, 0)",
                  "0 0 20px rgba(37, 99, 235, 0.2)",
                  "0 0 0px rgba(37, 99, 235, 0)"
                ]
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full md:w-auto group relative px-8 py-4 bg-brand-navy hover:bg-blue-800 text-white rounded-full font-bold shadow-xl transition-all flex items-center justify-center border border-white/20 text-sm md:text-base"
            >
              Discover The Solution
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="order-1 md:order-2 relative h-full flex items-center justify-center">
            {/* Optimized Aspect Ratio Container */}
            <div className="relative w-full max-w-[400px] md:max-w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:h-[600px] bg-slate-800">
              <img
                src={HERO_BG}
                alt="Active senior running"
                fetchPriority="high"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-1000 ease-out z-0"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617] opacity-60" />

              {/* --- HERO TOAST CARDS (Responsive Positioning) --- */}
              <HeroToastCard
                icon={<TrendingUp size={20} />}
                title="Absorption +99%"
                subtitle="Protein Synthesis Active"
                className="top-[8%] right-[5%] md:top-12 md:right-8 rotate-1 scale-90 md:scale-100 origin-top-right"
                delay={1.2}
              />

              <HeroToastCard
                icon={<Battery size={20} />}
                title="Energy Restored"
                subtitle="Cellular uptake optimized"
                className="top-[45%] left-[5%] md:top-[45%] md:left-8 -translate-y-1/2 opacity-90 scale-90 md:scale-100 origin-left"
                delay={1.4}
              />

              {/* Floating Card (Bottom Summary) */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20"
              >
                <GlassCard className="p-4 md:p-6 backdrop-blur-xl bg-black/60 border-white/20">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-red-500/20 rounded-full mt-1 shrink-0">
                      <Zap className="text-red-400" size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] md:text-xs text-red-400 font-bold uppercase tracking-widest mb-1">The Hidden Problem</p>
                      <p className="font-bold text-sm md:text-lg text-white leading-tight break-words">After 50, your body treats most protein like garbage.</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Intro Text for Reviews --- */}
      <section className="relative z-20 bg-surface-page pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            className="text-text-secondary font-serif text-lg md:text-2xl leading-relaxed font-light px-2"
          >
            <span className="text-brand-blue text-3xl mr-2">"</span>
            Before we dive into the clinical science, witness what happens when the body finally gets the fuel it's been starving for.
            <span className="text-brand-blue text-3xl ml-2">"</span>
          </motion.p>
        </div>
      </section>



      {/* --- Section: The 17% Trap --- */}
      <section className="py-20 md:py-24 relative z-10 overflow-hidden">

        <BackgroundHeading text="ABSORPTION" className="top-1/3 opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/5 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <GlassCard className="p-6 md:p-12 border border-border-subtle relative overflow-hidden shadow-lg bg-surface-card">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

              {/* Left Column: Narrative & Explanation */}
              <div className="flex-1 min-w-0 space-y-8 md:space-y-10">

                {/* 1. The Frustration (Emotional Hook) */}
                <div className="relative">
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-gray-300 to-transparent rounded-full" />
                  <div className="pl-6">
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6 font-light italic">
                      "It’s a quiet frustration. You walk every morning, you try to eat right, but your legs feel a bit <span className="text-text-primary font-normal not-italic">"heavier"</span> each year."
                    </p>

                    <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-4 items-start">
                      <div className="p-2 bg-red-100 rounded-full shrink-0">
                        <AlertTriangle className="text-red-500" size={20} />
                      </div>
                      <div>
                        <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-1">The Ugly Truth</p>
                        <p className="text-text-primary font-medium text-base md:text-lg leading-snug">
                          Nobody in the supplement industry wants to admit this: <span className="font-bold text-red-700">After 50, your body treats most protein like garbage.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. The Logic (Scientific Explanation) */}
                <div>
                  <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 text-brand-navy break-words">The "17% Trap"</h2>
                  <p className="text-text-secondary text-base md:text-lg mb-4">
                    The average person loses <strong className="text-text-primary">30% of their muscle mass</strong> by the time they’re 70. The reason isn't just age—it's absorption.
                  </p>
                  <StaggerText
                    text="When you drink Whey or Soy protein, your body only uses about 17% to actually build muscle."
                    className="text-lg md:text-xl text-brand-blue mb-6 font-medium leading-relaxed"
                  />
                  <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                    The other 83%? It’s converted into sugar or metabolic waste that stresses your kidneys. You aren't lacking protein. <span className="text-brand-navy font-bold border-b-2 border-red-500">You are lacking absorption.</span>
                  </p>
                </div>

              </div>

              {/* Right Column: Chart */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center items-center relative shrink-0 mt-4 lg:mt-12">
                <div className="w-full bg-surface-card rounded-2xl p-4 md:p-6 border border-border-subtle shadow-lg relative overflow-hidden">
                  {/* Subtle glow behind chart */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100 blur-[80px]" />
                  <ComparisonChart />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* --- Section 1: Reviews (Carousel) --- */}
      <section className="relative py-12 md:py-20 overflow-hidden">

        {/* Giant Background Text similar to reference */}
        <BackgroundHeading text="STORIES" className="opacity-[0.04]" />
        <div className="relative z-10">
          <Carousel3D />
        </div>
      </section>

      {/* --- Section 2: Science Timeline --- */}
      <section className="relative overflow-hidden py-12">

        <BackgroundHeading text="SCIENCE" className="opacity-[0.03] top-1/4" />
        <ScienceTimeline />
      </section>

      {/* --- Section 3: Transformation (Grid) --- */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 relative overflow-hidden">

        <BackgroundHeading text="RESULTS" className="opacity-[0.03] top-1/2" />

        <div className="relative z-20">
          <div className="text-center mb-16 relative z-10">
            <BlurText text="Life After 50 Transformation" className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mt-2 mb-4" />
            <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base px-4">Not just about biceps. It's about independence.</p>
          </div>

          {/* FIXED GRID: Replaced masonry layout with uniform grid for better reliability */}
          <div className="grid md:grid-cols-2 gap-6 relative z-10 auto-rows-fr">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-full"
            >
              <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Developing Muscle at 68</h4>
                <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Edmund R. began developing biceps and forearms for the first time in his life after age 60."</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-full"
            >
              <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Consistent Energy</h4>
                <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Brad A. (63) stopped feeling aches at night and regained the energy to train without feeling depleted the next day."</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-full"
            >
              <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Stamina in My 70s</h4>
                <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Patrick V. (Mid 70s) takes five pills before the gym. He says his recuperation after heavy sets is unbelievably quick."</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-full"
            >
              <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Long-Term Game Changer</h4>
                <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Benny Z. has used the formula for years, claiming it keeps his strength and healing capacity far above average for his age."</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Authority --- */}
      <section className="py-20 md:py-32 relative overflow-hidden">

        <div className="absolute inset-0 bg-surface-section -skew-y-3 transform origin-top-left pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-12 md:gap-16 items-center relative z-20">
          <div className="md:w-5/12 w-full px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-border-subtle aspect-[3/4] md:aspect-auto"
            >
              {/* LAZY LOAD FOR SECTION 4 IMAGE */}
              <img
                src="/images/dr-shallenberger.webp"
                alt="Dr. Frank Shallenberger"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-navy/90 to-transparent p-6 text-center">
                <p className="font-bold text-xl text-white">Dr. Frank Shallenberger</p>
                <p className="text-sm text-blue-100">Integrative Medicine Expert</p>
              </div>
            </motion.div>
          </div>
          <div className="md:w-7/12 w-full px-2">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brand-navy text-center md:text-left">Science You Can Trust</h3>
            <p className="text-text-secondary mb-8 text-lg leading-relaxed text-center md:text-left">
              This formula was refined by Dr. Frank Shallenberger, a physician with decades of clinical experience. He didn't just want another supplement; he wanted a tool to maintain the <strong className="text-text-primary">functional independence</strong> of his patients as they age.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full shrink-0">
                  <ShieldCheck className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-primary">GMP Certified USA</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full shrink-0">
                  <Activity className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-primary">Vegan Friendly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full shrink-0">
                  <CheckCircle2 className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-primary">Non-GMO</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-100 rounded-full shrink-0">
                  <CheckCircle2 className="text-brand-blue" size={18} />
                </div>
                <span className="text-sm font-semibold text-text-primary">Dairy & Gluten Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Why This Matters --- */}
      <section className="py-20 md:py-24 relative overflow-hidden">

        <BackgroundLayers variant="data" className="opacity-40" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <GlassCard className="p-8 md:p-12 text-center bg-brand-navy border-none shadow-lg" hoverEffect>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-6">Why This Matters</h3>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              Proper protein absorption isn't just about gym gains. It's the biological foundation for immune health, cognitive sharpness, and maintaining the metabolic engine that keeps you active. Without it, the body catabolizes its own tissue to survive, leading to the frailty we often mistake for inevitable aging.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* --- NEW SECTION: FAQ --- */}
      <section className="py-20 md:py-24 relative z-20 overflow-hidden">

        <FAQ />
      </section>

      {/* --- Section 5: Offer (Risk Free) --- */}
      <section id="offer-section" className="relative overflow-hidden bg-surface-page pb-20">

        {/* Subtle bottom glow instead of EKG */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/5 blur-[80px] pointer-events-none" />

        <PricingOptions />
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-border-subtle bg-surface-section text-text-muted text-[10px] md:text-xs text-center px-4 relative">

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <p>
            FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p>
            Affiliate Disclosure: I may receive a commission if you purchase through the links on this page, which helps support our research into high-quality health solutions for seniors.
          </p>
          <p className="pt-8 text-text-primary font-serif italic">
            Advanced Amino Formula - Restore Your Strength
          </p>
        </div>
      </footer>

      <Toast
        isVisible={showToast}
        message={toastMessage.msg}
        subMessage={toastMessage.sub}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default App;