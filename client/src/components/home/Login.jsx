import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { AuthImage } from "../../assets/images";
import InputField from "../global/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // email: "",
  // password: "",
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          gap: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={AuthImage}
            alt="Signup"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            px: "20px",
            py: "10px",
            mx: "20px",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">Login to your account</Typography>
          <Typography variant="body2">
            Get access to your Leads Dashboard
          </Typography>
          <InputField
            label="Email"
            name="email"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <InputField
            label="Password"
            name="password"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ mt: "10px" }}>
              Don't have an account?{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Signup
              </Typography>
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", height: "50px" }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
