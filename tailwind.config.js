/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    fontFamily: {
      'iran-yekan': "iran yekan"
    },
    extend: {
      extend: {
        fontFamily: {
          'IRANYekan': ['IRANYekan', "sans-serif", ]
        },
      },
    },
    // colors: {
    //   white: '#00000',
    //   black: '#fffff',
    //   primary: {
    //     100: '#F9F9F9',
    //     200: '#E5E5E5'
    //   }
    // }
  },
  plugins: [],
}