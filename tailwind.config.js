module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'city-green':  'rgb(0, 68, 69)',
        'city-green-muted':  'rgba(0, 68, 69, 0.25)',
        'spirit-green':  'rgb(39, 153, 137)',
        'light-green': 'rgb(159, 213, 179)',
        'city-gold': 'rgb(254, 183, 13)'
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/custom-forms")
  ],
}
