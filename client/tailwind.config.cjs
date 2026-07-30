module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        srmpay: {
          orange: '#F97316',
          green: '#10B981',
          adminBlue: '#1E3A8A'
        }
      },
      borderRadius: {
        xl: '20px'
      }
    }
  },
  plugins: []
}
