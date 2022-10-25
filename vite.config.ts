import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import ViteFonts from "vite-plugin-fonts";
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgLoader({
      defaultImport: 'url' // or 'raw'
    }),
    ViteFonts({
      // Custom fonts.
      custom: {
        families: [
          {
            name: "helvetica regular",
            local: "helvetica regular",
            src: [
              "./fonts/helveticaneueltstd-roman-webfont.woff2",
              "./fonts/helveticaneueltstd-roman-webfont.woff1",
            ],
          },
          {
            name: "helvetica light",
            local: "helvetica light",
            src: [
              "./fonts/helveticaneueltstd-light-webfont.woff2",
              "./fonts/helveticaneueltstd-light-webfont.woff1",
            ],
          },
          {
            name: "helvetica bold",
            local: "helvetica light",
            src: [
              "./fonts/helveticaneueltstd-bold-webfont.woff2",
              "./fonts/helveticaneueltstd-bold-webfont.woff1",
            ],
          },
          {
            name: "canela light",
            local: "canela light",
            src: [
              "./fonts/canela-light-webfont.woff2",
              "./fonts/canela-light-webfont.woff1",
            ],
          },
        ],
        display: "auto",
        preload: true,
      },
    }),
  ],
});
