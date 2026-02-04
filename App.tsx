import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Star,
  Activity,
  TrendingUp,
  Battery,
  User,
  AlertTriangle,
  Info,
  ArrowRight
} from "lucide-react";
import { GlassCard, BlurText, StaggerText, BackgroundHeading, LetterStagger, HeroToastCard } from './components/UI';
import { BackgroundLayers } from './components/BackgroundLayers';
import { ReviewTicker } from './components/ReviewTicker';
import { LegalPage } from './components/LegalPage';
// Lazy Load heavy below-the-fold components
const Carousel3D = React.lazy(() => import('./components/Carousel3D').then(module => ({ default: module.Carousel3D })));
const ComparisonChart = React.lazy(() => import('./components/ComparisonChart').then(module => ({ default: module.ComparisonChart })));
const ClinicalEvidence = React.lazy(() => import('./components/ClinicalEvidence'));
const DoctorSection = React.lazy(() => import('./components/DoctorSection').then(module => ({ default: module.DoctorSection })));
const ScienceTimeline = React.lazy(() => import('./components/Timeline').then(module => ({ default: module.ScienceTimeline })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const PricingOptions = React.lazy(() => import('./components/PricingOptions').then(module => ({ default: module.PricingOptions })));

// Loading Fallback
const SectionLoader = () => <div className="h-96 w-full flex items-center justify-center text-brand-blue/20">Loading...</div>;

// --- Assets ---
const HERO_BG = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=2000&auto=format&fit=crop";
// Optimized responsive versions
const HERO_BG_MOBILE = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=800&auto=format&fit=crop";
const HERO_BG_TABLET = "https://images.unsplash.com/photo-1552674605-469523254d5d?q=80&w=1200&auto=format&fit=crop";

// --- Config ---
const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -15% 0px"
};

const App: React.FC = () => {
  const [activeLegalPage, setActiveLegalPage] = useState<'privacy' | 'terms' | null>(null);

  const scrollToOffer = () => {
    const el = document.getElementById('offer-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeLegalPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeLegalPage]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 bg-surface-page text-text-primary overflow-x-hidden relative w-full">

      {/* --- Legal Modal Overlay --- */}
      <AnimatePresence>
        {activeLegalPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                setActiveLegalPage(null);
                document.body.style.overflow = 'auto';
              }}
            />
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-page rounded-2xl shadow-2xl z-10 custom-scrollbar">
              {/* Close Button X */}
              <button
                onClick={() => {
                  setActiveLegalPage(null);
                  document.body.style.overflow = 'auto';
                }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors z-50 shadow-sm"
              >
                <X size={24} />
              </button>

              <LegalPage
                title={activeLegalPage === 'privacy' ? "Privacy Policy" : "Terms of Use"}
                content={activeLegalPage === 'privacy' ? (
                  <>
                    <p><strong>Last Updated: January 2025</strong></p>
                    <p>Your privacy is critically important to us. Included below are our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
                    <h3>1. Information Collection</h3>
                    <p>We collect several different types of information for various purposes to provide and improve our Service to you, including Usage Data and Cookies.</p>
                    <h3>2. Use of Data</h3>
                    <p>We use the collected data for various purposes: to provide customer care, to detect, prevent and address technical issues, and to monitor the usage of the Service.</p>
                  </>
                ) : (
                  <>
                    <p><strong>Last Updated: January 2025</strong></p>
                    <p>Please read these Terms of Use carefully before using our website.</p>
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
                    <h3>2. Purchases</h3>
                    <p>If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information relevant to your Purchase.</p>
                  </>
                )}
                onBack={() => setActiveLegalPage(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
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
                <button aria-label="Open menu">
                  <Menu />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- Hero Section --- */}
        <main>
          <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center overflow-hidden">

            {/* Background Image (LCP Candidate) */}
            <div className="absolute inset-0 z-0">
              <img
                src={HERO_BG}
                srcSet={`${HERO_BG_MOBILE} 800w, ${HERO_BG_TABLET} 1200w, ${HERO_BG} 2000w`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                alt="Senior Fitness Model running outdoors"
                className="w-full h-full object-cover opacity-20 md:opacity-30"
                width="2000"
                height="1333"
                // @ts-ignore - React 19 support
                fetchPriority="high"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-surface-page via-surface-page/80 to-surface-page/20" />
            </div>

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
                  className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-navy mb-6 leading-[1.1]"
                  highlightWords={["Anabolic", "Resistance."]}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl"
                >
                  New research reveals why traditional protein fails seniors—and the exact amino ratio clinical studies show can <span className="font-bold text-brand-navy">restore muscle growth potential by 300%.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ delay: 1.8, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={scrollToOffer}
                    className="group relative px-8 py-4 bg-brand-red hover:bg-red-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-red-500/30 transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get The Formula <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </button>
                  <div className="flex items-center gap-2 text-sm text-text-muted justify-center sm:justify-start">
                    <ShieldCheck className="text-brand-blue" /> 90-Day Guarantee
                  </div>
                </motion.div>
              </div>

              {/* Hero Feature Component */}
              <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
                {/* Scientific Molecule / Cell Animation Background */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 animate-pulse" />
                <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-navy/10 animate-[spin_40s_linear_infinite_reverse]" />

                {/* Central Image (Bottle) */}
                <img
                  src="/images/product/1bottle.webp"
                  alt="Advanced Amino Formula Bottle"
                  className="relative z-20 w-48 md:w-64 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Cards */}
                <HeroToastCard
                  icon={<Activity size={20} />}
                  title="Anabolic Rate"
                  subtitle="Restored to 99%"
                  // Modified: Use specific mobile positioning (top-0 left-0) and transform scale
                  className="top-0 -left-4 md:top-[20%] md:-left-[10%] scale-75 md:scale-100 origin-bottom-left"
                  delay={0.5}
                />
                <HeroToastCard
                  icon={<TrendingUp size={20} />}
                  title="Muscle Protein"
                  subtitle="+ Synthesis"
                  // Modified: Anchor to bottom-right on mobile
                  className="bottom-12 -right-4 md:bottom-[20%] md:-right-[5%] scale-75 md:scale-100 origin-top-right"
                  delay={0.8}
                />
                <HeroToastCard
                  icon={<Battery size={20} />}
                  title="Energy Reserve"
                  subtitle="Optimized"
                  // Modified: Position near top-right but lower than Anabolic
                  className="top-12 -right-4 md:top-[10%] md:right-[10%] scale-75 md:scale-100 origin-bottom-right"
                  delay={1.1}
                />

              </div>
            </div>
          </section>

          {/* --- Intro Text Restored --- */}
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
          <Suspense fallback={<SectionLoader />}>
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
                              <p className="text-red-700 text-xs font-bold uppercase tracking-widest mb-1">The Ugly Truth</p>
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
                          <ShieldCheck size={18} /> Nearly zero metabolic waste or calories.
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
          </Suspense>



          {/* --- Section: Reviews (Carousel) - RESTORED --- */}
          <Suspense fallback={<SectionLoader />}>
            <section className="relative py-12 md:py-20 overflow-hidden">
              <BackgroundHeading text="STORIES" className="opacity-[0.04]" />
              <div className="relative z-10">
                <Carousel3D />
              </div>
            </section>
          </Suspense>

          {/* --- Section: Clinical Evidence --- */}
          <Suspense fallback={<SectionLoader />}>
            <ClinicalEvidence />
          </Suspense>

          {/* --- Section: Timeline --- */}
          <Suspense fallback={<SectionLoader />}>
            <ScienceTimeline />
          </Suspense>

          {/* --- Section: The Expert (Dr. Shallenberger) --- */}
          <Suspense fallback={<SectionLoader />}>
            <DoctorSection />
          </Suspense>

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
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-navy mb-6">Why This Matters</h2>
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
          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>

          {/* --- Offer Section --- */}
          <Suspense fallback={<SectionLoader />}>
            <section id="offer-section" className="relative overflow-hidden bg-surface-page pb-20">
              <PricingOptions />
            </section>
          </Suspense>
        </main>

        {/* --- Footer --- */}
        <footer className="py-12 border-t border-border-subtle bg-surface-section text-text-secondary text-xs text-center px-4 relative">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <p>
              FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <div className="flex justify-center gap-6 text-brand-blue font-medium">
              <button onClick={() => setActiveLegalPage('privacy')} className="hover:underline hover:text-brand-navy transition-colors">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => setActiveLegalPage('terms')} className="hover:underline hover:text-brand-navy transition-colors">Terms of Service</button>
            </div>
            <p>&copy; {new Date().getFullYear()} Advanced Bionutritionals. All Rights Reserved.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default App;