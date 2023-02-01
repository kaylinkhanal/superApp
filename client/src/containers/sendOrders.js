import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DynamicForm from "../components/Forms/dynamicForm";

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

const SendOrders = () => {
  const orderDetailsFields = [
    "category",
    "productName",
    "productSize",
    "productDescription",
    "exptDeliveryDate",
  ];
  const receiverDetailsFields = [
    "receiverName",
    "receiverAddress",
    "phoneNumber",
  ];

  return (
    <div>
      <DynamicForm
        orderDetailsFields={orderDetailsFields}
        receiverDetailsFields={receiverDetailsFields}
      />
    </div>
  );
};
export default SendOrders;
