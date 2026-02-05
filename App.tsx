import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from "lucide-react";

// Components (Structure & Sections)
import { Header } from './components/structure/Header';
import { Hero } from './components/sections/Hero';
import { TheProblem } from './components/sections/TheProblem';
import { BackgroundLayers } from './components/BackgroundLayers';
import { ReviewTicker } from './components/ReviewTicker';
import { LegalPage } from './components/LegalPage';

// UI Components
import { BackgroundHeading, BlurText, GlassCard } from './components/UI'; // Keeping GlassCard for un-refactored sections momentarily or use ClinicalCard?
// Wait, I should replace GlassCard usage in 'Results' section too if I want full consistency.
// The Results section is still in App.tsx below. I should probably extract it or replace GlassCard usage here.
// For now, I will replace GlassCard with ClinicalCard in the inline sections of App.tsx as well to fully implement the theme.
import { ClinicalCard } from './components/ui/ClinicalCard';

// Lazy Load heavy below-the-fold components
const Carousel3D = React.lazy(() => import('./components/Carousel3D').then(module => ({ default: module.Carousel3D })));
const ComparisonChart = React.lazy(() => import('./components/ComparisonChart').then(module => ({ default: module.ComparisonChart }))); // Used in TheProblem, but maybe also needed here? No.
const ClinicalEvidence = React.lazy(() => import('./components/ClinicalEvidence'));
const DoctorSection = React.lazy(() => import('./components/DoctorSection').then(module => ({ default: module.DoctorSection })));
const ScienceTimeline = React.lazy(() => import('./components/Timeline').then(module => ({ default: module.ScienceTimeline })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const PricingOptions = React.lazy(() => import('./components/PricingOptions').then(module => ({ default: module.PricingOptions })));

// Loading Fallback (Clinical Theme)
const SectionLoader = () => (
  <div className="h-96 w-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-surface-section border-t-brand-navy rounded-full animate-spin"></div>
      <span className="text-text-secondary font-medium tracking-wide">Loading Clinical Data...</span>
    </div>
  </div>
);

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" // Increased contrast on overlay
          >
            <div
              className="absolute inset-0"
              onClick={() => {
                setActiveLegalPage(null);
                document.body.style.overflow = 'auto';
              }}
            />
            <div className="relative w-[calc(100%-1rem)] sm:w-full max-w-3xl h-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-10 custom-scrollbar border border-slate-200">
              {/* Close Button X */}
              <button
                onClick={() => {
                  setActiveLegalPage(null);
                  document.body.style.overflow = 'auto';
                }}
                className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-50"
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

        <Header onScrollToOffer={scrollToOffer} />

        <main>

          <Hero onScrollToOffer={scrollToOffer} />

          {/* --- Intro Text Restored --- */}
          <section className="relative z-20 bg-surface-page pt-8 pb-4">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                className="text-text-secondary font-serif text-lg md:text-2xl leading-relaxed font-light px-2"
              >
                <span className="text-text-brand text-3xl mr-2">"</span>
                Before we dive into the clinical science, witness what happens when the body finally gets the fuel it's been starving for.
                <span className="text-text-brand text-3xl ml-2">"</span>
              </motion.div>
            </div>
          </section>

          <ReviewTicker />

          <Suspense fallback={<SectionLoader />}>
            <TheProblem />
          </Suspense>

          {/* --- Section: Reviews (Carousel) --- */}
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
                <BlurText text="Life After 50 Transformation" className="text-3xl md:text-5xl font-serif font-bold text-text-brand mt-2 mb-4" />
                <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base px-4">Not just about biceps. It's about independence.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 relative z-10 auto-rows-fr">
                {/* Result Cards using ClinicalCard now */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.1, duration: 0.5 }} className="h-full">
                  <ClinicalCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                    <h4 className="text-xl md:text-2xl font-bold text-text-brand mb-3">Developing Muscle at 68</h4>
                    <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Edmund R. began developing biceps and forearms for the first time in his life after age 60."</p>
                  </ClinicalCard>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.2, duration: 0.5 }} className="h-full">
                  <ClinicalCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                    <h4 className="text-xl md:text-2xl font-bold text-text-brand mb-3">Consistent Energy</h4>
                    <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Brad A. (63) stopped feeling aches at night and regained the energy to train without feeling depleted the next day."</p>
                  </ClinicalCard>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.3, duration: 0.5 }} className="h-full">
                  <ClinicalCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                    <h4 className="text-xl md:text-2xl font-bold text-text-brand mb-3">Stamina in My 70s</h4>
                    <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Patrick V. (Mid 70s) takes five pills before the gym. He says his recuperation after heavy sets is unbelievably quick."</p>
                  </ClinicalCard>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_CONFIG} transition={{ delay: 0.4, duration: 0.5 }} className="h-full">
                  <ClinicalCard className="p-6 md:p-8 h-full flex flex-col justify-center" hoverEffect>
                    <h4 className="text-xl md:text-2xl font-bold text-text-brand mb-3">Long-Term Game Changer</h4>
                    <p className="text-text-secondary italic leading-relaxed text-sm md:text-base">"Benny Z. has used the formula for years, claiming it keeps his strength and healing capacity far above average for his age."</p>
                  </ClinicalCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* --- Section: Why This Matters --- */}
          <section className="py-20 relative overflow-hidden bg-surface-section">
            <div className="absolute inset-0 bg-blue-900/5 rotate-3 scale-110 pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 relative z-10">
              <ClinicalCard className="p-8 md:p-12 text-center" hoverEffect>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-text-brand mb-6">Why This Matters</h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
                  Proper protein absorption isn't just about gym gains. It's the biological foundation for immune health, cognitive sharpness, and maintaining the metabolic engine that keeps you active.
                </p>
                <p className="text-action-primary font-medium text-lg leading-relaxed">
                  Without it, the body catabolizes its own tissue to survive—leading to the frailty we often mistake for inevitable aging.
                </p>
              </ClinicalCard>
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
        <footer className="py-12 border-t border-border-subtle bg-surface-page text-text-secondary text-xs text-center px-4 relative">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <p className="text-text-muted">
              FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <div className="flex justify-center gap-6 text-action-primary font-medium">
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