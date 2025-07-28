import { useState } from 'react';
import { 
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link,
  Paper,
  Container
} from '@mui/material';
import { useLoginMutation } from '@features/auth/api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      navigate('/');
    } catch (err) {
    }
  };

  return (
    <Container sx={{
      width: "100vw",
      height: '100vh'
    }}>

    <Box 
      component={Paper}
      sx={{
        maxWidth: 400,
        m: 'auto',
        p: 4,
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
      elevation={3}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Вход в систему
      </Typography>

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!error}
        />

        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error ? "Неверные учетные данные" : ""}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Войти'
          )}
        </Button>
      </Box>
    </Box>
    </Container>
  );
};

export default LoginPage;