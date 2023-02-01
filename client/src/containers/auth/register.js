import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().min(5, "Too Short").required("Required"),
  registerEmail: Yup.string().email("Invalid Email").optional(),
  phoneNumber: Yup.string()
    .min(10, "Invalid Phone Number")
    .max(10, "Invalid Phone Number")
    .required("Required"),
  vehicleType: Yup.string().required("Vehicle Type is Required"),
  vehicleNumber: Yup.string()
    .min(5, "Invalid Vehicle Number")
    .required("Required"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters long"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Must enter the same password"
  ),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      registerEmail: "",
      phoneNumber: "",
      vehicleType: "",
      vehicleNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
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
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
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

      <form onSubmit={formik.handleSubmit}>
        <h1> Register Form </h1>
        <TextField
          fullWidth
          id="fullName"
          name="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        <TextField
          fullWidth
          id="registerEmail"
          name="registerEmail"
          label="Email Address"
          value={formik.values.registerEmail}
          onChange={formik.handleChange}
          error={
            formik.touched.registerEmail && Boolean(formik.errors.registerEmail)
          }
          helperText={
            formik.touched.registerEmail && formik.errors.registerEmail
          }
        />

        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type={"number"}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <TextField
          placeholder="Car or Bike"
          fullWidth
          labelId="vehicleTypeLabel"
          id="vehicleType"
          name="vehicleType"
          value={formik.values.vehicleType}
          onChange={formik.handleChange}
          error={
            formik.touched.vehicleType && Boolean(formik.errors.vehicleType)
          }
          helperText={formik.touched.vehicleType && formik.errors.vehicleType}
        ></TextField>

        <TextField
          fullWidth
          id="vehicleNumber"
          name="vehicleNumber"
          label="Vehicle Number"
          value={formik.values.vehicleNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.vehicleNumber && Boolean(formik.errors.vehicleNumber)
          }
          helperText={formik.touched.vehicleNumber && formik.errors.vehicleType}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={"password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={"password"}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button color="primary" variant="contained" type="submit">
          {" "}
          Register{" "}
        </Button>
      </form>
    </div>
  );
};

export default Register;
