import { Link } from "react-router-dom"
import React, { useState } from "react"
import * as Yup from 'yup'
import { Formik, useFormik } from "formik"
import { Button, TextField, Grid } from '@mui/material'

const RegisterSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, 'Invalid Phone Number')
    .max(10, 'Invalid Phone Number')
    .required('Required'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password must be atleast 8 characters long'),
})


const Login = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <div style={{height:'100vh',display:'grid', placeContent:'center'}}>
      <form onSubmit={formik.handleSubmit} style={{border:'2px solid black', width:'400px'}}>
        <h1> Login </h1>
        <Grid
          container
          alignContent={'center'}
          justifyContent={'center'}
          display={"grid"}
          // flexDirection={'column'}
          spacing={2}
        >

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
          </Grid>
        </Grid >
      </form>
     
     Don't have an account yet? <Link to='/register' value='register'>Register</Link>
    </div>
  );
}

export default Login;
