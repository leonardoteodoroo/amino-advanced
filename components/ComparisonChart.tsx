import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonChart: React.FC = () => {
  const data = [
    { label: 'Whey/Soy', subLabel: '& Nuts', value: 17, color: 'bg-slate-300', info: '83% Nitrogen Waste (Waste products like Ammonia strain the kidneys).' },
    { label: 'Meat/Fish', subLabel: '& Poultry', value: 32, color: 'bg-slate-400', info: '68% Waste. Requires complex digestion before absorption.' },
    { label: 'Whole Eggs', subLabel: '', value: 48, color: 'bg-slate-500', info: 'Best whole food source, but still releases 52% as waste.' },
    { label: 'Advanced Amino', subLabel: 'Formula', value: 99, color: 'bg-[#f97316]', info: '99% Perfect Utilization. Virtually ZERO metabolic waste.' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* Title Section: Added generous bottom margin (mb-10) to prevent 99% label from overlapping text */}
      <div className="text-center mb-10 relative z-20">
        <h4 className="text-sm md:text-base text-brand-navy font-bold uppercase tracking-wider">
          Protein Utilization Rates
        </h4>
        <p className="text-[10px] text-text-secondary mt-1">Net Nitrogen Utilization (NNU)</p>
      </div>

      {/* Chart Container: Restored original height, kept safe padding-top */}
      <div className="w-full h-[320px] md:h-[360px] flex items-end justify-between gap-2 md:gap-6 relative px-2 md:px-6 pb-2 pt-12">

        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-x-0 top-12 bottom-8 flex flex-col justify-between pointer-events-none opacity-[0.1] z-0 px-4">
          {[100, 75, 50, 25, 0].map((tick) => (
            <div key={tick} className="w-full h-px bg-brand-navy border-t border-dashed border-brand-navy/50 relative">
              <span className="absolute -left-6 -top-2 text-[9px] text-text-muted font-mono">{tick}%</span>
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
                className={`text-sm md:text-xl font-black whitespace-nowrap ${index === 3 ? 'text-orange-600 scale-110 drop-shadow-sm' : 'text-text-muted'}`}
              >
                {item.value}%
              </motion.div>
            </div>

            {/* Bar with Tooltip */}
            <motion.div
              initial={{ height: "1%" }}
              whileInView={{ height: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full max-w-[40px] md:max-w-[60px] rounded-t-lg relative flex-shrink-0 origin-bottom overflow-visible ${index === 3 ? 'bg-gradient-to-t from-orange-600 to-orange-400 shadow-xl shadow-orange-500/20' : 'bg-gradient-to-t from-slate-400 to-slate-300 opacity-60'}`}
            >
              {/* Tooltip */}
              {/* Dynamic Tooltip Alignment */}
              <div className={`absolute -top-2 mb-3 w-40 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[100] pointer-events-none 
                    ${index === 0 ? 'left-0 translate-x-0 origin-bottom-left' :
                  index === 3 ? 'right-0 translate-x-0 origin-bottom-right' :
                    'left-1/2 -translate-x-1/2'}`}>
                <div className="bg-brand-navy p-2 rounded-lg text-[10px] text-white leading-tight shadow-xl border border-white/10 text-center relative">
                  {item.info}
                  {/* Arrow adjustment based on position */}
                  <div className={`absolute bottom-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-navy
                        ${index === 0 ? 'left-4' :
                      index === 3 ? 'right-4' :
                        'left-1/2 -translate-x-1/2 translate-y-full'}`}></div>
                </div>
              </div>

              {/* Glossy Effect on Bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 opacity-50 rounded-t-lg overflow-hidden" />

              {/* Pulse effect for 99% bar */}
              {index === 3 && (
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-x-0 -top-1 h-3 bg-orange-400 blur-md rounded-full pointer-events-none"
                />
              )}
            </motion.div>

            {/* X-Axis Label */}
            <div className="mt-3 min-h-[40px] flex flex-col items-center justify-start text-center">
              <span className={`text-[10px] md:text-xs font-bold leading-tight block ${index === 3 ? 'text-brand-navy' : 'text-text-secondary'}`}>
                {item.label}
              </span>
              {item.subLabel && (
                <span className="text-[9px] md:text-[10px] text-text-muted leading-tight block">
                  {item.subLabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 p-3 bg-blue-50/50 rounded-lg border border-blue-100 backdrop-blur-sm text-center mx-auto max-w-sm">
        <p className="text-[10px] md:text-xs text-text-secondary leading-relaxed">
          <span className="text-orange-600 font-bold block mb-1">NNU: The Clinical Gold Standard</span>
          Virtually zero metabolic waste (Ammonia) means zero stress on kidneys.
        </p>
      </div>
    </div>
  );
};