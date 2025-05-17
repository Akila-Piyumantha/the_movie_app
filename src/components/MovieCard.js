import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Rating,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getImageUrl, IMAGE_SIZES } from '../services/api';
import { useMovieContext } from '../context/MovieContext';

// Constant card dimensions
const CARD_WIDTH = 240;
const CARD_HEIGHT = 420;
const POSTER_HEIGHT = 300;

const MovieCard = ({ movie, showRating = true }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);
  
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  return (
    <Card
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        margin: '8px',
        boxShadow: 3
      }}
    >
      <CardActionArea onClick={handleCardClick} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height={POSTER_HEIGHT}
          image={getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER) || '/placeholder-movie.png'}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ height: CARD_HEIGHT - POSTER_HEIGHT, overflow: 'hidden' }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={releaseYear}
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            {showRating && movie.vote_average > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  {movie.vote_average.toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      
      <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
            color: favorite ? 'error.main' : 'white',
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
    </Card>
  );
};

export default MovieCard;