import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPages';
import Header from './components/Header';
import Login from './components/Login';
import { useMovieContext } from './context/MovieContext';
import { getDesignTokens } from './theme';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const { isLoggedIn } = useMovieContext();

  // Effect to store theme preference
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Create theme with current mode
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleColorMode={toggleColorMode} mode={mode} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <HomePage /> : <Login />} 
          />
          <Route 
            path="/movie/:id" 
            element={isLoggedIn ? <DetailPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/favorites" 
            element={isLoggedIn ? <FavoritesPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

