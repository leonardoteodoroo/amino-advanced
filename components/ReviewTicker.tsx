import React, { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useAnimationFrame
} from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';

const reviews = [
    {
        name: "Jacqui",
        age: 67,
        text: "It feels like my muscles are finally waking up. My workouts improved and recovery became much faster after just two months.",
        highlight: "Muscles waking up",
        image: "/images/reviews/jacqui.webp"
    },
    {
        name: "Carolyn H.",
        age: 72,
        text: "I feel more stable on long walks. After three months, my joints felt less sore and my stability increased significantly.",
        highlight: "More stable",
        image: "/images/reviews/carolyn.webp"
    },
    {
        name: "Dr. Simmons",
        age: 55,
        text: "My doctor noticed the difference. Many users report their doctors are surprised by the improvement in muscle tone and general vitality.",
        highlight: "Doctor impressed",
        image: "/images/reviews/dr-simmons.webp"
    },
    {
        name: "James P.",
        age: 69,
        text: "My grip strength was fading—jars were impossible to open. Now I'm doing it for my wife again effortlessly.",
        highlight: "Grip strength back",
        image: "/images/reviews/james.webp"
    },
    {
        name: "David B.",
        age: 71,
        text: "The 'heavy leg' feeling is gone. I walk my dog every morning without needing to stop for breaks anymore.",
        highlight: "No more heavy legs",
        image: "/images/reviews/david.webp"
    },
    {
        name: "Margaret T.",
        age: 64,
        text: "I was buying expensive whey protein for years with zero results. This formula changed my leg strength in just weeks.",
        highlight: "Leg strength returned",
        image: "/images/reviews/margaret.webp"
    },
    {
        name: "Sarah L.",
        age: 58,
        text: "I thought my weakness was just 'getting old'. Turns out my muscles were just hungry. Amazing difference.",
        highlight: "Not just 'old age'",
        image: "/images/reviews/sarah.webp"
    }
];

// Triplicate the array to ensure smooth infinite looping even on large screens
const tickerReviews = [...reviews, ...reviews, ...reviews];

export const ReviewTicker: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Motion value for the x position
    const x = useMotionValue(0);

    // Speed of auto-scroll (pixels per frame) - Increased for better energy
    const baseVelocity = -1.5;

    useEffect(() => {
        if (containerRef.current) {
            // Measure one set of reviews (approx 1/3 of total rendered width)
            // We divide by 3 because we tripled the data
            const totalWidth = containerRef.current.scrollWidth;
            if (totalWidth > 0) {
                setContentWidth(totalWidth / 3);
            }
        }
    }, []);

    // The animation loop
    useAnimationFrame((t, delta) => {
        if (!contentWidth) return;

        let moveBy = baseVelocity * (delta / 16); // Normalize based on frame rate

        // If user is interacting, stop auto-movement
        if (isHovered) {
            moveBy = 0;
        }

        let currentX = x.get();
        let newX = currentX + moveBy;

        // Loop logic: If we've scrolled past the first set, reset to 0 (visually identical point)
        // If we dragged too far right (positive), snap back to the end of the previous set
        if (newX <= -contentWidth) {
            newX += contentWidth;
        } else if (newX > 0) {
            newX -= contentWidth;
        }

        x.set(newX);
    });

    return (
        <div className="w-full py-10 overflow-hidden bg-surface-section border-y border-border-subtle relative z-20">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                        {[reviews[0], reviews[1], reviews[2]].map((r, i) => (
                            <img
                                key={i}
                                src={r.image}
                                alt="User"
                                className="w-8 h-8 rounded-full border-2 border-surface-card object-cover bg-surface-section"
                            />
                        ))}
                    </div>
                    <p className="text-sm text-text-secondary">Trusted by <span className="text-brand-navy font-bold">12,400+</span> active seniors</p>
                </div>
                <div className="flex items-center gap-2 text-green-700 text-xs font-bold bg-green-100 px-3 py-1.5 rounded-full border border-green-200">
                    <ShieldCheck size={14} /> 100% Verified Reviews
                </div>
            </div>

            {/* Infinite Marquee Container */}
            <div
                className="relative w-full cursor-grab active:cursor-grabbing touch-pan-y"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
            >
                <motion.div
                    ref={containerRef}
                    className="flex gap-5 pl-5 w-max will-change-transform"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -10000, right: 10000 }} // Allow free dragging
                    onDragStart={() => setIsHovered(true)}
                    onDragEnd={() => setIsHovered(false)}
                    dragElastic={0.1}
                    dragMomentum={false} // We handle momentum/looping manually via animation frame
                >
                    {tickerReviews.map((review, i) => (
                        <div key={i} className="w-[300px] md:w-[320px] flex-shrink-0 p-5 rounded-xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative group select-none">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center justify-between mb-3">
                                <div className="flex text-yellow-400 gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <span className="text-xs text-brand-blue font-medium px-2 py-0.5 bg-blue-50 rounded border border-blue-100">
                                    {review.highlight}
                                </span>
                            </div>

                            <p className="text-text-secondary text-sm leading-relaxed mb-4 min-h-[60px] pointer-events-none">"{review.text}"</p>

                            <div className="flex items-center gap-3 pt-3 border-t border-border-subtle pointer-events-none">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover border border-border-subtle bg-surface-section"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="text-brand-navy font-bold text-xs">{review.name}</p>
                                    <p className="text-xs text-text-muted">{review.age} years old • Verified Buyer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Drag Hint for Mobile */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40 md:hidden pointer-events-none">
                    <span className="text-[10px] uppercase tracking-tighter font-bold text-brand-navy">Swipe to browse</span>
                    <div className="flex gap-1">
                        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1 rounded-full bg-brand-navy" />
                        <div className="w-1 h-1 rounded-full bg-brand-navy opacity-50" />
                        <div className="w-1 h-1 rounded-full bg-brand-navy opacity-25" />
                    </div>
                </div>

                {/* Fade Edges - Light Theme */}
                <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-surface-section to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-surface-section to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
};