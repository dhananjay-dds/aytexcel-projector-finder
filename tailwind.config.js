/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    400: '#D4AF37', // Standard Gold
                    500: '#C5A028',
                    600: '#B08D20',
                },
                aytexcel: {
                    blue: '#1c64f2', // Approximated 'Price Match' or 'Shop Now' blue
                    text: '#1f2937', // Dark Gray/Black for text
                    bg: '#ffffff',   // Clean White background
                    purple: '#6b21a8' // Deep purple for accents
                },
                dark: {
                    900: '#0A0A0A', // Deep Black
                    800: '#121212', // Off Black
                    700: '#1E1E1E', // Dark Gray
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Fallback to system sans if Inter not loaded
                serif: ['Playfair Display', 'serif'], // For headers if we add it
            }
        },
    },
    plugins: [],
}
