import type { Config } from "tailwindcss";
import plugin from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "var(--primitives_color_gray-900)",
          secondary: {
            DEFAULT: "var(--primitives_color_gray-600)",
            white: "var(--primitives_color_gray-200)",
          },
          brand: "var(--primitives_color_gray-900)",
          invert: "var(--primitives_color_gray-50)",
        },
        surface: {
          primary: "var(--primitives_color_gray-50)",
          secondary: {
            DEFAULT: "var(--primitives_color_gray-800)",
            white: "var(--primitives_color_gray-200)",
          },
          third: "var(--primitives_color_gray-600)",
          invert: "var(--primitives_color_gray-900)",
        },
        border: {
          primary: "var(--primitives_color_gray-50)",
        },
      },
      spacing: {
        0.5: "var(--primitives_spacing-05)",
        1: "var(--primitives_spacing-1)",
        2: "var(--primitives_spacing-2)",
        3: "var(--primitives_spacing-3)",
        4: "var(--primitives_spacing-4)",
        5: "var(--primitives_spacing-5)",
        6: "var(--primitives_spacing-6)",
        7: "var(--primitives_spacing-7)",
        8: "var(--primitives_spacing-8)",
        9: "var(--primitives_spacing-9)",
        10: "var(--primitives_spacing-10)",
        11: "var(--primitives_spacing-11)",
        12: "var(--primitives_spacing-12)",
        13: "var(--primitives_spacing-13)",
        xs: "var(--primitives_spacing-05)",
        sm: "var(--primitives_spacing-1)",
        smmd: "var(--primitives_spacing-2)",
        md: "var(--primitives_spacing-3)",
        lg: "var(f--primitives_spacing-4)",
        xl: "var(--primitives_spacing-6)",
        xxl: "var(--primitives_spacing-13)",
      },
      borderRadius: {
        minimal: "var(--primitives_radius-sm)",
        rounded: "var(--primitives_radius-md)",
        full: "var(--primitives_radius-3xl)",
      },
      fontSize: {
        h1: ["5rem", { lineHeight: "1", letterSpacing: "-1.5px" }],
        h2: ["3rem", { lineHeight: "1", letterSpacing: "-1.5px" }],
        h3: ["2.5rem", { lineHeight: "1", letterSpacing: "-1.5px" }],
        h4: ["1.75rem", { lineHeight: "42px", letterSpacing: "-1.5px" }],
        h5: ["1.25rem", { lineHeight: "30px", letterSpacing: "-0.8px" }],
        h6: ["1rem", { lineHeight: "24px", letterSpacing: "0.15px" }],
        subTitle1: ["0.875rem", { lineHeight: "1", letterSpacing: "0.15px" }],
        subTitle2: ["0.75rem", { lineHeight: "1", letterSpacing: "0.1px" }],
        body1: ["0.875rem", { lineHeight: "1", letterSpacing: "0.5px" }],
        body2: ["0.75rem", { lineHeight: "1", letterSpacing: "0.25px" }],
        button: ["0.66rem", { lineHeight: "1", letterSpacing: "0.4px" }],
        caption: ["0.75rem", { lineHeight: "1", letterSpacing: "0.4px" }],
        overline: ["0.625rem", { lineHeight: "1", letterSpacing: "1.5px" }],
      },
      fontFamily: {
        default: ["SUIT-Regular", "sans-serif"],
      },
      fontWeight: {
        bold: "700",
        normal: "400",
      },
    },
  },
  plugins: [],
};

export default config;
