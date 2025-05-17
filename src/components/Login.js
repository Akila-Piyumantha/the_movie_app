import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMovieContext } from '../context/MovieContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useMovieContext();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("./back.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent white
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#6e0202' }}>
          <LockOutlinedIcon />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ color: '#000000',fontWeight: 'bold' }}>
          Sign in to Movie Explorer
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            
            color='black'
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: { backgroundColor: 'rgba(252, 150, 150, 0.7)', borderRadius: 4 }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            color='black'
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { backgroundColor: 'rgba(252, 150, 150, 0.7)', borderRadius: 4 }
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Typography variant="body2" color="white" align="center">
            Note: This is a demo app. Any username and password will work.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;