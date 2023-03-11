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

const SwitchRole = () => {
    const navigate = useNavigate()
    const switchUser = [
        { label: "vehicleType", type: "dropdown", options: ['Bike', 'Car', 'Van'], placeholder: "Vehicle Type" },
        { label: "vehicleNumber", type: "text", placeholder: "Vehicle Number" }
    ]

    return (
        <>
            <button className="btn" onClick={() => navigate(-1)}><KeyboardBackspaceIcon /> <span>Back</span></button>
            <div className="authForm">
                <h1 className="h1">Switch Your Role</h1>
                <DynamicForm
                    apiEndpoint="/switch-user"
                    onSuccessNavigation="/login"
                    firstPageFields={switchUser}
                    isSingleStepForm={true}
                    isEdit={true}
                />
            </div>
        </>
    );
};
export default SwitchRole







