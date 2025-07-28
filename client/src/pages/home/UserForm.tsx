import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert
} from "@mui/material";
import { 
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation 
} from "@features/auth/api/api";
import type { UserCreateDto, UserPatchDto } from "@entities/user/types";

const UserForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(id!, { skip: !id });
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState<UserCreateDto>({
    name: '',
    surName: '',
    password: '',
    fullName: '',
    email: '',
    birthDate: '',
    telephone: '',
    employment: '',
    userAgreement: false,
  });

  useEffect(() => {
    if (user && id) {
      setFormData({
        name: user.name,
        surName: user.surName,
        password: '',
        fullName: user.fullName,
        email: user.email,
        birthDate: user.birthDate || '',
        telephone: user.telephone || '',
        employment: user.employment || '',
        userAgreement: user.userAgreement || false,
      });
    }
  }, [user, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (id) {
        const { email, password, ...updateData } = formData;
        const dataToUpdate = password 
          ? formData 
          : updateData as UserPatchDto;
        await updateUser({ id, data: dataToUpdate }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      setError("Произошла ошибка при сохранении данных");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUserLoading && id) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, maxWidth: "md" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? "Редактирование пользователя" : "Создание пользователя"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Фамилия"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>

            {!id && (
              <Grid item xs={12}>
                <TextField
                  label="Пароль"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                  disabled={isSubmitting}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Полное имя"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>

            {!id && (<Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled={isSubmitting}
                inputProps={{
                  pattern: "[^@\\s]+@[^@\\s]+\\.[^@\\s]+",
                  title: "Введите корректный email"
                }}
              />
            </Grid>)}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Дата рождения"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Телефон"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Место работы"
                name="employment"
                value={formData.employment}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled={isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="userAgreement"
                    checked={formData.userAgreement}
                    onChange={handleChange}
                    color="primary"
                    required
                  />
                }
                label="Согласен с условиями использования"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Сохранение..." : "Сохранить"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserForm;