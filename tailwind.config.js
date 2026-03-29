import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx}',
        './resources/js/Components/**/*.{js,jsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            // ✅ COLORS YAHAN HONE CHAHIYE (INSIDE extend)
            colors: {
                border: "oklch(var(--border))",
                input: "oklch(var(--input))",
                ring: "oklch(var(--ring))",
                background: "oklch(var(--background))",
                foreground: "oklch(var(--foreground))",

                primary: {
                    DEFAULT: "oklch(var(--primary))",
                    foreground: "oklch(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "oklch(var(--secondary))",
                    foreground: "oklch(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "oklch(var(--destructive))",
                },
                muted: {
                    DEFAULT: "oklch(var(--muted))",
                    foreground: "oklch(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "oklch(var(--accent))",
                    foreground: "oklch(var(--accent-foreground))",
                },
            },
        },
    },

    plugins: [forms],
};