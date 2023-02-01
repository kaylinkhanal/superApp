import {Link} from "react-router-dom"
import { Form, Formik, Field} from "formik";
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.number()
    .min(10,'Too Short!')
    .max(21,'Too Long!')
    .required('Phone Number is required to login'),
  passWord: Yup.string()
    .min(8,'The password that you provided is too short')
    .matches(/[0-9]/,'Did you forget your password?')
    .matches(/[a-z]/,'Did you forget your password?')
    .matches(/[A-Z]/,'Did you forget your password?')
    .matches(/[^\w]/,'Did you forget your password?')
    .required('Password is required to login'),    
})

const Login = ()=>{
  return (
    <Formik
      initialValues={{
        phoneNumber: '',
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
              Phone Number
              <Field type="Phone number" name="phoneNumber" />
            </label>
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
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

