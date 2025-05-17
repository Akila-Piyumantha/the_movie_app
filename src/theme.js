export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode (still dark-themed, cyberpunk-inspired)
          primary: {
            main: '#24305e', // 
          },
          secondary: {
            main: '#d1d7e0', // 
          },
          background: {
            default: '#fcfafa', 
            paper: '#8590aa',   
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#050a44', 
          },
          secondary: {
            main: '#141414', 
          },
          background: {
            default: '#0d0d0d', 
            paper: '#2c2e3a',   
          },
        }),
  },
});

