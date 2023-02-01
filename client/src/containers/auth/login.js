 import {Link} from "react-router-dom"
import { Form, Formik, Field} from "formik";
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  Email: Yup.string('Enter your email')
  .email('Enter a valid email')
  .required('Email is required'),
  passWord: Yup.string('Enter your password')
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required'), 
})

const Login = ()=>{
  return (
    <Formik
      initialValues={{
        Email: '',
        passWord:'',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors }) => (
        <Form>
          <div>
            <label>
              Email
              <Field type="email" name="email" />
            </label>
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>
              Password
              <Field type="password" name="passWord" />
            </label>
            {errors.passWord && <p>{errors.passWord}</p>}
          </div>
          <button type="submit">Submit</button>
          <div>
            <Link to=''>Click here if you forgot your password</Link>
          </div>
          <div>
            <Link to='/register'>Don't have an account yet?</Link>
          </div>

        </Form>
        
      )}
     </Formik>
     
  );
}

export default Login;
