/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6rem',
        'tiny': '0.7rem',
        '7xl': '6rem',
      },
      borderRadius :{
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '0.80rem',
      },
      colors:{
        'brand': '#675dff',
        'brand-2': 'rgb(255 57 14 / 25%);',
        'blue-2': '#19a0fb',
        'dark': '#2c2c2c',
        'branding': 'rgb(16, 24, 64)',
        'orange': '#F93911',
      }
    }
  },
  variants: {},
  plugins: [],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ]
}
