const { object, string, ref, boolean } = require("yup");

// Sign Up Parameters Validation
const signupSchema = object().shape({
  body: object().shape({
    username: string().required("Username is Required"),
    email: string().email("Email is not Valid!").required("Email is Required"),
    password: string().required("password is Required"),
    first_name: string().required("First Name is Required"),
    last_name: string().required("Last Name is Required"),
  }),
});
// login Parameters Validation
const loginSchema = object().shape({
  body: object().shape({
    email: string().email("Email is not Valid!").required("Email is Required"),
    password: string().required("password is Required"),
  }),
});


module.exports = {
  signupSchema,
  loginSchema,
};
