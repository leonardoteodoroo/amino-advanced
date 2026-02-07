import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { BackgroundHeading, StaggerText } from '../UI';
import { ClinicalCard } from '../ui/ClinicalCard';
import { ComparisonChart } from '../ComparisonChart';

export const TheProblem: React.FC = () => {
    return (
        <section className="py-20 md:py-24 relative z-10 overflow-hidden bg-surface-page">
            <BackgroundHeading text="ABSORPTION" className="top-1/3 opacity-[0.03]" />
            {/* Subtle background accent instead of heavy blur */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-warning-bg/50 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <ClinicalCard className="p-6 md:p-12 relative overflow-hidden bg-white">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-action-strong to-transparent opacity-50" />

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                        <div className="flex-1 min-w-0 space-y-8 md:space-y-10">
                            <div className="relative">
                                <div className="absolute left-0 top-2 bottom-2 w-1 bg-border-subtle rounded-full" />
                                <div className="pl-6">
                                    <p className="text-fg-brand text-base md:text-lg leading-relaxed mb-6 font-serif italic border-l-4 border-border-subtle pl-4 py-2 bg-surface-page rounded-r-lg">
                                        "It’s a quiet frustration. You walk every morning, you try to eat right, but your legs feel a bit <span className="text-fg-primary font-bold not-italic">"heavier"</span> each year."
                                    </p>
                                    <div className="p-4 rounded-xl bg-warning-bg border border-feedback-warning/20 flex gap-4 items-start">
                                        <div className="p-2 bg-white rounded-full shrink-0 border border-feedback-warning/20 shadow-sm">
                                            <AlertTriangle className="text-action-strong" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-fg-brand text-xs font-bold uppercase tracking-widest mb-1">The Ugly Truth</p>
                                            <p className="text-text-primary font-medium text-base md:text-lg leading-snug">
                                                Nobody in the supplement industry wants to admit this: <span className="font-bold text-action-strong">After 50, your body treats most protein like garbage.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 text-text-brand break-words">The "Anabolic Lock"</h2>
                                <p className="text-text-secondary text-base md:text-lg mb-4">
                                    Research shows that after age 50, muscles develop a condition called <strong className="text-text-primary">Anabolic Resistance</strong>. It’s a biological "lock" that prevents normal protein from triggering muscle repair.
                                </p>
                                <StaggerText
                                    text="This is the '17% Trap': When you eat steak or drink whey, your aging body only utilizes a fraction, leaving 83% to become toxic metabolic waste."
                                    className="text-lg md:text-xl text-action-primary mb-6 font-medium leading-relaxed"
                                />
                                <div className="bg-surface-highlight border-l-4 border-action-primary p-5 rounded-r-xl mb-6 shadow-sm">
                                    <p className="text-text-brand font-bold text-lg mb-2">The Leucine Threshold Key</p>
                                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                        To break Anabolic Resistance, your blood needs a surgical strike of <span className="font-bold text-text-brand">3.0g of pure Leucine</span>. Traditional protein requires you to eat massive calories just to reach this threshold—but Advanced Amino provides it instantly.
                                    </p>
                                </div>
                                <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                                    Advanced Amino skip the digestion 'bottleneck' entirely. While Whey leaves a massive surplus of metabolic waste (ammonia), this formula provides <span className="text-text-brand font-bold">99% Net Nitrogen Utilization (NNU)</span>.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-green-700 font-bold text-sm bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm">
                                    <ShieldCheck size={18} /> Nearly zero metabolic waste or calories.
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-5/12 flex flex-col justify-center items-center relative shrink-0 mt-4 lg:mt-12">
                            <div className="w-full bg-white rounded-2xl p-4 md:p-6 border border-border-subtle shadow-lg relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-50 blur-[60px] opacity-60" />
                                <ComparisonChart />
                            </div>
                        </div>
                    </div>
                </ClinicalCard>
            </div>
        </section>
    );
};
