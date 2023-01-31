import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
   fullName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
     phoneNumber: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      vehicleType: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      vehicleNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      address: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
 });
 
 const Register = () => (
   <div>
     <h1>Signup</h1>
     <Formik
       initialValues={{
         fullName: '',
         phoneNumber: '',
         email: '',
         password: '',
         confirmPassword: '',
         vehicleType: '',
         vehicleNumber: '',
         address: '',

       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           Full Name: <Field name="fullName" />
           {errors.fullName && touched.fullName ? (
             <div>{errors.fullName}</div>
           ) : null}
           <br/>
           Phone Number: <Field name="phoneNumber" />
           {errors.phoneNumber && touched.phoneNumber ? (
             <div>{errors.phoneNumber}</div>
           ) : null}
           <br/>
           Email: <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <br/>
           Password: <Field name="password" />
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
           <br/>
           Confirm Password: <Field name="confirmPassword" />
           {errors.confirmPassword && touched.confirmPassword ? (
             <div>{errors.confirmPassword}</div>
           ) : null}
           <br/>
           Vehicle Tye: <Field name="vehicleType" />
           {errors.vehicleType && touched.vehicleType ? (
             <div>{errors.vehicleType}</div>
           ) : null}
           <br/>
           Vehicle Number: <Field name="vehicleNumber" />
           {errors.vehicleNumber && touched.vehicleNumber ? (
             <div>{errors.vehicleNumber}</div>
           ) : null}
           <br/>
           Address: <Field name="address" />
           {errors.address && touched.address ? (
             <div>{errors.address}</div>
           ) : null}
           <br/>
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );
 export default Register