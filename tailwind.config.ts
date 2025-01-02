import type { Config } from "tailwindcss";

export default {
   content: [
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
            purple: "#8774E1",
         },
         backgroundColor: {
            purple: "#8774E1",
         },
         fontFamily: {
            roboto: ["Roboto", "sans-serif"],
         },
      },
   },
   plugins: [],
} satisfies Config;
