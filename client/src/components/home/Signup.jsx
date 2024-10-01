import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { AuthImage } from "../../assets/images";
import InputField from "../global/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    dealership_name: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    dealership_name: Yup.string().required("Dealership name is required"),
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
            gap: "5px",
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            px: "20px",
            py: "10px",
            mx: "20px",
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4">Create an account</Typography>
          <Typography variant="body2">
            Get started with a free account
          </Typography>
          <InputField
            label="Username"
            name="username"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <InputField
            label="Email"
            name="email"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <InputField
            label="First Name"
            name="first_name"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <InputField
            label="Last Name"
            name="last_name"
            formik={formik}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <InputField
            label="Dealership Name"
            name="dealership_name"
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
            <Typography variant="body2">
              By signing up, you agree to our{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
              >
                Terms
              </Typography>{" "}
              and{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
              >
                Privacy Policy
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ mt: "10px" }}>
              Already have an account?{" "}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Typography>
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", height: "50px" }}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
