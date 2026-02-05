import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, BookOpen, Star, Quote } from 'lucide-react';
import { GlassCard } from './UI';

export const DoctorSection: React.FC = () => {
    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Image Column - Simplified to hide low resolution */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative flex justify-center"
                    >
                        <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50">
                            <img
                                src="/images/dr-shallenberger.webp"
                                alt="Dr. Frank Shallenberger"
                                className="w-full h-auto object-cover aspect-[4/5] opacity-95 grayscale-[20%]"
                                width="400"
                                height="500"
                                loading="lazy"
                            />
                            {/* Simple text overlay to add authority without heavy shadow */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-brand-navy/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                                    Clinical Pioneer
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-brand-navy text-[10px] font-black uppercase tracking-widest mb-6">
                                <ShieldCheck size={14} /> The Mind Behind The Formula
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy leading-tight mb-6">
                                Meet Dr. Frank Shallenberger, M.D.
                            </h2>
                            <p className="text-lg text-text-secondary leading-relaxed mb-6 font-medium">
                                Considered one of the world's leading experts in anti-aging and regenerative medicine, Dr. Shallenberger has dedicated four decades to unlocking the secrets of longevity.
                            </p>
                        </div>

                        {/* Redesigned Clinical Row */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1 flex gap-4 items-start p-4 bg-slate-50 border-l-4 border-brand-blue rounded-r-xl">
                                <Award className="text-brand-blue shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Board Certified</h3>
                                    <p className="text-sm text-text-secondary mt-1 leading-snug">Pioneer in orthomolecular medicine and oxidative therapies.</p>
                                </div>
                            </div>
                            <div className="flex-1 flex gap-4 items-start p-4 bg-slate-50 border-l-4 border-brand-blue rounded-r-xl">
                                <BookOpen className="text-brand-blue shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-brand-navy text-sm uppercase tracking-wide">Published Author</h3>
                                    <p className="text-sm text-text-secondary mt-1 leading-snug">Multiple breakthroughs in skeletal muscle metabolism.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white relative group">
                            <Quote className="absolute -top-4 -left-4 text-white/10" size={60} />
                            <p className="text-lg md:text-xl italic font-serif leading-relaxed relative z-10 mb-6 font-light">
                                "The biggest mistake seniors make is thinking they just need more protein. What they actually need is the right clinical ratio of amino acids to bypass the metabolic waste bottleneck."
                            </p>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="h-px w-8 bg-brand-blue" />
                                <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-brand-blue">Dr. Frank Shallenberger</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
