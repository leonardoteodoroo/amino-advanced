import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Activity,
  TrendingUp,
  Battery,
} from "lucide-react";
import { BackgroundLayers } from "../BackgroundLayers";

interface HeroProps {
  onScrollToOffer: () => void;
}

// Card estático com CSS — zero Framer Motion no Hero
interface ToastCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  delayClass?: string;
}

const StaticToastCard: React.FC<ToastCardProps> = ({
  icon,
  title,
  subtitle,
  className = "",
  delayClass = "",
}) => (
  <div className={`absolute z-30 ${className} css-fade-up ${delayClass}`}>
    <div className="flex items-center gap-3 p-3 pr-5 rounded-2xl bg-white/95 border border-brand-blue/10 shadow-[0_4px_16px_0_rgba(30,58,138,0.08)] sm:shadow-[0_8px_32px_0_rgba(30,58,138,0.1)] w-max max-w-[85vw] sm:max-w-xs">
      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 text-brand-blue shrink-0 border border-blue-100">
        {icon}
      </div>
      <div>
        <h4 className="text-brand-navy font-bold text-xs md:text-sm leading-none mb-1">
          {title}
        </h4>
        <p className="text-text-secondary text-xs font-medium opacity-90 leading-tight">
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onScrollToOffer }) => {
  return (
    <div className="relative">
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            {/* Badge — CSS animation */}
            <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full bg-warning-bg border border-feedback-warning/20 text-feedback-warning text-xs font-bold uppercase tracking-wider mb-6 css-fade-left">
              <AlertTriangle size={14} className="mr-2 text-feedback-warning" />
              Muscle Health Alert
            </div>

            {/* Título — CSS animation, zero JS */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-brand mb-6 leading-[1.1] css-fade-up css-delay-100">
              Maybe it's not "Old Age". It's a biological lock called{" "}
              <span className="text-brand-blue">Anabolic Resistance.</span>
            </h1>

            <p className="text-lg md:text-xl text-fg-primary leading-relaxed mb-8 max-w-xl font-medium css-fade-up css-delay-300">
              New research reveals why traditional protein fails seniors—and the
              exact amino ratio clinical studies show can{" "}
              <span className="font-bold text-text-brand">
                restore muscle growth potential by 300%.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 css-fade-up css-delay-500">
              <button
                onClick={onScrollToOffer}
                className="group relative px-8 py-4 bg-cta-accent hover:bg-cta-accent-hover text-white rounded-full font-bold text-lg shadow-lg hover:shadow-orange-500/30 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get The Formula{" "}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              <div className="flex items-center gap-2 text-sm text-text-secondary font-medium justify-center sm:justify-start">
                <ShieldCheck className="text-action-primary" /> 90-Day Guarantee
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            {/* Background decorativo — sem blur, sem repaint */}
            <div className="absolute inset-0 bg-blue-100/20 rounded-full scale-75" />
            <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-brand-blue/10 animate-[spin_60s_linear_infinite] motion-reduce:animate-none" />
            <div className="absolute w-48 h-48 md:w-72 md:h-72 rounded-full border border-brand-navy/10 animate-[spin_40s_linear_infinite_reverse] motion-reduce:animate-none" />

            {/* Garrafa — img pura com CSS float, zero Framer Motion */}
            <div className="relative z-20 w-full md:w-[800px] h-[500px] md:h-[800px] flex items-center justify-center css-fade-up css-delay-200">
              <img
                src="/test_images/advanced_amino_formula_hero_10-advanced_amino_formula-871.webp"
                alt="Advanced Amino Formula"
                className="w-full h-full object-contain md:drop-shadow-2xl drop-shadow-lg css-float"
                style={{ scale: "1.8", rotate: "6deg" }}
              />
            </div>

            {/* Toast Cards — CSS animation, zero Framer Motion */}
            <StaticToastCard
              icon={<Activity size={20} />}
              title="Anabolic Rate"
              subtitle="Restored to 99%"
              className="top-0 -left-6 md:top-[20%] md:-left-[10%] scale-90 md:scale-100 origin-bottom-left"
              delayClass="css-delay-600"
            />
            <StaticToastCard
              icon={<TrendingUp size={20} />}
              title="Muscle Protein"
              subtitle="+ Synthesis"
              className="bottom-12 -right-6 md:bottom-[20%] md:-right-[5%] scale-90 md:scale-100 origin-top-right"
              delayClass="css-delay-800"
            />
            <StaticToastCard
              icon={<Battery size={20} />}
              title="Energy Reserve"
              subtitle="Optimized"
              className="top-12 -right-6 md:top-[10%] md:right-[10%] scale-90 md:scale-100 origin-bottom-right"
              delayClass="css-delay-1100"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
