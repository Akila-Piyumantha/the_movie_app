import axios from 'axios';

// Note: In a real application, API keys should be kept secure
// For a production app, these requests should be proxied through a backend
const API_KEY = 'https://api.themoviedb.org/3';  // Replace with an actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const IMAGE_SIZES = {
  POSTER: 'w500',
  BACKDROP: 'original',
  PROFILE: 'w185'
};

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const getTrendingMovies = async () => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getImageUrl = (path, size) => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
};