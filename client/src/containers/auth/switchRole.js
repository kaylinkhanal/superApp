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
    const { userRole } = useSelector(state => state.user)
    const switchRoleFields = [
        { label: "vehicleType", type: "dropdown", options: ['Bike', 'Car', 'Van'], placeholder: "Vehicle Type" },
        { label: "vehicleNumber", type: "text", placeholder: "Vehicle Number" }
    ]

    return (
        <>
            <button className="btn" onClick={() => navigate(-1)}><KeyboardBackspaceIcon /> <span>Back</span></button>
            <div className="authForm">
                <h1 className="h1">Want to switch your role?</h1>
                <DynamicForm
                    apiEndpoint="/switch-role"
                    onSuccessNavigation="/"
                    firstPageFields={switchRoleFields}
                    isSingleStepForm={true}
                    updateRole={true}
                />
            </div>
        </>
    );
};
export default SwitchRole;







