import { Link } from "react-router-dom";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button } from "@mui/material";

const LoginSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .min(10, "Invalid Number")
    .max(10, "Invalid Number")
    .required("Required Field!"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      mobileNumber: "xxxxxxxxxx",
      password: "xxxxxxxx",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="App">
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="moblieNumber"
            name="mobileNumber"
            label="Mobile Number"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button color="primary" variant="contained" fullWidth type="login">
            Login
          </Button>
        </form>
      </div>
      <Link to="/register">Don't have an account yet?</Link>
    </div>
  );
};

export default Login;
