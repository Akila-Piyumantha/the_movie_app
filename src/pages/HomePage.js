import React, { useEffect } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import TrendingMovies from '../components/TrendingMovies';
import { useMovieContext } from '../context/MovieContext';

const HomePage = () => {
  const { 
    searchResults, 
    lastSearch, 
    isLoading, 
    error, 
    handleSearch 
  } = useMovieContext();

  // Load last search if exists
  useEffect(() => {
    if (lastSearch) {
      handleSearch(lastSearch);
    }
  }, []);

  return (
    <Box>
      <SearchBar />
      
      {isLoading && !searchResults.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ my: 4 }}>
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        </Box>
      ) : searchResults.length > 0 ? (
        <MovieGrid 
          movies={searchResults} 
          title={`Search Results for "${lastSearch}"`}
          emptyMessage="No movies found matching your search."
        />
      ) : (
        <TrendingMovies />
      )}
      
      {searchResults.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <TrendingMovies />
        </>
      )}
    </Box>
  );
};

export default HomePage;