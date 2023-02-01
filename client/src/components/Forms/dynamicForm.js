import React, {useState} from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import Login from '../../containers/auth/login';
 
 const DynamicForm = (props) => {
     const [stepCount, setStepCount] = useState(1)
 return(
     <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
       }}
       onSubmit={values => {
        setStepCount(stepCount+1)
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
             {stepCount==1 && props.orderDetailsFields.map((item,id)=>{
                 return(
                     <div>
                         <Field name={item}  placeholder={item}/>
                            {errors[item] && touched[item] ? (
                                <div>{errors[item]}</div>
                            ) : null}
                     </div>
                 )
             })}
                {stepCount==2 && props.receiverDetailsFields.map((item,id)=>{
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
           <button type="submit">{stepCount<2 ? "Next" : "Submit"}</button>
         
         </Form>
       )}
     </Formik>
 );
}
 export default DynamicForm