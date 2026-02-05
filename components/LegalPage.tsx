import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

interface LegalPageProps {
    title: string;
    content: React.ReactNode;
    onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content, onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 md:p-12"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-brand-blue font-bold text-sm mb-8 hover:-translate-x-1 transition-transform"
            >
                <ArrowLeft size={16} /> Back to Main Page
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 rounded-2xl text-brand-blue">
                    <Shield size={32} />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-navy">{title}</h1>
            </div>

            <div className="prose prose-slate prose-lg max-w-none text-text-secondary leading-relaxed space-y-6">
                {content}
            </div>
        </motion.div>
    );
};
