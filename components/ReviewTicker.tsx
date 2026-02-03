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
        text: "It feels like my muscles are waking up and working. My digestion improved and I have more energy.",
        highlight: "Muscles Waking Up",
        image: "/images/reviews/jacqui.webp"
    },
    {
        name: "Robert M.",
        age: 71,
        text: "Started feeling much more active and awake in the mornings. A general state of well-being returned.",
        highlight: "Active & Awake",
        image: "/images/reviews/david.webp"
    },
    {
        name: "Edmund R.",
        age: 68,
        text: "At age 68 I am developing biceps and forearms for the first time. I look forward to lifting weights now.",
        highlight: "Developing Muscle",
        image: "/images/reviews/james.webp"
    },
    {
        name: "Kim G.",
        age: 49,
        text: "People tell me how fit I look and I genuinely believe this supplement has so much to do with it.",
        highlight: "Looking Fit",
        image: "/images/reviews/sarah.webp"
    },
    {
        name: "Bobbie H.",
        age: 74,
        text: "I have had both hips replaced. Since taking the Aminos, the uncomfortable popping and clicking stopped.",
        highlight: "Joint Relief",
        image: "/images/reviews/margaret.webp"
    },
    {
        name: "Brad A.",
        age: 63,
        text: "I feel more energy, better workouts, and better recovery. I'm not sore during the day or at night anymore.",
        highlight: "Better Recovery",
        image: "/images/reviews/carolyn.webp"
    },
    {
        name: "Patrick V.",
        age: 75,
        text: "I take five pills every day before the gym. My recuperation after heavy sets is unbelievably quick.",
        highlight: "Quick Recuperation",
        image: "/images/reviews/dr-simmons.webp"
    }
];

// Triplicate the array to ensure smooth infinite looping even on large screens
const tickerReviews = [...reviews, ...reviews, ...reviews];

const AVATAR_COLORS = ['bg-gray-300', 'bg-gray-400', 'bg-gray-500'];

export const ReviewTicker: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Motion value for the x position
    const x = useMotionValue(0);

    // Speed of auto-scroll (pixels per frame)
    const baseVelocity = -0.5;

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
                    <div className="flex -space-x-2">
                        {["/images/reviews/jacqui.webp", "/images/reviews/david.webp", "/images/reviews/sarah.webp"].map((src, i) => (
                            <img key={i} src={src} className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Verified User" />
                        ))}
                    </div>
                    <p className="text-sm text-text-secondary">Trusted by <span className="text-text-primary font-bold">12,400+</span> active seniors</p>
                </div>
                <div className="flex items-center gap-2 text-brand-navy text-xs font-bold bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200">
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
                        <div key={i} className="w-[300px] md:w-[320px] flex-shrink-0 p-5 rounded-xl bg-surface-card border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative group select-none">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-center justify-between mb-3">
                                <div className="flex text-yellow-500 gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <span className="text-[10px] text-brand-navy font-medium px-2 py-0.5 bg-blue-50 rounded border border-blue-100">
                                    {review.highlight}
                                </span>
                            </div>

                            <p className="text-text-secondary text-sm leading-relaxed mb-4 min-h-[60px] pointer-events-none">"{review.text}"</p>

                            <div className="flex items-center gap-3 pt-3 border-t border-border-subtle pointer-events-none">
                                <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full object-cover border border-border-subtle" />
                                <div>
                                    <p className="text-text-primary font-bold text-xs">{review.name}</p>
                                    <p className="text-[10px] text-text-muted">{review.age} years old • Verified Buyer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Fade Edges - Light Gradient */}
                <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-surface-section to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-surface-section to-transparent z-10 pointer-events-none" />
            </div>
        </div>
    );
};