/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Earthy color palette
                earth: {
                    forest: '#2D5016',      // Forest Green (Primary)
                    brown: '#8B4513',       // Saddle Brown (Secondary)
                    tan: '#D2B48C',         // Tan (Accent)
                    beige: '#F5F5DC',       // Beige (Background)
                    stone: '#A8A8A8',       // Stone Gray
                    moss: '#8A9A5B',        // Moss Green
                    clay: '#B87333',        // Clay
                    sand: '#E8D5B7',        // Sand
                    bark: '#3E2723',        // Dark Bark
                    leaf: '#4A7C59'         // Leaf Green
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'earth-gradient': 'linear-gradient(135deg, #2D5016 0%, #8B4513 100%)',
                'earth-gradient-light': 'linear-gradient(135deg, #F5F5DC 0%, #E8D5B7 100%)',
                'stone-texture': 'linear-gradient(to bottom, #F5F5DC, #E8D5B7)',
            },
            boxShadow: {
                'earth': '0 4px 14px 0 rgba(45, 80, 22, 0.15)',
                'earth-lg': '0 10px 30px 0 rgba(45, 80, 22, 0.2)',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
