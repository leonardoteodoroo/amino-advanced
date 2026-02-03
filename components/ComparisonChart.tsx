import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonChart: React.FC = () => {
  const data = [
    { label: 'Whey/Soy', subLabel: '& Nuts', value: 17, color: 'bg-gray-300' },
    { label: 'Meat/Fish', subLabel: '& Poultry', value: 32, color: 'bg-gray-400' },
    { label: 'Whole Eggs', subLabel: '', value: 48, color: 'bg-gray-500' },
    { label: 'Advanced Amino', subLabel: 'Formula', value: 99, color: 'bg-[#f97316]' }, // Orange
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* Title Section: Added generous bottom margin (mb-10) to prevent 99% label from overlapping text */}
      <div className="text-center mb-10 relative z-20">
        <h4 className="text-sm md:text-base text-white font-bold uppercase tracking-wider">
            Protein Utilization Rates
        </h4>
        <p className="text-xs text-gray-400 mt-1">How much your body actually uses</p>
      </div>
      
      {/* Chart Container: Restored original height, kept safe padding-top */}
      <div className="w-full h-[320px] md:h-[360px] flex items-end justify-between gap-2 md:gap-6 relative px-2 md:px-6 pb-2 pt-12">
        
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-x-0 top-12 bottom-8 flex flex-col justify-between pointer-events-none opacity-[0.1] z-0 px-4">
            {[100, 75, 50, 25, 0].map((tick) => (
                <div key={tick} className="w-full h-px bg-white border-t border-dashed border-white/50 relative">
                     <span className="absolute -left-6 -top-2 text-[9px] text-gray-400 font-mono">{tick}%</span>
                </div>
            ))}
        </div>

        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-end h-full w-full z-10 group relative min-w-0">
            
            {/* Value Label */}
            <div className="w-full flex justify-center mb-2">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1), type: "spring" }}
                    className={`text-sm md:text-xl font-black whitespace-nowrap ${index === 3 ? 'text-[#f97316] scale-110 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'text-gray-300'}`}
                >
                    {item.value}%
                </motion.div>
            </div>
            
            {/* Bar */}
            <motion.div
              initial={{ height: "1%" }}
              whileInView={{ height: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full max-w-[40px] md:max-w-[60px] rounded-t-lg relative flex-shrink-0 origin-bottom overflow-visible ${index === 3 ? 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.4)]' : 'bg-gradient-to-t from-gray-700 to-gray-500 opacity-80'}`}
            >
                {/* Glossy Effect on Bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-50 rounded-t-lg overflow-hidden" />
            </motion.div>
            
            {/* X-Axis Label */}
            <div className="mt-3 min-h-[40px] flex flex-col items-center justify-start text-center">
                <span className={`text-[10px] md:text-xs font-bold leading-tight block ${index === 3 ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                </span>
                {item.subLabel && (
                     <span className="text-[9px] md:text-[10px] text-gray-500 leading-tight block">
                        {item.subLabel}
                     </span>
                )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 md:mt-4 p-3 bg-white/5 rounded-lg border border-white/5 backdrop-blur-sm text-center mx-auto max-w-sm">
          <p className="text-[10px] md:text-xs text-gray-300 leading-relaxed">
             <span className="text-orange-400 font-bold block mb-1">99% Utilization Advantage</span> 
             Virtually zero metabolic waste means no stress on kidneys.
          </p>
      </div>
    </div>
  );
};