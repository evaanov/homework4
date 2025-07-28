import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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

interface FormValues {
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate: string;
  telephone: string;
  employment: string;
  userAgreement: boolean;
}

export const Formik = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(id!, { skip: !id });
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Обязательное поле"),
    surName: Yup.string().required("Обязательное поле"),
    password: id 
      ? Yup.string() 
      : Yup.string().required("Обязательное поле").min(6, "Минимум 6 символов"),
    fullName: Yup.string().required("Обязательное поле"),
    email: id
      ? Yup.string()
      : Yup.string().email("Некорректный email").required("Обязательное поле"),
    birthDate: Yup.string(),
    telephone: Yup.string(),
    employment: Yup.string(),
    userAgreement: Yup.boolean()
      .oneOf([true], "Необходимо согласие")
      .required("Необходимо согласие")
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      surName: '',
      password: '',
      fullName: '',
      email: '',
      birthDate: '',
      telephone: '',
      employment: '',
      userAgreement: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (id) {
          const { email, password, ...updateData } = values;
          const dataToUpdate = password 
            ? { ...values } 
            : updateData as UserPatchDto;
          await updateUser({ id, data: dataToUpdate }).unwrap();
        } else {
          await createUser(values).unwrap();
        }
        navigate("/");
      } catch (err) {
        setError("Произошла ошибка при сохранении данных");
        console.error("Submit error:", err);
      }
    }
  });

  useEffect(() => {
    if (user && id) {
      formik.setValues({
        name: user.name,
        surName: user.surName,
        password: '',
        fullName: user.fullName,
        email: user.email,
        birthDate: user.birthDate || '',
        telephone: user.telephone || '',
        employment: user.employment || '',
        userAgreement: user.userAgreement || false
      });
    }
  }, [user, id]);

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

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Имя"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                disabled={formik.isSubmitting}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="surName"
                name="surName"
                label="Фамилия"
                value={formik.values.surName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surName && Boolean(formik.errors.surName)}
                helperText={formik.touched.surName && formik.errors.surName}
                disabled={formik.isSubmitting}
              />
            </Grid>

            {!id && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Пароль"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  disabled={formik.isSubmitting}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Полное имя"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                disabled={formik.isSubmitting}
              />
            </Grid>

            {!id && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={formik.isSubmitting}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="birthDate"
                name="birthDate"
                label="Дата рождения"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="telephone"
                name="telephone"
                label="Телефон"
                value={formik.values.telephone}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="employment"
                name="employment"
                label="Место работы"
                value={formik.values.employment}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="userAgreement"
                    name="userAgreement"
                    checked={formik.values.userAgreement}
                    onChange={formik.handleChange}
                    color="primary"
                  />
                }
                label="Согласен с условиями использования"
              />
              {formik.touched.userAgreement && formik.errors.userAgreement && (
                <Typography color="error" variant="body2">
                  {formik.errors.userAgreement}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={formik.isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  {id ? "Сохранение..." : "Создание..."}
                </>
              ) : id ? "Сохранить" : "Создать"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};