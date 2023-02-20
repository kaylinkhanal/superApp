import React from "react";
import * as Yup from "yup";
import DynamicForm from "../../components/Forms/dynamicForm";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	lastName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
	const { userRole } = useSelector(state => state.user)
	const navigate = useNavigate()
	//   fullName: Yup.string()
	//     .min(5, 'Too Short')
	//     .required('Required'),
	//   registerEmail: Yup.string()
	//     .email('Invalid Email')
	//     .optional(),
	//   phoneNumber: Yup.string()
	//     .min(10, 'Invalid Phone Number')
	//     .max(10, 'Invalid Phone Number')
	//     .required('Required'),
	//   vehicleType: Yup.string()
	//     .required('Vehicle Type is Required'),
	//   vehicleNumber: Yup.string()
	//     .min(5, 'Invalid Vehicle Number')
	//     .required('Required'),
	//   password: Yup.string()
	//     .required('Please enter your password')
	//     .min(8, 'Password must be atleast 8 characters long'),
	//   confirmPassword: Yup.string()
	//     .oneOf([Yup.ref('password'), null], "Must enter the same password")


	const riderDetailsFields = [
		{ label: "fullName", type: "text", placeholder: "Full Name" },
		{ label: "email", type: "text", placeholder: "Email" },
		{ label: "phoneNumber", type: "text", placeholder: "Phone Number" },
		{ label: "address", type: "text", placeholder: "Address" },
		{ label: "vehicleType", type: "dropdown", options: ['Bike', 'Car', 'Van'], placeholder: "Vehicle Type" },
		{ label: "vehicleNumber", type: "text", placeholder: "Vehicle Number" },
		{ label: "password", type: "password", placeholder: "password" },
		{ label: "confirmPassword", type: "password", placeholder: "Confirm Password" },
	];
	const userDetailsFields = [
		{ label: "fullName", type: "text", placeholder: "Full Name" },
		{ label: "userName", type: "text", placeholder: "Username" },
		{ label: "email", type: "text", placeholder: "Email" },
		{ label: "phoneNumber", type: "text", placeholder: "Phone Number" },
		{ label: "address", type: "text", placeholder: "Full Name" },
		{ label: "password", type: "password", placeholder: "password" },
		{ label: "confirmPassword", type: "password", placeholder: "Confirm Password" },
	];

	return (
		<>
			<button className="btn" onClick={() => navigate(-1)}><KeyboardBackspaceIcon /> <span>Back</span></button>
			<div className="authForm">
				<h1 className="h1">Signup</h1>
				<DynamicForm
					apiEndpoint="/register"
					onSuccessNavigation="/login"
					firstPageFields={userRole == 'rider' ? riderDetailsFields : userDetailsFields}
					isSingleStepForm={true}
				/>
			</div>
		</>
	);
};
export default Register;







