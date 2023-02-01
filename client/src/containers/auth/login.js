import { TextField, Grid, Button, Container } from "@mui/material";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .min(10, "Invalid Number")
    .max(10, "Invalid Number")
    .required("Required Field!"),

  password: Yup.string().min(8).required("Required Field!"),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: "10%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container flexDirection={"column"} spacing={2}>
          <Grid item>
            <LoginOutlinedIcon fontSize="large" />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              error={formik.touched.mobileNumber && formik.errors.mobileNumber}
              helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              type={"password"}
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" type="submit">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Link to="/register">Don't have an account yet?</Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
