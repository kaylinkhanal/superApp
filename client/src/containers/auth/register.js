import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DynamicForm from "../../components/Forms/dynamicForm";
import { useSelector } from "react-redux"

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
    <section>
      <DynamicForm
        apiEndpoint= "/register"
        onSuccessNavigation= "/login"
        firstPageFields={userRole == 'rider' ? riderDetailsFields : userDetailsFields}
        isSingleStepForm={true}
      />
    </section>
  );
};
export default Register;







