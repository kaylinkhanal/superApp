import React, {useState} from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import "../../containers/auth/authForm.css"
 import { Button, TextField, Select, MenuItem, InputLabel, Grid } from '@mui/material'
 const DynamicForm = (props) => {
     const [stepCount, setStepCount] = useState(1)
     const schema = Yup.object().shape({
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

     const determineFieldType = (item)=> {
       if(item.type === 'dropdown'){
         return (
           <>
           <InputLabel id="vehicleTypeLabel">{item.label}</InputLabel>
           <Select  labelId="vehicleTypeLabel" id="vehicleType"   name="vehicleType" >
                  {item.options.map((item,id)=>{
                    return  <MenuItem key={id} value={item}>{item}</MenuItem>
                  })}
                 </Select>
                 </>
                 )
       }

       
        return( <Field name={item.label}  type={item.type} placeholder={item.label}/>)
     }

 return(
     <Formik
       initialValues={{}}
       onSubmit={values => {
        // setStepCount(stepCount+1)
         // same shape as initial values
         console.log(values);
         const requestOptions = {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: values
         }
         fetch('http://localhost:5000/register', requestOptions)
       }}
      //  validationSchema={schema}
     >
       {({ errors, touched ,values}) => (
          <div className="form">
         <Form>
             {stepCount==1 && props.firstPageFields.map((item,id)=>{
                 return(
                     <div>
                 <Field name={item.label} type={item.type} placeholder={item.label}/>
                        {errors[item.label] && touched[item.label] ? (
                            <div>{errors[item.label]}</div>
                        ) : null}
                     </div>
                 )
             })}
                {stepCount==2 && props.secondPageFields.map((item,id)=>{
                 return(
                     <div>
                         <Field name={item}  placeholder={item}/>
                            {errors[item] && touched[item] ? (
                                <div>{errors[item]}</div>
                            ) : null}
                     </div>
                 )
             })}
           {stepCount==2 && <button onClick={()=>setStepCount(stepCount-1)}>Back</button> }
           <button type="submit">Submit</button>
         </Form>
         </div>
       )}
     </Formik>
 );
}
 export default DynamicForm