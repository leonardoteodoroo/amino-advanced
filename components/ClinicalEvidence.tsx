import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FlaskConical, Microscope, FileText, Activity } from 'lucide-react';
import { GlassCard } from './UI';

const ClinicalEvidence: React.FC = () => {
    const studies = [
        {
            topic: "mTORC1 Activation",
            title: "Leucine-Sensing in Protein Synthesis",
            result: "Aging skeletal muscle requires a critical 'Leucine Threshold' to activate the mTORC1 pathway, the master switch for muscle tissue repair.",
            citation: "Advances in Role of Leucine-Sensing, PMC8047301",
            icon: <FlaskConical className="text-brand-blue" size={20} />
        },
        {
            topic: "Anabolic Resistance",
            title: "Overcoming Age-Related Decay",
            result: "Essential amino acid bioavailability is the primary determinant in reversing anabolic resistance in the aging phenotype.",
            citation: "Anabolic Resistance Pathogenesis, MDPI 15/18",
            icon: <Microscope className="text-brand-blue" size={20} />
        },
        {
            topic: "Microbiota Impact",
            title: "The Gut-Muscle Axis Connection",
            result: "Emerging evidence links gut microbiome health directly to sarcopenia, showing that clinical-grade aminos reduce systemic inflammation.",
            citation: "Gut Microbiota & Sarcopenia Review, Frontiers 2025",
            icon: <Activity className="text-brand-blue" size={20} />
        },
        {
            topic: "Muscle Sparing",
            title: "Direct Nitrogen Utilization (NNU)",
            result: "Clinical studies demonstrate that formulas reaching 99% NNU produce nearly zero nitrogen waste (Ammonia), sparing renal function.",
            citation: "Muscle Protein Metabolism, Frontiers in Physiology",
            icon: <FileText className="text-brand-blue" size={20} />
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Medical Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-3">Clinical Intelligence</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-navy mb-6">Backed by Peer-Reviewed Science</h2>
                    <div className="h-1 w-20 bg-brand-blue mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {studies.slice(0, 4).map((study, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <GlassCard className="h-full p-6 flex flex-col border-slate-100 bg-slate-50/30 hover:bg-white transition-colors duration-300">
                                <div className="mb-4 p-3 bg-white rounded-xl shadow-sm w-fit border border-slate-100">
                                    {study.icon}
                                </div>
                                <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{study.topic}</h3>
                                <h4 className="font-bold text-brand-navy text-base mb-3 leading-snug">{study.title}</h4>
                                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                                    "{study.result}"
                                </p>
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-xs font-mono text-fg-secondary italic">
                                        Source: {study.citation}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-text-muted max-w-2xl mx-auto">
                        *This summary represents synthesis from clinical data sources available in our scientific research repository.
                        Citations refer to studies documenting the mechanism of action of EAAs and mTORC1 pathways.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ClinicalEvidence;
