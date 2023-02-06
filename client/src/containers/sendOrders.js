import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DynamicForm from "../components/Forms/dynamicForm";

const today = new Date();
console.log(today);
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
  exptDeliveryDate: Yup.string()
    .required("Date is a required field")
    .min(today, "Invalid date"),
});

const SendOrders = () => {
  const orderDetailsFields = [
    { label: "Category", value: "category", type: "text" },
    { label: "Product Name", value: "productName", type: "text" },
    { label: "Product Size", value: "productSize", type: "text" },
    { label: "Product Description", value: "productDescription", type: "text" },
    {
      label: "Expected Delivery Date",
      value: "exptDeliveryDate",
      type: "date",
    },
  ];

  const receiverDetailsFields = [
    { label: "Receiver Name", value: "receiverName", type: "text" },
    { label: "Receiver Address", value: "receiverAddress", type: "text" },
    { label: "Phone Number", value: "phoneNumber", type: "text" },
  ];

  return (
    <div>
      <DynamicForm
        firstPageFields={orderDetailsFields}
        secondPageFields={receiverDetailsFields}
      />
    </div>
  );
};
export default SendOrders;
