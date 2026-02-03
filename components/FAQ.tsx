import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronDown } from 'lucide-react';
import { GlassCard, BlurText } from './UI';

const faqData = [
  {
    question: "I already take Whey Protein. Why switch to Advanced Amino?",
    answer: "Standard Whey protein creates an \"83% Waste Trap\". Your body converts the majority of it into sugar or metabolic waste that stresses your kidneys. Advanced Amino offers 99% utilization, meaning virtually every gram goes directly to muscle repair without the bloating or waste.",
    isOpenDefault: true
  },
  {
    question: "I'm over 70. Is it too late for this to work?",
    answer: "Absolutely not. This formula was specifically engineered to reverse age-related muscle decline (sarcopenia). Users as old as 72 report feeling their muscles \"wake up\" and regain firmness within weeks. It's not about being an athlete; it's about reclaiming your independence.",
  },
  {
    question: "I'm Vegan. Is this better than plant protein?",
    answer: "Most plant proteins are incomplete and hard to digest. Our formula is 100% Vegan, Non-GMO, and provides the 8 essential amino acids in the exact mathematical balance your body requires—without the digestive distress often caused by pea or soy powders.",
  },
  {
    question: "Will this cause bloating or stomach upset?",
    answer: "No. Unlike heavy powders that sit in your gut, Advanced Amino is \"pre-digested\". It bypasses the difficult digestive processes and enters your bloodstream in just 23 minutes. It is incredibly gentle, even for the most sensitive stomachs.",
  },
  {
    question: "I can't train hard every day. Will I still see results?",
    answer: "Yes. While movement helps, Advanced Amino focuses on preserving your \"functional reserve\". It provides the necessary building blocks to maintain strength for daily activities—like climbing stairs or carrying groceries—even without an intense gym routine.",
  },
  {
    question: "How soon will I feel the difference?",
    answer: "Many users report a noticeable improvement in energy levels and recovery speed within just 15 to 30 days of consistent use. The effect is cumulative: the longer you use it, the more \"nourished\" and responsive your muscles become.",
  },
  {
    question: "What if it doesn't work for my body?",
    answer: "We take all the risk. You have a full 90-day Satisfaction Guarantee. If you don't feel stronger, more stable, and more energetic, simply return the bottles (even if they are empty) for a full refund. No questions asked.",
  }
];

export const FAQ: React.FC = () => {
  // Default to index 0 (first item) being open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
         <span className="text-purple-400 font-semibold tracking-wider text-sm uppercase mb-2 block">Common Questions</span>
         <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Stop Guessing. <br /> Start Absorbing.
         </h2>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem 
            key={index} 
            item={item} 
            isOpen={openIndex === index} 
            onClick={() => toggleFAQ(index)} 
          />
        ))}
      </div>
    </div>
  );
};

interface AccordionItemProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className="relative z-10"
    >
      {/* 
         ACCESSIBILITY & UX FOR SENIORS:
         1. The button covers the entire card area.
         2. Large padding for easier clicking.
         3. High contrast text.
      */}
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <GlassCard 
          className={`transition-all duration-300 ${isOpen ? 'bg-white/10 border-purple-500/50' : 'hover:bg-white/10'}`}
        >
          <div className="p-6 md:p-8 flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className={`text-lg md:text-xl font-bold leading-tight transition-colors ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                {item.question}
              </h3>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-300 text-base md:text-lg leading-relaxed font-light border-t border-white/10 pt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Icon Wrapper - Big & Clear */}
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-purple-600 border-purple-400 text-white rotate-180' : 'bg-white/5 border-white/20 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
               {isOpen ? <Minus size={24} /> : <Plus size={24} />}
            </div>
          </div>
        </GlassCard>
      </button>
    </motion.div>
  );
};
