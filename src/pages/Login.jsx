import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import blogPng from "../assets/blok.png";
import googlePng from "../assets/google.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginWithGoogle, signIn } from "../helpers/firebase";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext)


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("No password provided")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  const handleSubmit = (values, { resetForm }) => {
    signIn(
       values.email, 
       values.password, 
       toastSuccessNotify, 
       toastErrorNotify, 
       navigate,
       resetForm);
       setUser(user)
  };

  const handleGoogleSingIn = () => {
    loginWithGoogle(
      toastSuccessNotify,
      toastErrorNotify,
      navigate)
      setUser(user)
}
  return (
    <Container className="login-container" 
               sx={{width:"500px", 
                    border: "1px solid black", 
                    margin: "10px auto",
                    padding: "15px",
                    borderRadius:"10px",
                    boxShadow: "0 0 5px black"}}>
      <Box className="login-box">
        <Avatar
          className="login-avatar"
          alt="avatar_img"
          src={blogPng}
          sx={{ width: 156, height: 156, margin: "auto" }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{textAlign: "center", m: 4, fontFamily: "Girassol", color: "#046582"}}
        >
          ── LOGIN ──
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    variant="outlined"
                    type="email"
                    autoFocus
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    helperText={ touched.email && errors.email }
                    error={touched.email && Boolean(errors.email)}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    helperText={ touched.password && errors.password }
                    error={touched.password && Boolean(errors.password)}
                    onBlur={handleBlur}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    style={{ backgroundColor: "rgb(25, 118, 210)", fontWeight: 700 }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    // onClick={handleLogin}
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleGoogleSingIn}
                    fullWidth
                  >
                    With{" "}
                    <img
                      src={googlePng}
                      alt="google"
                      style={{ width: "80px", marginLeft: "10px" }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;