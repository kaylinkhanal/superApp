import { Formik } from "formik";
import * as Yup from "yup";
import "./authForm.css";
import { setLoginDetails } from "../../redux/reducers/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Creating schema
const LoginSchema = Yup.object().shape({
	phoneNumber: Yup.string()
		.min(10, "Invalid Phone Number")
		.max(10, "Invalid Phone Number")
		.required("Required"),
	password: Yup.string()
		.required("Password is a required field")
		.min(8, "Password must be at least 8 characters"),
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { state } = useLocation();
  const triggerLogin = async(values)=> {
    debugger;
    const res = await axios.post(`http://localhost:5000/login`, values)
    if(res.status == 200){
      console.log(res.data.token)
      dispatch(setLoginDetails(res.data.token));
    }
 
    if (state?.onSuccessNavigation === "/order") {
      navigate("/order");
    } else {
      navigate("/");
    }
  }
	return (
		<>
			{/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
			<Formik
				validationSchema={LoginSchema}
				initialValues={{ phoneNumber: "", password: "" }}
				onSubmit={(values) => {
          triggerLogin(values)
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
					<>
						<button className="btn" onClick={() => navigate(-1)}><KeyboardBackspaceIcon /> <span>Back</span></button>

						<div className="authForm">
							<h1 className="h1">Login</h1>
							<div className="form">
								{/* Passing handleSubmit parameter tohtml form onSubmit property */}
								<form noValidate onSubmit={handleSubmit}>
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
									<div className="error">
										{errors.phoneNumber &&
											touched.phoneNumber &&
											errors.phoneNumber}
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
									<button className="btn" type="submit"><spa>Login</spa> <TrendingFlatIcon /></button>
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
	);
};

export default Login;
