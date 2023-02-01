import React from 'react';
 import { Formik, Form, Field} from 'formik';
 import * as yup from 'yup';
 

 const Register = () => {
    
    const FormValidateSchema = yup.object().shape({

      fullName: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),

      phoneNumber: yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("Phone number can't start with a minus")
      .integer("Phone number can't include a decimal point")
      .min(10)
      .required('Phone number is required'),

      vechileType: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Vechile Type is required'),

      vechileNumber: yup.number()
      .min(2)
      .typeError("That doesn't look like a vechile number")
      .positive("Vechile number can't start with a minus")
      .integer("Vechile number can't include a decimal point")
      .required('Vechile Number is required'),

      password: yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),

      confirmPassword: yup.string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

      address: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Address is required')

    });


 return(
   <div>
    
    <div>
      <h1>Rider Registration</h1>
    </div>

  <div>
  <Formik
       initialValues={{
         fullName: '',
         phoneNumber: '',
         password: '',
         confirmPassword: '',
         vehicleType: '',
         vehicleNumber: '',
         address: '',

       }}
       validationSchema={FormValidateSchema}
       onSubmit={values => {
         console.log(values);
       }}
     >
  {({ errors, touched }) => (
         <Form>
           Full Name: 
           <Field name="fullName" />
           {errors.fullName && touched.fullName ? (
             <div>{errors.fullName}</div>
           ) : null}

           <br/>

           Phone Number: 
           <Field name="phoneNumber" />
           {errors.phoneNumber && touched.phoneNumber ? (
             <div>{errors.phoneNumber}</div>
           ) : null}

           <br/>

           Password: 
           <Field name="password" />
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}

           <br/>

           Confirm Password: 
           <Field name="confirmPassword" />
           {errors.confirmPassword && touched.confirmPassword ? (
             <div>{errors.confirmPassword}</div>
           ) : null}

           <br/>

           Vehicle Tye: 
           <Field name="vehicleType" />
           {errors.vehicleType && touched.vehicleType ? (
             <div>{errors.vehicleType}</div>
           ) : null}

           <br/>

           Vehicle Number: 
           <Field name="vehicleNumber" />
           {errors.vehicleNumber && touched.vehicleNumber ? (
             <div>{errors.vehicleNumber}</div>
           ) : null}

           <br/>

           Address: 
           <Field name="address" />
           {errors.address && touched.address ? (
             <div>{errors.address}</div>
           ) : null}

           <br/>

           <button type="submit">Submit</button>

         </Form>
       )}
  </Formik>
  </div>
  
  </div>
 );

}
 export default Register;