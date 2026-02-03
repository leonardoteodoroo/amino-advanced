import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import { GlassCard } from './UI';

interface PricingCardProps {
    title: string;
    price: string;
    perBottle: string;
    savings?: string;
    features: string[];
    link: string;
    image: string;
    isPopular?: boolean;
    isBestValue?: boolean;
    delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    perBottle,
    savings,
    features,
    link,
    image,
    isPopular,
    isBestValue,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className={`relative h-full ${isPopular || isBestValue ? 'z-10' : 'z-0'}`}
        >
            {isBestValue && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20">
                    Best Value - Save $40.20
                </div>
            )}
            {isPopular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20">
                    Most Popular
                </div>
            )}

            <GlassCard
                className={`h-full flex flex-col p-6 relative overflow-hidden ${isBestValue
                    ? 'border-red-500/30 bg-red-900/10'
                    : isPopular
                        ? 'border-purple-500/30 bg-purple-900/10'
                        : 'border-white/10'
                    }`}
            >
                {/* Background Glow */}
                <div className={`absolute top-0 left-0 w-full h-1/2 opacity-20 bg-gradient-to-b ${isBestValue ? 'from-red-500/20' : isPopular ? 'from-purple-500/20' : 'from-gray-500/10'
                    } to-transparent pointer-events-none`} />

                <div className="text-center mb-6 relative z-10">
                    {/* Product Image */}
                    <div className="relative w-full h-48 mb-6 flex items-center justify-center">
                        <img
                            src={image}
                            alt={`${title} Bottles`}
                            className="h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${isBestValue ? 'text-red-300' : isPopular ? 'text-purple-300' : 'text-white'
                        }`}>
                        {title}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-4xl font-serif font-bold text-white">{perBottle}</span>
                        <span className="text-sm text-gray-400">/bottle</span>
                    </div>
                    <p className="text-sm text-gray-400">Total: {price}</p>
                    {savings && (
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-green-400 font-semibold">
                            {savings}
                        </div>
                    )}
                </div>

                <div className="space-y-3 mb-8 flex-grow relative z-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className={`p-1 rounded-full shrink-0 ${isBestValue ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                }`}>
                                <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-gray-300 leading-snug">{feature}</span>
                        </div>
                    ))}
                </div>

                <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${isBestValue
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-900/30'
                        : isPopular
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                        }`}
                >
                    Add To Cart <ArrowRight size={16} />
                </motion.a>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                    <ShieldCheck size={12} /> 90-Day Money-Back Guarantee
                </div>
            </GlassCard>
        </motion.div>
    );
}

export const PricingOptions: React.FC = () => {
    return (
        <section className="py-20 relative z-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Choose Your Supply</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Select the package that fits your goals. Most new customers start with the 3-month supply to fully experience the muscle-waking effects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch pt-8">
                    {/* STARTER */}
                    <PricingCard
                        title="Starter Option"
                        perBottle="$39.95"
                        price="$39.95"
                        image="/images/product/1bottle.webp"
                        features={[
                            "1 Month Supply",
                            "Digital Quick-Start Guide",
                            "90-Day Money-Back Guarantee"
                        ]}
                        link="https://www.digistore24.com/redir/472629/leonardoteodorol/"
                        delay={0.1}
                    />

                    {/* MOST POPULAR */}
                    <PricingCard
                        title="Most Popular"
                        perBottle="$35.95"
                        price="$107.85"
                        savings="Save $12.00"
                        isPopular
                        image="/images/product/3bottle.webp"
                        features={[
                            "3 Month Supply",
                            "Significant Savings",
                            "Free Shipping",
                            "Digital Quick-Start Guide",
                            "90-Day Money-Back Guarantee"
                        ]}
                        link="https://www.digistore24.com/redir/472942/leonardoteodorol/"
                        delay={0.2}
                    />

                    {/* BEST VALUE */}
                    <PricingCard
                        title="Greatest Savings"
                        perBottle="$33.25"
                        price="$199.50"
                        savings="Save $40.20 + Free Shipping"
                        isBestValue
                        image="/images/product/6bottle.webp"
                        features={[
                            "6 Month Supply",
                            "Maximum Savings per Bottle",
                            "Free Shipping",
                            "Priority Handling",
                            "Digital Quick-Start Guide",
                            "90-Day Money-Back Guarantee"
                        ]}
                        link="https://www.digistore24.com/redir/472943/leonardoteodorol/"
                        delay={0.3}
                    />
                </div>

                <div className="mt-12 max-w-2xl mx-auto bg-blue-900/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-4 backdrop-blur-sm">
                    <div className="bg-blue-500/20 p-2 rounded-full shrink-0 text-blue-400">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="text-blue-200 font-bold text-sm uppercase tracking-wide mb-1">Doctor's Guarantee</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            "If you don't feel a distinct difference in your energy and muscle firmness within 90 days, I don't want your money. Return the empty bottles for a full refund." — Dr. Frank Shallenberger
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
