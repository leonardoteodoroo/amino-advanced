import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight, Star, Leaf, Award, Factory } from 'lucide-react';
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
    imgWidth?: number;
    imgHeight?: number;
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
    delay = 0,
    imgWidth,
    imgHeight
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
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] bg-gradient-to-br from-red-600 via-red-700 to-orange-600 text-white shadow-2xl z-20 flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 border-white/30 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                        <ShieldCheck size={14} className="text-white shrink-0" />
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-center">Medical Recommendation</span>
                    </div>
                    <span className="text-[11px] md:text-xs font-bold bg-white/20 px-3 py-0.5 rounded-full border border-white/10 whitespace-nowrap">
                        Save $40.20 + Free Shipping
                    </span>
                </div>
            )}
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max max-w-[95vw] px-4 py-1 bg-brand-navy rounded-full text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap">
                    Most Popular
                </div>
            )}

            <GlassCard
                className={`h-full flex flex-col p-6 relative overflow-hidden transition-all duration-300 ${isBestValue
                    ? 'border-2 border-red-100 bg-white shadow-xl shadow-red-900/5'
                    : isPopular
                        ? 'border-2 border-brand-navy bg-white shadow-xl shadow-blue-900/10'
                        : 'border border-border-subtle bg-surface-card'
                    }`}
            >
                {/* Background Glow - Subtle Light Theme */}
                <div className={`absolute top-0 left-0 w-full h-1/2 opacity-30 bg-gradient-to-b ${isBestValue ? 'from-red-50/50' : isPopular ? 'from-blue-50/50' : 'from-transparent'
                    } to-transparent pointer-events-none`} />

                <div className="text-center mb-6 relative z-10">
                    {/* Product Image */}
                    <div className="relative w-full h-48 mb-6 flex items-center justify-center">
                        <img
                            src={image}
                            alt={`${title} Bottles`}
                            className="h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            width={imgWidth}
                            height={imgHeight}
                        />
                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${isBestValue ? 'text-red-700' : isPopular ? 'text-brand-navy' : 'text-text-primary'
                        }`}>
                        {title}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                        <span className="text-4xl font-serif font-bold text-brand-navy">{perBottle}</span>
                        <span className="text-sm text-text-secondary">/bottle</span>
                    </div>
                    <p className="text-sm text-text-muted">Total: {price}</p>
                    {savings && (
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs text-green-700 font-bold">
                            {savings}
                        </div>
                    )}
                </div>

                <div className="space-y-3 mb-8 flex-grow relative z-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className={`p-1 rounded-full shrink-0 ${isBestValue ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-brand-blue'
                                }`}>
                                <Check size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-text-secondary leading-snug font-medium">{feature}</span>
                        </div>
                    ))}
                </div>

                <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        // 1. Google Ads Conversion (Disparo Direto)
                        if (typeof window.gtag === 'function') {
                            window.gtag('event', 'conversion', {
                                'send_to': 'AW-16929546328/GbDSCKvnxfQbENjA0Yg_',
                                'value': 1.0,
                                'currency': 'USD',
                                'transaction_id': ''
                            });
                        }

                        // 2. Global DataLayer Push (Backup para GTM)
                        (window as any).dataLayer = (window as any).dataLayer || [];
                        (window as any).dataLayer.push({
                            event: 'add_to_cart',
                            product_name: title,
                            price: price,
                            currency: 'USD'
                        });
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${isBestValue
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-500/20'
                        : isPopular
                            ? 'bg-brand-navy hover:bg-blue-800 text-white shadow-blue-900/20'
                            : 'bg-surface-section hover:bg-white text-brand-navy border border-border-subtle'
                        }`}
                >
                    Add To Cart <ArrowRight size={16} />
                </motion.a>

                {/* Disclaimer para suavizar a transição para o site "feio" do produtor */}
                <div className="mt-3 text-[10px] text-center text-text-muted leading-tight px-2">
                    <span className="flex items-center justify-center gap-1 mb-1">
                        <Lock size={10} className="text-green-600" />
                        <span className="font-semibold text-text-secondary">Official Lab Checkout</span>
                    </span>
                    You will be redirected to Advanced Bionutritionals® secured page.
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted border-t border-border-subtle pt-3 w-full">
                    <ShieldCheck size={12} /> 90-Day Money-Back Guarantee
                </div>
            </GlassCard>
        </motion.div>
    );
}

// Add typing for gtag to avoid TS errors
declare global {
    interface Window {
        gtag: (command: string, action: string, params?: any) => void;
    }
}

export const PricingOptions: React.FC = () => {
    return (
        <section className="py-20 relative z-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mb-4">Choose Your Supply</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Select the package that fits your goals. Most new customers start with the 3-month supply to fully experience the muscle-waking effects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8 items-stretch pt-16">
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
                        link="https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=leonardoteodorol"
                        delay={0.1}
                        imgWidth={300}
                        imgHeight={327}
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
                        link="https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=leonardoteodorol"
                        delay={0.2}
                        imgWidth={300}
                        imgHeight={300}
                    />

                    {/* BEST VALUE */}
                    <PricingCard
                        title="Greatest Savings"
                        perBottle="$33.25"
                        price="$199.50"
                        savings="Save $40.20"
                        isBestValue
                        image="/images/product/6bottle.webp"
                        features={[
                            "6 Month Supply",
                            "Maximum Savings per Bottle",
                            "VIP Priority Handling",
                            "Digital Quick-Start Guide",
                            "90-Day Money-Back Guarantee"
                        ]}
                        link="https://www.advancedbionutritionals.com/DS24/Advanced-Amino/Muscle-Mass-Loss/HD.htm#aff=leonardoteodorol"
                        delay={0.3}
                        imgWidth={300}
                        imgHeight={300}
                    />
                </div>

                <div className="mt-12 max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-4 mb-12">
                    <div className="bg-blue-100 p-2 rounded-full shrink-0 text-brand-blue">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="text-brand-navy font-bold text-sm uppercase tracking-wide mb-1">Doctor's Guarantee</h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            "If you don't feel a distinct difference in your energy and muscle firmness within 90 days, I don't want your money. Return the empty bottles for a full refund." — Dr. Frank Shallenberger
                        </p>
                    </div>
                    <img
                        src="/images/dr-shallenberger.webp"
                        alt="Dr. Frank Shallenberger"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md shrink-0 self-center md:self-start bg-slate-200"
                    />
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80 border-t border-border-subtle pt-8">
                    <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm font-medium">
                        <ShieldCheck size={18} className="text-brand-navy" />
                        <span>GMP Certified</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm font-medium">
                        <Award size={18} className="text-brand-navy" />
                        <span>Doctor Formulated</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm font-medium">
                        <Leaf size={18} className="text-brand-navy" />
                        <span>Non-GMO Ingredients</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm font-medium">
                        <Factory size={18} className="text-brand-navy" />
                        <span>FDA Registered Facility</span>
                    </div>
                </div>

            </div>
        </section>
    );
};
