import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { GlassCard, BlurText, StaggerText, BackgroundHeading, LetterStagger } from './components/UI';
import { BackgroundLayers } from './components/BackgroundLayers';
import { ScienceTimeline } from './components/Timeline';
import { Carousel3D } from './components/Carousel3D';

import { ComparisonChart } from './components/ComparisonChart';
import { FAQ } from './components/FAQ';
import { PricingOptions } from './components/PricingOptions';
import { ReviewTicker } from './components/ReviewTicker';
import { LegalPage } from './components/LegalPage';

// --- Assets ---
const HERO_BG = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=2000&auto=format&fit=crop";

// --- Config ---
const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -15% 0px"
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'privacy' | 'terms'>('home');

  const scrollToOffer = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('offer-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('offer-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 bg-surface-page text-text-primary overflow-x-hidden relative w-full">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
                    <button onClick={scrollToOffer} className="px-6 py-2 rounded-full bg-brand-navy hover:bg-blue-800 text-white transition-all text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg">
                      Check Availability
                    </button>
                  </div>
                  <div className="md:hidden text-brand-navy">
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
                    className="inline-flex items-center self-start px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider mb-6"
                  >
                    <AlertTriangle size={14} className="mr-2 text-red-600" />
                    Muscle Health Alert
                  </motion.div>

                  <LetterStagger
                    text={`Maybe it's not "Old Age". It's a biological lock called Anabolic Resistance.`}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-brand-navy drop-shadow-sm"
                    delay={0.2}
                    highlightWords={["Anabolic", "Resistance."]}
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

                    {/* Floating Card (Bottom Summary) */}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-20"
                    >
                      <GlassCard className="p-4 md:p-6 backdrop-blur-xl bg-white/90 border-white/40 shadow-xl">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="p-2 md:p-3 bg-red-100 rounded-full mt-1 shrink-0 border border-red-200">
                            <Zap className="text-red-600" size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-red-600 font-bold uppercase tracking-widest mb-1">The Hidden Problem</p>
                            <p className="font-bold text-sm md:text-lg text-brand-navy leading-tight break-words">After 50, your body treats most protein like garbage.</p>
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

            {/* --- Review Ticker (Trust Strip) --- */}
            <ReviewTicker />

            {/* --- Section: The 17% Trap --- */}
            <section className="py-20 md:py-24 relative z-10 overflow-hidden">
              <BackgroundHeading text="ABSORPTION" className="top-1/3 opacity-[0.03]" />
              <div className="absolute top-0 right-0 w-1/3 h-full bg-red-900/5 blur-[100px] pointer-events-none" />

              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <GlassCard className="p-6 md:p-12 border border-border-subtle relative overflow-hidden shadow-lg bg-surface-card">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />

                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    <div className="flex-1 min-w-0 space-y-8 md:space-y-10">
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
                      <div>
                        <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 text-brand-navy break-words">The "Anabolic Lock"</h2>
                        <p className="text-text-secondary text-base md:text-lg mb-4">
                          Research shows that after age 50, muscles develop a condition called <strong className="text-text-primary">Anabolic Resistance</strong>. It’s a biological "lock" that prevents normal protein from triggering muscle repair.
                        </p>
                        <StaggerText
                          text="This is the '17% Trap': When you eat steak or drink whey, your aging body only utilizes a fraction, leaving 83% to become toxic metabolic waste."
                          className="text-lg md:text-xl text-brand-blue mb-6 font-medium leading-relaxed"
                        />
                        <div className="bg-surface-highlight border-l-4 border-brand-blue p-5 rounded-r-xl mb-6">
                          <p className="text-brand-navy font-bold text-lg mb-2">The Leucine Threshold Key</p>
                          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                            To break Anabolic Resistance, your blood needs a surgical strike of <span className="font-bold text-brand-navy">3.0g of pure Leucine</span>. Traditional protein requires you to eat massive calories just to reach this threshold—but Advanced Amino provides it instantly.
                          </p>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                          Advanced Amino skip the digestion 'bottleneck' entirely. While Whey leaves a massive surplus of metabolic waste (ammonia), this formula provides <span className="text-brand-navy font-bold">99% Net Nitrogen Utilization (NNU)</span>.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                          <CheckCircle2 size={18} /> Nearly zero metabolic waste or calories.
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-5/12 flex flex-col justify-center items-center relative shrink-0 mt-4 lg:mt-12">
                      <div className="w-full bg-surface-card rounded-2xl p-4 md:p-6 border border-border-subtle shadow-lg relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100 blur-[80px]" />
                        <ComparisonChart />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* --- Section: Timeline --- */}
            <ScienceTimeline />

            {/* --- Section: Results --- */}
            <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 relative overflow-hidden">
              <BackgroundHeading text="RESULTS" className="opacity-[0.03] top-1/2" />
              <div className="relative z-20">
                <div className="text-center mb-16 relative z-10">
                  <BlurText text="Life After 50 Transformation" className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mt-2 mb-4" />
                  <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base px-4">Not just about biceps. It's about independence.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 relative z-10 auto-rows-fr">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.1, duration: 0.5 }} className="h-full">
                    <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                      <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Developing Muscle at 68</h4>
                      <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Edmund R. began developing biceps and forearms for the first time in his life after age 60."</p>
                    </GlassCard>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.2, duration: 0.5 }} className="h-full">
                    <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                      <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Consistent Energy</h4>
                      <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Brad A. (63) stopped feeling aches at night and regained the energy to train without feeling depleted the next day."</p>
                    </GlassCard>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.3, duration: 0.5 }} className="h-full">
                    <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                      <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Stamina in My 70s</h4>
                      <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Patrick V. (Mid 70s) takes five pills before the gym. He says his recuperation after heavy sets is unbelievably quick."</p>
                    </GlassCard>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.4, duration: 0.5 }} className="h-full">
                    <GlassCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                      <h4 className="text-xl md:text-2xl font-bold text-brand-navy mb-3">Long-Term Game Changer</h4>
                      <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Benny Z. has used the formula for years, claiming it keeps his strength and healing capacity far above average for his age."</p>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* --- Section: Why This Matters --- */}
            <section className="py-20 relative overflow-hidden bg-surface-section">
              <div className="absolute inset-0 bg-blue-900/5 rotate-3 scale-110 pointer-events-none" />
              <div className="max-w-4xl mx-auto px-4 relative z-10">
                <GlassCard className="p-8 md:p-12 text-center bg-white border border-border-subtle shadow-lg" hoverEffect>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-brand-navy mb-6">Why This Matters</h3>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
                    Proper protein absorption isn't just about gym gains. It's the biological foundation for immune health, cognitive sharpness, and maintaining the metabolic engine that keeps you active.
                  </p>
                  <p className="text-brand-blue font-medium text-lg leading-relaxed">
                    Without it, the body catabolizes its own tissue to survive—leading to the frailty we often mistake for inevitable aging.
                  </p>
                </GlassCard>
              </div>
            </section>

            {/* --- Section: FAQ --- */}
            <FAQ />

            {/* --- Offer Section --- */}
            <section id="offer-section" className="relative overflow-hidden bg-surface-page pb-20">
              <PricingOptions />
            </section>

            {/* --- Footer --- */}
            <footer className="py-12 border-t border-border-subtle bg-surface-section text-text-muted text-xs text-center px-4 relative">
              <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                <p>
                  FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
                <p>
                  Affiliate Disclosure: I may receive a commission if you purchase through the links on this page, which helps support our research into high-quality health solutions for seniors.
                </p>
                <p className="pt-8 text-text-primary font-serif italic mb-4">
                  Advanced Amino Formula - Restore Your Strength
                </p>
                <div className="flex justify-center gap-6 text-brand-blue font-bold text-sm">
                  <button onClick={() => setView('privacy')} className="hover:underline">Privacy Policy</button>
                  <button onClick={() => setView('terms')} className="hover:underline">Terms of Service</button>
                  <button onClick={() => setView('home')} className="hover:underline">Home</button>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : view === 'privacy' ? (
          <LegalPage
            key="privacy"
            title="Privacy Policy"
            onBack={() => setView('home')}
            content={
              <>
                <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">1. Information We Collect</h3>
                <p>We may collect information through Google Tag Manager (GTM) and cookies to improve your experience and understand how our site is used. This includes IP addresses, browser types, and usage patterns.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">2. Affiliate Links</h3>
                <p>This site contains affiliate links to DigiStore24. When you click these links and make a purchase, we receive a commission. DigiStore24 has its own privacy practices which you should review on their platform.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">3. Data Security</h3>
                <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">4. Contact Us</h3>
                <p>If you have questions about this policy, please contact us through the official support channels of the product.</p>
              </>
            }
          />
        ) : (
          <LegalPage
            key="terms"
            title="Terms of Service"
            onBack={() => setView('home')}
            content={
              <>
                <p>By using this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">1. Medical Disclaimer</h3>
                <p>The information on this site is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">2. Refund Policy</h3>
                <p>All purchases are backed by a 90-Day Money-Back Guarantee. If you are not satisfied with the product, you can request a full refund within 90 days of purchase through the official merchant (DigiStore24).</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">3. Affiliate Disclosure</h3>
                <p>This is a bridge page designed to share research and benefits of the Advanced Amino Formula. We act as independent affiliates and are not the product manufacturers.</p>
                <h3 className="font-bold text-brand-navy mt-6 mb-2">4. Governing Law</h3>
                <p>These terms are governed by and construed in accordance with standard international e-commerce regulations.</p>
              </>
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;