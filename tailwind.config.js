/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            fontSize: {
                'xs': '14px', // Boosted for seniors (was 12px)
                'sm': '16px', // Boosted for seniors (was 14px)
                'base': '18px', // Boosted for seniors (was 16px)
                'lg': '20px', // Boosted for seniors (was 18px)
                'xl': '24px',
                '2xl': '30px',
                '3xl': '36px',
                '4xl': '48px',
                '5xl': '60px',
                '6xl': '72px',
            },
            colors: {
                // Surface Tokens (bg-*)
                'page': '#f8fafc',           // Slate 50 - main background
                'card': '#ffffff',           // White - card surfaces
                'section': '#e2e8f0',        // Slate 200 - alternate sections
                'highlight': '#eff6ff',      // Blue 50 - subtle highlights
                'warning-bg': '#fff7ed',     // Orange 50 - alert backgrounds

                // Foreground/Text (text-fg-*)
                'fg-primary': '#1e293b',     // Slate 800 - main text (WCAG AAA on white)
                'fg-secondary': '#475569',   // Slate 600 - supporting text (WCAG AA)
                'fg-muted': '#64748b',       // Slate 500 - UPGRADED from 400 for 60+ readability
                'fg-inverted': '#ffffff',    // White on dark backgrounds
                'fg-brand': '#1e3a8a',       // Blue 900 - clinical authority
                'fg-accent': '#ea580c',      // Orange 600 - vitality emphasis

                // Borders (border-*)
                'border-subtle': '#e2e8f0',  // Slate 200
                'border-strong': '#cbd5e1',  // Slate 300
                'border-focus': '#3b82f6',   // Blue 500 - focus rings

                // CTA/Actions (bg-cta-* / text-cta-*)
                'cta-primary': '#1e3a8a',    // Blue 900 - trust
                'cta-accent': '#ea580c',     // Orange 600 - energy
                'cta-accent-hover': '#c2410c', // Orange 700
                'cta-disabled': '#cbd5e1',   // Slate 300

                // Feedback/Status (bg-feedback-*)
                'feedback-warning': '#f59e0b',  // Amber 500 - non-alarming alerts
                'feedback-success': '#10b981',  // Green 500 - positive
                'feedback-info': '#3b82f6',     // Blue 500 - informational

                // Interactive States (NEW - critical for accessibility)
                'focus-ring': 'rgba(59, 130, 246, 0.3)',  // Blue 500 at 30%
                'disabled-bg': '#f1f5f9',      // Slate 100
                'disabled-text': '#94a3b8',    // Slate 400

                // Legacy aliases (DEPRECATED - will be removed in Phase 3)
                // Kept for backward compatibility during migration
                'surface-page': '#f8fafc',
                'surface-card': '#ffffff',
                'surface-highlight': '#eff6ff',
                'surface-section': '#e2e8f0',
                'text-primary': '#1e293b',
                'text-secondary': '#475569',
                'text-muted': '#94a3b8',
                'text-inverted': '#ffffff',
                'text-brand': '#1e3a8a',
                'action-primary': '#1e3a8a',
                'action-strong': '#ea580c',
                'action-hover': '#c2410c',

                brand: {
                    navy: '#1e3a8a',
                    red: '#dc2626',
                    blue: '#2563eb',
                },
            },
            ringColor: {
                'focus': '#3b82f6',  // Blue 500 for focus rings
            },
            ringWidth: {
                'focus': '3px',  // Larger for 60+ visibility
            }
        },
    },
    plugins: [],
}
