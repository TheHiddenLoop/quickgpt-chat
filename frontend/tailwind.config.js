/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",       
        primaryBg: "var(--primary-bg)",
        
        secondary: "var(--secondary-color)",  
        secondaryBg: "var(--secondary-bg)",
        
        accent: "var(--accent-color)",         
        accentBg: "var(--accent-bg)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",

        border: "var(--border-color)",
        borderDark: "var(--border-dark)",

        success: "var(--success-color)",  
        successBg: "var(--success-bg)",
        
        error: "var(--error-color)",    
        errorBg: "var(--error-bg)",
        
        warning: "var(--warning-color)",   
        warningBg: "var(--warning-bg)",
        
        info: "var(--info-color)",         
        infoBg: "var(--info-bg)",
      },
      transitionProperty: {
        skin: "all", 
      },
      fontFamily: {
        robot: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};