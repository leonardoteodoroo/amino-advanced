import React from 'react';
import { motion } from 'framer-motion';

interface ClinicalCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const ClinicalCard: React.FC<ClinicalCardProps> = ({
    children,
    className = '',
    hoverEffect = false
}) => {
    return (
        <div
            className={`
        bg-white border border-border-subtle rounded-2xl shadow-md
        ${hoverEffect ? 'hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
