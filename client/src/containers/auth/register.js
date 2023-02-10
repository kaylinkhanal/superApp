import { useFormik } from 'formik'
import * as Yup from 'yup'
import "./authForm.css"

import { Button, TextField, Select, MenuItem, InputLabel, Grid } from '@mui/material'

const vehicleType = ['Bike', 'Car', 'Van']
const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, 'Too Short')
    .required('Required'),
  registerEmail: Yup.string()
    .email('Invalid Email')
    .optional(),
  phoneNumber: Yup.string()
    .min(10, 'Invalid Phone Number')
    .max(10, 'Invalid Phone Number')
    .required('Required'),
  vehicleType: Yup.string()
    .required('Vehicle Type is Required'),
  vehicleNumber: Yup.string()
    .min(5, 'Invalid Vehicle Number')
    .required('Required'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password must be atleast 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Must enter the same password")

})


const Register = () => {
  // create a form here which should have following fields
  // 1. email(optional) 2. phone number 3. full name 4.vehicle type 5. vehicle number 
  // 2. password, confirm password, address 
  // 3.
  const formik = useFormik({
    initialValues: {
      fullName: '',
      registerEmail: '',
      phoneNumber: '',
      vehicleType: 'Bike',
      vehicleNumber: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })


  return (
    <div className="form1">
      <form onSubmit={formik.handleSubmit}>
        <h1> Register Form </h1>
        <Grid
          container
          alignContent={'center'}
          justifyContent={'center'}
          xl
          flexDirection={'column'}
          spacing={2}
        >
          <Grid item width={"50%"}>
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
          </Grid>

          <Grid item lg>
            <TextField
              fullWidth
              id="registerEmail"
              name="registerEmail"
              label="Email Address"
              value={formik.values.registerEmail}
              onChange={formik.handleChange}
              error={formik.touched.registerEmail && Boolean(formik.errors.registerEmail)}
              helperText={formik.touched.registerEmail && formik.errors.registerEmail}
            />
          </Grid>
          <Grid item lg>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type={'number'}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </Grid>
          <Grid item lg>
            <InputLabel id="vehicleTypeLabel">Vehicle Type</InputLabel>
            <Select
              fullWidth
              labelId="vehicleTypeLabel"
              id="vehicleType"
              name="vehicleType"
              value={formik.values.vehicleType}
              onChange={formik.handleChange}
              error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
              helperText={formik.touched.vehicleType && formik.errors.vehicleType}
            >
              {vehicleType.map((item, index) => {
                return (
                  <MenuItem value={item}> {item} </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item lg>
            <TextField
              fullWidth
              id="vehicleNumber"
              name="vehicleNumber"
              label="Vehicle Number"
              value={formik.values.vehicleNumber}
              onChange={formik.handleChange}
              error={formik.touched.vehicleNumber && Boolean(formik.errors.vehicleNumber)}
              helperText={formik.touched.vehicleNumber && formik.errors.vehicleType}
            />
          </Grid>
          <Grid item lg>
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
          </Grid>
          <Grid item lg>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={"password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          <Grid item lg>
            <Button color="primary" variant='contained' type="submit"> Submit </Button>
          </Grid>
        </Grid >
      </form>
    </div>
  );
}

export default Register;
