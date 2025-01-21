/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brydelSky: "#A8D8B9",
        brydelSkyLight: "#E6F7EB",
        brydelPurple: "#F6A5C0",
        brydelPurpleLight: "#FDECF1",
        brydelYellow: "#FFD07B",
        brydelYellowLight: "#FFF6E4",
        brydelEvent1: "#D7E8F9",
        brydelEvent2: "#FBE4C6",
        brydelEvent3: "#E3F1D7",
        brydelEvent4: "#FFE8E8",
        ciel: "#87CEEB",
      },
    },
  },
  plugins: [],
};
