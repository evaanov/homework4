// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   CircularProgress,
//   IconButton,
//   Typography,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   LinearProgress
// } from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';
// import { useGetUsersQuery, useDeleteUserMutation } from './api';
// import type { User } from './types';

// function UsersTable() {
//   const navigate = useNavigate();
//   const { data: users = [], isLoading, isError, isFetching } = useGetUsersQuery();
//   const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
//   const [userToDelete, setUserToDelete] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleEdit = (id: string) => {
//     navigate(`/user/edit/${id}`);
//   };

//   const handleDeleteClick = (user: User) => {
//     setUserToDelete(user);
//   };

//   const handleConfirmDelete = async () => {
//     if (userToDelete) {
//       try {
//         await deleteUser(userToDelete.id).unwrap();
//         setUserToDelete(null);
//       } catch (err) {
//         setError('Ошибка при удалении пользователя');
//         console.error('Delete error:', err);
//       }
//     }
//   };

//   const handleCloseDialog = () => {
//     setUserToDelete(null);
//   };

//   if (isLoading) {
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         height: '100vh'
//       }}>
//         <CircularProgress size={80} thickness={4} />
//         <Typography variant="h6" sx={{ ml: 2 }}>
//           Загрузка данных...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <>
//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ mb: 2 }}
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       )}

//       <TableContainer component={Paper} elevation={3} sx={{ width: '100%', m: '50px auto', position: 'relative' }}>
//         {isFetching && (
//           <Box sx={{ 
//             position: 'absolute', 
//             top: 0, 
//             left: 0, 
//             right: 0, 
//             zIndex: 1 
//           }}>
//             <LinearProgress color="primary" />
//           </Box>
//         )}
        
//         {isFetching && (
//           <Box sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             zIndex: 1,
//             display: 'flex',
//             alignItems: 'center',
//             backgroundColor: 'rgba(255, 255, 255, 0.7)',
//             p: 2,
//             borderRadius: 1
//           }}>
//             <CircularProgress size={24} sx={{ mr: 2 }} />
//             <Typography variant="body1">Обновление данных...</Typography>
//           </Box>
//         )}

//         <Table sx={{ minWidth: 650 }} aria-label="users table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Имя</TableCell>
//               <TableCell>Фамилия</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Дата рождения</TableCell>
//               <TableCell align="right">Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.length === 0 && !isFetching ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Typography variant="body1" color="textSecondary">
//                     Нет данных о пользователях
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user: User) => (
//                 <TableRow
//                   key={user.id}
//                   hover
//                   sx={{ 
//                     '&:last-child td, &:last-child th': { border: 0 },
//                     opacity: isFetching ? 0.5 : 1,
//                     transition: 'opacity 0.3s ease'
//                   }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {user.id}
//                   </TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.surName}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
//                   </TableCell>
//                   <TableCell align="right" sx={{ width: 150 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(user.id)}
//                         aria-label="edit"
//                         disabled={isFetching}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteClick(user)}
//                         aria-label="delete"
//                         disabled={isFetching}
//                       >
//                         <DeleteForeverIcon />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={Boolean(userToDelete)} onClose={handleCloseDialog}>
//         <DialogTitle>Подтверждение удаления</DialogTitle>
//         <DialogContent>
//           Вы уверены, что хотите удалить пользователя {userToDelete?.name} {userToDelete?.surName}?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} disabled={isDeleting}>
//             Отмена
//           </Button>
//           <Button 
//             onClick={handleConfirmDelete} 
//             color="error"
//             variant="contained"
//             disabled={isDeleting}
//           >
//             {isDeleting ? (
//               <>
//                 <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
//                 Удаление...
//               </>
//             ) : 'Удалить'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default UsersTable;

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery, useDeleteUserMutation, useGetMeQuery } from '../../features/auth/api/api';
import type { User } from '../../entities/user/types';

function UsersTable() {
  const navigate = useNavigate();
  const { data: currentUser } = useGetMeQuery();
  const { data: users = [], isLoading, isError, isFetching } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id).unwrap();
        setUserToDelete(null);
      } catch (err) {
        setError('Ошибка при удалении пользователя');
        console.error('Delete error:', err);
      }
    }
  };

  const handleCloseDialog = () => {
    setUserToDelete(null);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress size={80} thickness={4} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Загрузка данных...
        </Typography>
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h1" gutterBottom sx={{
          color: 'black'
        }}>
          Необходимо авторизоваться
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginRedirect}
          sx={{ mt: 3 }}
          size='large'
        >
          Войти
        </Button>
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={3} sx={{ width: '100%', m: '50px auto', position: 'relative' }}>
        {isFetching && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1 
          }}>
            <LinearProgress color="primary" />
          </Box>
        )}
        
        {isFetching && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            p: 2,
            borderRadius: 1
          }}>
            <CircularProgress size={24} sx={{ mr: 2 }} />
            <Typography variant="body1">Обновление данных...</Typography>
          </Box>
        )}

        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && !isFetching ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Нет данных о пользователях
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: User) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    opacity: isFetching ? 0.5 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell align="right" sx={{ width: 150 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user.id)}
                        aria-label="edit"
                        disabled={isFetching}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(user)}
                        aria-label="delete"
                        disabled={isFetching}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(userToDelete)} onClose={handleCloseDialog}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите удалить пользователя {userToDelete?.name} {userToDelete?.surName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isDeleting}>
            Отмена
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Удаление...
              </>
            ) : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersTable;