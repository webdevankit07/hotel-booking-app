/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        container: {
            padding: {
                sm: '2rem',
                lg: '5rem',
                xl: '10rem',
            },
        },
    },
    plugins: [],
};
