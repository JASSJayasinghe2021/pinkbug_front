import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NotificationContainer } from 'react-notifications';
import { useAuth } from "../hooks/useAuth";
import '../locales/i18n';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ReCAPTCHA from "react-google-recaptcha";

export const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const recaptchaRef = React.createRef();

  const TitleTypograpy = styled(Typography)(({ theme }) => ({
    fontSize: "26px",
    color: purple[900],
  }));

  const SubTitleTypograpy = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    color: purple[900],
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px",
    }
  }));

  const userSchema = yup.object({
    email: yup
      .string('')
      .email()
      .required(t('email_required')),
    password: yup
      .string('')
      .required(t('password_required')),
  }).required();


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
    // onSubmit();
    recaptchaRef.current.reset();
  }

  const onSubmit = async (data) => {
    //event.preventDefault();
    //window.alert(data.email+' - '+data.password);
    const err = await login({
      email: data.email,
      password: data.password
    });
    console.log(err);
    errors = err;
  };

  return (
    <Container component="main" maxWidth="xs">
      <NotificationContainer />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        //TODO must put his as env.
        sitekey='6Lf2kzgbAAAAALrxuVUdg8F_4KNQ3wWaMUGZBoXS'
        onChange={onReCAPTCHAChange}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <TitleTypograpy>
          {t('title_login')}
        </TitleTypograpy>
        <SubTitleTypograpy>
          {t('sub_title_login')}
        </SubTitleTypograpy>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
                backgroundColor:'#fff'
              }
            }}
            required
            fullWidth
            id="email"
            label={t('email_address')}
            name="email"
            {...register('email', { required: true })}
            autoComplete="email"
            error={errors.email}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
                backgroundColor:'#fff'
              }
            }}
            required
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            {...register('password', { required: true })}
            autoComplete="current-password"
            error={errors.password}
            helperText={errors.password && errors.password.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('login')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
