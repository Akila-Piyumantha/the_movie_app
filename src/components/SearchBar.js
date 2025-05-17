import React, { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = () => {
  const { handleSearch, lastSearch } = useMovieContext();
  const [query, setQuery] = useState(lastSearch || '');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <Box sx={{ mb: 4, backgroundColor: 'secondary.main' }} >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'secondary.main'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 ,backgroundColor: 'secondary.main' }}
          placeholder="Search for movies..."
          inputProps={{ 'aria-label': 'search movies' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;