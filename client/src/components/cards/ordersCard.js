import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
  
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <>
        <label className="checkbox">
          <input {...field} {...props} type="checkbox" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
  
  // Styled components ....
  const StyledSelect = styled.select`
    color: var(--blue);
  `;
  
  const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: red;
    width: 400px;
    margin-top: 0.25rem;
    &:before {
      content: "";
      font-size: 10px;
    }
    @media (prefers-color-scheme: red) {
      color: var(--red-300);
    }
  `;
  
  const StyledLabel = styled.label`
    margin-top: 1rem;
  `;
  
  const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </>
    );
  };
  
const OrdersCard = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { ordersDetails } = useSelector(state => state.location)
  const { id } = useSelector(state => state.user)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();


  const confirmDelete = async (orderId) => {
    const res = await axios.delete(`http://localhost:5000/orders/${orderId}`)
  }

  return (
    <>
      <div className="orders">
        <div className="order_content">
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button onClick={()=> handleClickOpen() }>Delete</button>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
        color="warning"
      >
        <Alert color="warning" severity="warning">
          <AlertTitle>Are you sure you want to Delete this item? </AlertTitle>
          Deleting this item will cause <strong> irreversible</strong> changes
          
        </Alert>
        <Button variant="contained" color="success" onClick={handleClose}>Close</Button>
        <Button variant="contained" color="error" onClick={()=> confirmDelete(props.item._id)} autoFocus> DELETE </Button>
      </Dialog>
          {isEdit ? (
            <Formik
              initialValues={props.item}
              onSubmit={async (values, { setSubmitting }) => {
                  debugger;
                const formFields = {
                  ...ordersDetails,
                  ...values,
                  senderId: id,
                };
                const res = await axios.put(
                  `http://localhost:5000/orders`,
                  formFields
                );
              }}
            >
              <div className="authForm">
                <Form >
                  <MyTextInput
                    name="itemName"
                    type="text"
                    placeholder="Item name"
                  />
                  <MySelect label="" name="category" className="dropDown">
                    <option value="">Select a category</option>
                    <option value="Document">Document</option>
                    <option value="Clothing">Clothing</option>
                    <option value="HomeAppliance">Home appliance</option>
                    <option value="Food">Food</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Other">Other</option>
                  </MySelect>
                  <MyTextInput
                    name="weight"
                    type="number"
                    placeholder="Weight (in kg)"
                  />
                  <MyTextInput
                    label=""
                    name="itemDescription"
                    type="string"
                    placeholder="Item description"
                    className="descriptionInput"
                  />
                  <MyTextInput
                    label=""
                    name="pickupDate"
                    type="date"
                    placeholder="Pickup date"
                  />
                  <MySelect label="" name="pickUpTime" className="dropDown">
                    <option value="">Select a pick up time</option>
                    <option value="Morning">Morning </option>
                    <option value="Afternoon">Afternoon</option>
                  </MySelect>
                  <button className="btn" type="submit">
                    <span>Save</span> <TrendingFlatIcon />
                  </button>
                </Form>
              </div>
            </Formik>
          ) : (
            <>
              <p>
                Category: <span>{props.item.category}</span>
              </p>
              <p>
                Item Name: <span>{props.item.itemName}</span>
              </p>
              <p>
                Item Weight: <span>{props.item.weight}</span>
              </p>
              <p>
                Receiver Name: <span>{props.item.receiverName}</span>
              </p>
              <p>
                Receiver Phone: <span>{props.item.receiverPhoneNumber}</span>
              </p>
              <p>
                Pickup Date: <span>{props.item.pickupDate}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
