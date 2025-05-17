import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchMovies, getTrendingMovies } from '../services/api';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearch, setLastSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );

  // Load trending movies on initial render
  useEffect(() => {
    if (isLoggedIn) {
      fetchTrendingMovies();
    }
  }, [isLoggedIn]);

  // Store favorites in localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Store last search in localStorage
  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  // Store login state in localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  const login = (username, password) => {
    // This is a simple mock authentication
    // In a real app, you would verify credentials with a backend
    if (username && password) {
      setIsLoggedIn(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const data = await getTrendingMovies();
      setTrendingMovies(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trending movies. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setLastSearch(query);
    
    try {
      const data = await searchMovies(query, page);
      
      if (page === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }
      
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (lastSearch) {
      handleSearch(lastSearch, currentPage + 1);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        isLoggedIn,
        user,
        searchResults,
        trendingMovies,
        favorites,
        isLoading,
        error,
        lastSearch,
        login,
        logout,
        handleSearch,
        loadMoreResults,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        fetchTrendingMovies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};