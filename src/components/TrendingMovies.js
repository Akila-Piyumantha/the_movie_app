import React from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import { useMovieContext } from '../context/MovieContext';

const TrendingMovies = () => {
  const { trendingMovies, isLoading, error } = useMovieContext();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!trendingMovies || trendingMovies.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No trending movies available right now.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Trending Today
      </Typography>
      <Grid container spacing={3}>
        {trendingMovies.slice(0, 8).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingMovies;