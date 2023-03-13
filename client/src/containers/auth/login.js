import { Formik } from 'formik'
import * as Yup from 'yup'
import './authForm.css'
import { setLoginDetails,assignUserRole } from '../../redux/reducers/userSlice'
import {
  setAlertMessages,
  apiResStatus
} from '../../redux/reducers/notifySlice'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

// Creating schema
const LoginSchema = Yup.object().shape({
  loginKey: Yup.string().required('Required'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters')
})

const Login = () => {
  const { userRole } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { state } = useLocation()
  const triggerLogin = async values => {
    try {
      const res = await axios.post(`http://localhost:5000/login`, {
        ...values,
        userRole
      })
      if (res.status == 200) {
        dispatch(setLoginDetails({ id: res.data.id, token: res.data.token }))
        dispatch(setAlertMessages(res.data.message))
        dispatch(apiResStatus(true))
        dispatch(assignUserRole(res.data.userRole));
        if (state?.onSuccessNavigation === '/order') {
          navigate('/order')
        } else {
          navigate('/')
        }
      } else {
        dispatch(apiResStatus(false))
      }
    } catch (err) {
      dispatch(apiResStatus(false))
      dispatch(setAlertMessages(err.response.data.message))
    }
  }
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ loginKey: '', password: '' }}
        onSubmit={values => {
          triggerLogin(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <>
            <button className="btn" onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon /> <span>Back</span>
            </button>

            <div className="authForm">
              <h1 className="h1">Login</h1>
              <div className="form">
                {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                <form noValidate onSubmit={handleSubmit}>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <input
                    name="loginKey"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loginKey}
                    placeholder="Phone No. or Email or UserName"
                    className="form-control inp_text"
                    id="loginKey"
                  />
                  {/* If validation is not passed show errors */}
                  <div className="error">
                    {errors.loginKey && touched.loginKey && errors.loginKey}
                  </div>
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
                  <div className="error">
                    {errors.password && touched.password && errors.password}
                  </div>
                  {/* Click on submit button to submit the form */}
                  <button className="btn" type="submit">
                    <spa>Login</spa> <TrendingFlatIcon />
                  </button>
                </form>
                <p style={{ marginTop: '15px', fontSize: '12px' }}>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  )
}

export default Login
