/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}", // Added based on file structure (components at root)
        "./*.{js,ts,jsx,tsx}", // For App.tsx at root
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
                brand: {
                    navy: '#1e3a8a', // Blue 900
                    red: '#dc2626',  // Red 600
                    blue: '#2563eb', // Blue 600
                },
                surface: {
                    page: '#f8fafc', // Slate 50
                    card: '#ffffff', // White
                    section: '#e2e8f0', // Slate 200 (Matches DESIGN_SYSTEM)
                    highlight: '#eff6ff', // Blue 50
                },
                text: {
                    primary: '#1e293b', // Slate 800 (Matches DESIGN_SYSTEM)
                    secondary: '#475569', // Slate 600 (Matches DESIGN_SYSTEM)
                    muted: '#94a3b8', // Slate 400
                    inverted: '#ffffff',
                },
                border: {
                    subtle: '#e2e8f0', // Slate 200
                    strong: '#cbd5e1', // Slate 300
                }
            }
        },
    },
    plugins: [],
}
