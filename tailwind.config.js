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
                // Semantic Tokens (Matches DESIGN_SYSTEM)
                'surface-page': '#f8fafc', // Slate 50
                'surface-card': '#ffffff', // White
                'surface-highlight': '#eff6ff', // Blue 50
                'surface-section': '#e2e8f0', // Slate 200

                'text-primary': '#1e293b', // Slate 800
                'text-secondary': '#475569', // Slate 600
                'text-muted': '#94a3b8', // Slate 400
                'text-inverted': '#ffffff', // White
                'text-brand': '#1e3a8a', // Blue 900

                'action-primary': '#1e3a8a', // Blue 900
                'action-strong': '#dc2626', // Red 600
                'action-hover': '#1e40af', // Blue 800

                'border-subtle': '#e2e8f0', // Slate 200
                'border-strong': '#cbd5e1', // Slate 300

                // Legacy/Brand aliases for compatibility if needed, but prefer above
                brand: {
                    navy: '#1e3a8a',
                    red: '#dc2626',
                    blue: '#2563eb',
                },
            }
        },
    },
    plugins: [],
}
