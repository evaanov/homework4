// import { AppBar, Button, Toolbar, Typography, CircularProgress } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import { useGetMeQuery, useLogoutMutation } from './api';
// import { useNavigate } from 'react-router-dom';

// export const Header = () => {
//   const { data: user, isLoading } = useGetMeQuery();
//   const [logout] = useLogoutMutation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();
//       navigate('/login');
//     } catch (error) {
//       console.error('Ошибка при выходе:', error);
//     }
//   };

//   return (
//     <AppBar position="static" sx={{ width: '100%', height: 64 }} elevation={1}>
//       <Toolbar sx={{ justifyContent: 'right', display: 'flex', gap: 2 }}>
//         {isLoading ? (
//           <CircularProgress color="inherit" size={24} />
//         ) : (
//           <Typography variant="h6" component="div">
//             {user?.email || 'Не авторизован'}
//           </Typography>
//         )}
//         <Button 
//           variant='contained' 
//           disableElevation
//           onClick={handleLogout}
//           startIcon={<LogoutIcon />}
//           disabled={!user}
//         >
//           Выход
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

import { AppBar, Button, Toolbar, Typography, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useGetMeQuery, useLogoutMutation } from '../../features/auth/api/api';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ width: '100%', height: 64 }} elevation={1}>
      <Toolbar sx={{ justifyContent: 'right', display: 'flex', gap: 2 }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <Typography variant="h6" component="div">
            {user?.email || 'Не авторизован'}
          </Typography>
        )}
        
        {user ? (
          <Button 
            variant='contained' 
            disableElevation
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Выход
          </Button>
        ) : (
          <Button 
            variant='contained' 
            disableElevation
            onClick={handleLogin}
            startIcon={<LoginIcon />}
          >
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};