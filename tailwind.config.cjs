const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/hero.webp')",
      },
    },
  },
  plugins: [plugin(function({
    addComponents
  }){
    addComponents({
      ".pixelated": {
        imageRendering: "pixelated"
      }
    })
  }
  )],
}