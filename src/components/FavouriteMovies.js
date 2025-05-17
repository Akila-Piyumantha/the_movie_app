import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import MovieCard from './MovieCard';
import { useMovieContext } from '../context/MovieContext';

const FavoriteMovies = () => {
  const { favorites } = useMovieContext();

  if (!favorites || favorites.length === 0) {
    return (
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          You haven't added any favorites yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Favorite Movies
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteMovies;