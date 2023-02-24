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
  const navigate = useNavigate()
  const { userRole } = useSelector(state => state.user)
  const riderDetailsFields = [
    { label: "fullName", type: "text" ,placeholder:"Full Name"},
    { label: "email", type: "text",placeholder:"Email"  },
    { label: "phoneNumber", type: "text",placeholder:"Phone Number" },
    { label: "address", type: "text" ,placeholder:"Address"},
    { label: "vehicleType", type: "dropdown", options: ['Bike', 'Car', 'Van'] ,placeholder:"Vehicle Type"},
    { label: "vehicleNumber", type: "text" ,placeholder:"Vehicle Number"},
    { label: "password", type: "password",placeholder:"password" },
    { label: "confirmPassword", type: "password",placeholder:"Confirm Password" },
  ];
  const userDetailsFields = [
    { label: "fullName", type: "text", placeholder:"Full Name" },
    { label: "userName", type: "text",placeholder:"Username" },
    { label: "email", type: "text",placeholder:"Email" },
    { label: "phoneNumber", type: "text" ,placeholder:"Phone Number"},
    { label: "address", type: "text",placeholder:"Address" },
    { label: "password", type: "password" ,placeholder:"password"},
    { label: "confirmPassword", type: "password",placeholder:"Confirm Password" },
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







