import { useFormik } from 'formik'
import * as Yup from 'yup'
import {Link} from "react-router-dom"
import { Button, TextField, Select, MenuItem, InputLabel, Grid } from '@mui/material'


const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, 'Invalid Phone Number')
    .max(10, 'Invalid Phone Number')
    .required('Required'),
    password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password must be atleast 8 characters long')

})

const Login = () => {

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1> Login </h1>
        <Grid
          container
          alignContent={'center'}
          justifyContent={'center'}
          xl
          flexDirection={'column'}
          spacing={2}
        ></Grid>

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
            <Button color="primary" variant='contained' type="submit"> Login </Button>
            <li>
            <Link to='/register'> Don't have an account yet? Click Here</Link>
             </li>
          </Grid>
          </form>
    </div>
  )

}
export default Login;