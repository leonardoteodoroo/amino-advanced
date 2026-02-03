import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, animate, MotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Quote, MoveRight } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
    {
        id: 1,
        name: "Jacqui",
        age: 67,
        quote: "Muscles are finally waking up",
        detail: "It feels like my muscles are finally waking up. My workouts improved and recovery became much faster after just two months.",
        rating: 5,
        image: "/images/reviews/jacqui.webp"
    },
    {
        id: 2,
        name: "Carolyn H.",
        age: 72,
        quote: "I feel more stable",
        detail: "I feel more stable on long walks. After three months, my joints felt less sore and my stability increased significantly.",
        rating: 5,
        image: "/images/reviews/carolyn.webp"
    },
    {
        id: 3,
        name: "Dr. Simmons",
        age: 55,
        quote: "Doctor noticed the difference",
        detail: "My doctor noticed the difference. The improvement in muscle tone and general vitality really surprised him during my last check-up.",
        rating: 5,
        image: "/images/reviews/dr-simmons.webp"
    },
    {
        id: 4,
        name: "Martha S.",
        age: 65,
        quote: "Playing with grandkids again",
        detail: "I used to sit and watch my grandkids play because I couldn't get back up. Now I'm on the floor building forts and chasing them around the yard.",
        rating: 5,
        image: "/images/reviews/martha.webp"
    },
    {
        id: 5,
        name: "Tom W.",
        age: 74,
        quote: "Stairs aren't scary anymore",
        detail: "I moved my bedroom downstairs because the steps were torture on my thighs. Two months in, I'm back up in the master bedroom and climbing without gripping the rail.",
        rating: 5,
        image: "/images/reviews/tom.webp"
    },
    {
        id: 6,
        name: "Linda K.",
        age: 62,
        quote: "Back to my garden",
        detail: "My garden was neglected because 20 minutes of weeding left me exhausted for days. Last weekend I spent 4 hours expanding my flower beds with zero crash.",
        rating: 5,
        image: "/images/reviews/linda.webp"
    },
    {
        id: 7,
        name: "Robert D.",
        age: 70,
        quote: "Best golf season in years",
        detail: "My swing speed was dropping every year. My buddies asked what I changed because I'm adding 20 yards to my drive and finishing 18 holes feeling fresh.",
        rating: 5,
        image: "/images/reviews/robert.webp"
    },
    {
        id: 8,
        name: "Patricia M.",
        age: 71,
        quote: "Walked all over Italy",
        detail: "I almost cancelled my dream trip to Rome because I feared the walking tours. I ended up walking 12,000 steps a day and kept up with the group perfectly.",
        rating: 5,
        image: "/images/reviews/patricia.webp"
    },
    {
        id: 9,
        name: "Michael R.",
        age: 66,
        quote: "Carrying groceries is easy",
        detail: "It sounds small, but having to make three trips for light groceries was humiliating. Now I carry the heavy bags in one go like I did ten years ago.",
        rating: 5,
        image: "/images/reviews/michael.webp"
    },
    {
        id: 10,
        name: "Susan E.",
        age: 59,
        quote: "Thinking clearer too",
        detail: "I bought it for my legs, but the brain fog lifted too. I have the sustained mental and physical energy to finish my work day without a nap.",
        rating: 5,
        image: "/images/reviews/susan.webp"
    }
];

// --- Standard American Testimonial Card ---
const TestimonialCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className="w-full h-full bg-white flex flex-col p-5 md:p-6 font-sans relative overflow-hidden select-none pointer-events-none">
            {/* Decorative Quote Icon background */}
            <Quote className="absolute top-4 right-4 text-indigo-100/50 rotate-180" size={80} strokeWidth={1} />

            {/* Header: Avatar + Name/Age */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
                {review.image ? (
                    <img
                        src={review.image}
                        alt={`Portrait of ${review.name} - ${review.quote}`}
                        className="w-12 h-12 rounded-full object-cover border border-purple-200 shadow-sm shrink-0 bg-gray-200"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-700 font-bold text-base border border-purple-200 shadow-sm shrink-0">
                        {review.name.charAt(0)}
                    </div>
                )}
                <div>
                    <div className="flex items-baseline gap-2">
                        <h4 className="font-bold text-gray-900 leading-none text-base truncate max-w-[120px]">{review.name}</h4>
                        <span className="text-gray-400 text-sm font-medium whitespace-nowrap">{review.age}y</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                        <CheckCircle2 size={12} className="text-green-500 fill-white" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Verified Buyer</span>
                    </div>
                </div>
            </div>

            {/* Stars */}
            <div className="flex text-yellow-400 mb-3 relative z-10">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="mr-0.5" strokeWidth={0} />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight tracking-tight line-clamp-2">
                    "{review.quote}"
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium line-clamp-4">
                    {review.detail}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 opacity-70">
                    <img
                        src="https://flagcdn.com/w20/us.png"
                        alt="USA"
                        className="w-4 rounded-[2px]"
                        loading="lazy"
                        decoding="async"
                    />
                    <span className="text-[10px] font-semibold text-gray-400">USA MADE</span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Recently posted</span>
            </div>
        </div>
    );
};

// --- Dimensions & Config ---
const DRAG_BUFFER = 10;
const VELOCITY_THRESHOLD = 50;

export const Carousel3D: React.FC = () => {
    // Responsive Gap Calculation
    const [gap, setGap] = useState(290);

    useEffect(() => {
        const handleResize = () => {
            // On very small screens, use smaller gap to prevent cutoff
            setGap(window.innerWidth < 768 ? 250 : 290);
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [activeIndex, setActiveIndex] = useState(1);
    const x = useMotionValue(-gap); // Start at index 1
    const containerRef = useRef<HTMLDivElement>(null);

    const prevGap = useRef(gap);

    // React to gap changes to update position immediately without breaking animations
    useEffect(() => {
        if (prevGap.current !== gap) {
            x.stop(); // Stop any ongoing animation before snapping
            x.set(-activeIndex * gap);
            prevGap.current = gap;
        }
    }, [gap, activeIndex, x]);

    const jumpTo = (idx: number) => {
        setActiveIndex(idx);
        animate(x, -idx * gap, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        // Swipe Logic
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            jumpTo((activeIndex + 1) % reviews.length);
        }
        else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            jumpTo((activeIndex - 1 + reviews.length) % reviews.length);
        } else {
            jumpTo(activeIndex);
        }
    };

    const handlePan = (event: Event, info: PanInfo) => {
        // 1:1 Movement: Add the delta (change in pixels) to the current x value
        x.set(x.get() + info.delta.x);
    };

    const nextSlide = () => {
        jumpTo((activeIndex + 1) % reviews.length);
    };

    const prevSlide = () => {
        jumpTo((activeIndex - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="py-8 px-4 max-w-7xl mx-auto overflow-hidden md:overflow-visible">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content */}
                <div className="text-left space-y-6 relative z-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy leading-tight">
                        See what happens when the body finally wakes up.
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-md">
                        These aren't just reviews. These are people reclaiming their independence, strength, and confidence after years of feeling "slowed down".
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-3">
                            {["/images/reviews/jacqui.webp", "/images/reviews/carolyn.webp", "/images/reviews/dr-simmons.webp"].map((src, i) => (
                                <img key={i} src={src} className="w-10 h-10 rounded-full border-2 border-white object-cover bg-gray-200" alt="Verified User" />
                            ))}
                        </div>
                        <div className="text-sm text-text-muted">
                            <span className="text-brand-navy font-bold">12,400+</span> Active Users
                        </div>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center bg-white hover:bg-blue-50 hover:border-blue-200 transition-all group shadow-sm"
                        >
                            <ChevronLeft className="text-text-secondary group-hover:text-brand-blue" size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-border-subtle flex items-center justify-center bg-white hover:bg-blue-50 hover:border-blue-200 transition-all group shadow-sm"
                        >
                            <ChevronRight className="text-text-secondary group-hover:text-brand-blue" size={24} />
                        </button>
                    </div>
                </div>

                {/* Right Column: Carousel */}
                <div className="relative flex flex-col items-center justify-center">
                    {/* Perspective Container */}
                    <div
                        ref={containerRef}
                        className="relative h-[400px] md:h-[420px] w-full flex items-center justify-center touch-pan-y select-none"
                        style={{ perspective: 1000 }}
                    >
                        {/* 
                        Static Ghost Surface (The Fix): 
                        Instead of drag="x" which moves this div, we use onPan.
                        This div stays fixed (inset-0) so the finger never leaves the hit area.
                    */}
                        <motion.div
                            className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-pan-y"
                            onPan={handlePan}
                            onPanEnd={handleDragEnd}
                            whileTap={{ cursor: "grabbing" }}
                        />

                        {/* The Cards */}
                        {reviews.map((review, i) => (
                            <CarouselCard
                                key={review.id}
                                index={i}
                                review={review}
                                x={x}
                                gap={gap}
                            />
                        ))}
                    </div>

                    {/* Mobile Controls & Hint */}
                    <div className="flex md:hidden flex-col items-center mt-2 gap-4 relative z-30 pointer-events-none">
                        <div className="flex gap-8 pointer-events-auto">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-md transition-all hover:bg-white shadow-md"
                            >
                                <ChevronLeft className="text-brand-navy" size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center bg-white/90 backdrop-blur-md transition-all hover:bg-white shadow-md"
                            >
                                <ChevronRight className="text-brand-navy" size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 opacity-80">
                            <span className="text-brand-blue font-serif italic text-xs tracking-wide">Swipe to read</span>
                            <MoveRight className="text-brand-blue animate-pulse" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CarouselCardProps {
    index: number;
    review: Review;
    x: MotionValue<number>;
    gap: number;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ index, review, x, gap }) => {
    // Explicit typing for the transform callback to avoid TS errors
    const position = useTransform(x, (currentX: number) => currentX + index * gap);

    // Optimized rotation and scale
    const rotateY = useTransform(position, [-gap, 0, gap], [25, 0, -25]);
    // More aggressive scaling on mobile to ensure neighbor cards are visible but non-intrusive
    const scale = useTransform(position, [-gap, 0, gap], [0.85, 1, 0.85]);
    const opacity = useTransform(position, [-gap * 1.5, 0, gap * 1.5], [0.4, 1, 0.4]);
    const blur = useTransform(position, [-gap, 0, gap], [2, 0, 2]);
    const z = useTransform(position, (pos) => -Math.abs(pos) * 1.2);
    const translateX = useTransform(position, (pos) => pos * 0.6);

    // Performance Optimization: Hide cards that are far off-screen
    const display = useTransform(position, (pos: number) => Math.abs(pos) >= gap * 2.2 ? "none" : "block");

    return (
        <motion.div
            className="absolute w-[280px] h-[360px] md:h-[380px] max-w-[85vw] rounded-[24px] pointer-events-none will-change-transform"
            style={{
                x: translateX,
                rotateY,
                scale,
                opacity,
                z,
                display,
                filter: `blur(${blur})`,
                zIndex: useTransform(position, (pos) => 100 - Math.round(Math.abs(pos))),
            }}
        >
            {/* Inner Card Wrapper */}
            <div className="w-full h-full rounded-[24px] overflow-hidden shadow-2xl bg-white border border-gray-200 relative transform-gpu">
                {/* Subtle Gloss */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 via-transparent to-black/5 pointer-events-none z-50 rounded-[24px]" />
                <TestimonialCard review={review} />
            </div>
        </motion.div>
    );
};