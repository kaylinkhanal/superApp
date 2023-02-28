import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaEdit, FaTrashAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import {
  BsFillTelephoneFill,
  BsFillCalendarDateFill,
  BsFillFilePersonFill,
} from "react-icons/bs";

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
  const { ordersDetails } = useSelector((state) => state.location);
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // shorten address and date to accomodate inside orders card
  const shortAddr = props.item.receiverAddress.split(",");
  const displayShortAddr = [shortAddr[0], shortAddr[1]];

  return (
    <>
      <div className="orders">
        <div className="order_content">
          <div className="orders-card-header">
            <FaEdit size={18} onClick={() => setIsEdit(!isEdit)} />
            <FaTrashAlt />
          </div>
          {isEdit ? (
            <Formik
              initialValues={props.item}
              onSubmit={async (values, { setSubmitting }) => {
                debugger;
                setIsEdit(false);
                const formFields = {
                  ...ordersDetails,
                  ...values,
                  senderId: id,
                };
                const res = await axios.put(
                  `http://localhost:8000/orders`,
                  formFields
                );
              }}
            >
              <>
                <Form className="orders-edit-card">
                  <div>
                    <MySelect
                      label=""
                      name="category"
                      className="dropDown orders-card-edit-item"
                    >
                      <option value="">Select a category</option>
                      <option value="Document">Document</option>
                      <option value="Clothing">Clothing</option>
                      <option value="HomeAppliance">Home appliance</option>
                      <option value="Food">Food</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Other">Other</option>
                    </MySelect>
                    <MyTextInput
                      name="itemName"
                      type="text"
                      placeholder="Item name"
                      className="dropDown orders-card-edit-item"
                    />
                    <MyTextInput
                      name="weight"
                      type="number"
                      placeholder="Weight"
                      className="dropDown orders-card-edit-item"
                    />
                  </div>

                  <div>
                    <MyTextInput
                      label=""
                      name="pickupDate"
                      type="date"
                      placeholder="Pickup date"
                      className="dropDown orders-card-edit-item"
                    />
                    <MySelect
                      label=""
                      name="pickUpTime"
                      className="dropDown orders-card-edit-item"
                    >
                      <option value="">Select a pick up time</option>
                      <option value="Morning">Morning </option>
                      <option value="Afternoon">Afternoon</option>
                    </MySelect>
                  </div>
                  <div>
                    <MyTextInput
                      sx={{ width: 300 }}
                      label=""
                      name="itemDescription"
                      type="string"
                      placeholder="Item description"
                      className="dropDown text-area"
                    />
                  </div>
                  <p className="submit-button">
                    <button type="submit">Done</button>
                  </p>
                </Form>
              </>
            </Formik>
          ) : (
            <div className="orders-card">
              <div>
                <p>
                  <span>{props.item.category}</span>
                </p>
                <p>
                  <span>{props.item.itemName}</span>
                </p>

                <p>
                  <span>{props.item.weight} KG</span>
                </p>
              </div>

              <div>
                <p>
                  <BsFillCalendarDateFill size={15} />
                  <span>{props.item.pickupDate.slice(0, 10)}</span>
                </p>
                <p>
                  <FaClock size={15} />
                  <span>{props.item.pickUpTime}</span>
                </p>
              </div>

              <div>
                <p>
                  <BsFillFilePersonFill size={15} />
                  <span>{props.item.receiverName}</span>
                </p>
                <p>
                  <BsFillTelephoneFill size={15} />
                  <span>{props.item.receiverPhoneNumber}</span>
                </p>
              </div>

              <p>
                <FaMapMarkerAlt size={15} />
                <span>{displayShortAddr}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersCard;
