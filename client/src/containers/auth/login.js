import { Formik } from "formik";
import * as Yup from "yup";
import "./authForm.css"
import {switchLogin} from "../../redux/reducers/userSlice"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
// Creating schema
const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, 'Invalid Phone Number')
    .max(10, 'Invalid Phone Number')
    .required('Required'),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login =()=> {
const dispatch = useDispatch()
const navigate = useNavigate()

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ phoneNumber: "", password: "" }}
        onSubmit={(values) => {
            //req to api
          dispatch(switchLogin())
          navigate('/')
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="authForm">
            <div className="form">
           {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="number"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  placeholder="Enter Phone Number"
                  className="form-control inp_text"
                  id="phoneNumber"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                </p>
                 {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                 {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
              </form>
              <Link to='/register'>Don't have an account yet?</Link>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;




