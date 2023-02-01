import React from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
   firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   phonenumber: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
 
const Register = () => (
     // create a form here which should have following fields
    // 1. email(optional) 2. phone number 3. full name 4.vehicle type 5. vehicle number 
    // 2. password, confirm password, address 
   <div>
     <h1>Signup</h1>
     <Formik
       initialValues={{
         fullname: '',
         phonenumber: '',
         email: '',
         vehicleType:'',
         vehicleNumber:'',
         licenceNumber:'',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="firstName" placeholder="Name"/>
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}<br />
           <Field name="phonenumber" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}<br />
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}<br />
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );
 export default Register