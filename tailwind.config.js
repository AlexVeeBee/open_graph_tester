/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.html',
        './src/**/*.vue',
    ],        
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },

        screens: {
            xs: "450px",
            // => @media (min-width: 450px) { ... }
      
            sm: "575px",
            // => @media (min-width: 576px) { ... }
      
            md: "768px",
            // => @media (min-width: 768px) { ... }
      
            lg: "992px",
            // => @media (min-width: 992px) { ... }
      
            xl: "1200px",
            // => @media (min-width: 1200px) { ... }
      
            "2xl": "1400px",
            // => @media (min-width: 1400px) { ... }
        },

        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF6363',
                    100: '#f4f0ff',
                    200: '#d9c8ff',
                    300: '#b7a7ff',
                    400: '#8366ff',
                    500: '#5f3dc4',
                    600: '#4e2db4',
                    700: '#3e1f9d',
                    800: '#322175',
                    900: '#291754',
                },
            }
        }
    }
}