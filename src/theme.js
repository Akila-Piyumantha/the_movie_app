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
            default: '#a8d0e6', 
            paper: '#8590aa',   
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#141414', 
          },
          secondary: {
            main: '#2d283e', 
          },
          background: {
            default: '#0d0d0d', 
            paper: '#4c495d',   
          },
        }),
  },
});

