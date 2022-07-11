import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme =  createTheme();

const loginUser = async (credentials) => {

    return fetch('http://localhost:5001/api/items/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
   .then(data => data.json())
}

const Login = ( {setToken} ) => {
  const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const username = data.get('username');
        const password = data.get('password');

        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        setIsLoading(false);
      };

      const LoginPage = () =>{
        return (
          <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        );
      }
    
      return (
        <LoginPage/>
      );
      
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login;