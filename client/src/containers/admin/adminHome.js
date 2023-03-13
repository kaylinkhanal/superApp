
import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const AdminHome = () => {
    const sumbitAction = async(values)=>{
        await axios.post(`http://localhost:5000/products`, values )
    }
    return (
        <div>
        <h1>Add products</h1>
        <Formik
          initialValues={{
            productName: '',
            category: '',
            price: '',
          }}
          onSubmit={values => {
            sumbitAction(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="productName" placeholder="productName"/>
              {errors.productName && touched.productName ? (
                <div>{errors.productName}</div>
              ) : null}
              <Field name="category"  placeholder="category"/>
              {errors.category && touched.category ? (
                <div>{errors.category}</div>
              ) : null}
              <Field name="price" type="price" placeholder="price"/>
              {errors.price && touched.price ? <div>{errors.price}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    
    )
}

export default AdminHome