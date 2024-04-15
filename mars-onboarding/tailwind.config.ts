import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        '270': '270px',
        '170':'170px',
        '22%':"22%",
        '500': '500px',
        '300': '300px',
        '90%':'90%',
        '75%':'75%',
        '70%':'70%',
      },
      width: {
        '500': '500px',
        '300': '300px',
        '45%':"45%",
        '90%':'90%',
      },
      animation: {
        // steps(n) where n is the number of chars in the homepage <h1> tag
        typewriter: 'typewriter 2s steps(52) forwards',
        caret: 'typewriter 2s steps(52) forwards, blink 1s steps(52) infinite 1s',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '49%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    }
  },
  plugins: [require('tailwindcss-animatecss')],
};
export default config;
