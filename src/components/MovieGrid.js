import React from 'react';
import { Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import { useMovieContext } from '../context/MovieContext';

const MovieGrid = ({ movies, title, emptyMessage }) => {
  const { isLoading, loadMoreResults } = useMovieContext();
  
  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          {emptyMessage || 'No movies found'}
        </Typography>
      </Box>
    );
  }
  

  const itemsPerRow = 5; 
  const emptyItemsNeeded = movies.length % itemsPerRow === 0 
    ? 0 
    : itemsPerRow - (movies.length % itemsPerRow);
  
  return (
    <Box sx={{ my: 2 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={4} justifyContent="flex-start">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={2} xl={2} sx={{ display: 'flex' }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        
        {/* Add empty grid items to fill the last row */}
        {emptyItemsNeeded > 0 && Array(emptyItemsNeeded).fill().map((_, index) => (
          <Grid item key={`empty-${index}`} xs={12} sm={6} md={4} lg={2} xl={2} />
        ))}
      </Grid>
      
      {movies.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Button 
            variant="contained"
            onClick={loadMoreResults}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Load More'
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieGrid;