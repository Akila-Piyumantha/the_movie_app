import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Chip, 
  Rating, 
  Button, 
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl, IMAGE_SIZES } from '../services/api';
import { useMovieContext } from '../context/MovieContext';

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const favorite = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const getTrailerUrl = () => {
    if (!movie || !movie.videos || !movie.videos.results) {
      return null;
    }
    
    // Find the first official trailer
    const trailer = movie.videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  if (loading) {
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
        <Button startIcon={<ArrowBackIcon />} onClick={handleBackClick} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Movie not found.
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBackClick} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const trailerUrl = getTrailerUrl();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        mt: 3,
        backgroundImage: movie.backdrop_path 
          ? `linear-gradient(to right, ${theme.palette.background.paper} 0%, rgba(0, 0, 0, 0.5) 100%), url(${getImageUrl(movie.backdrop_path, IMAGE_SIZES.BACKDROP)})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackClick}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box
            component="img"
            src={getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER) || '/placeholder-movie.png'}
            alt={movie.title}
            sx={{ 
              width: '100%', 
              borderRadius: 1,
              boxShadow: 3
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {movie.title} {releaseYear && `(${releaseYear})`}
            </Typography>
            
            <IconButton 
              onClick={handleFavoriteClick} 
              color={favorite ? 'error' : 'default'}
              sx={{ ml: 2 }}
            >
              {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {movie.genres && movie.genres.map(genre => (
              <Chip 
                key={genre.id}
                label={genre.name}
                size="small"
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Rating 
              value={movie.vote_average / 2} 
              precision={0.5} 
              readOnly 
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {movie.overview || 'No overview available.'}
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Release Date:</strong> {movie.release_date || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Original Language:</strong> {movie.original_language?.toUpperCase() || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Budget:</strong> {movie.budget ? `${movie.budget.toLocaleString()}` : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
          
          {trailerUrl && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<YouTubeIcon />}
              href={trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mt: 3 }}
            >
              Watch Trailer
            </Button>
          )}
        </Grid>
      </Grid>
      
      {movie.credits && movie.credits.cast && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.credits.cast.slice(0, 8).map((person) => (
              <Grid item key={person.id} xs={6} sm={3} md={3} lg={3}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={getImageUrl(person.profile_path, IMAGE_SIZES.PROFILE)}
                      alt={person.name}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography variant="subtitle1" align="center">
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {person.character}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default MovieDetail;