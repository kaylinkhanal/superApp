import React, { useState } from 'react';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { setAlertMessages } from "../../redux/reducers/notifySlice"

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
	const [isEdit, setIsEdit] = useState(false)
	const dispatch = useDispatch()

	const { ordersDetails } = useSelector(state => state.location)
	const { id } = useSelector(state => state.user)
	return (
		<>
			<div className="orders" >
				{!isEdit &&
					<div className='update_field'>
						<button className='random_btn' onClick={() => setIsEdit(!isEdit)}><EditOutlinedIcon /></button>
						<button className='random_btn'><DeleteOutlineOutlinedIcon /></button>
					</div>
				}
				<div className="order_content">
					{isEdit ?
						<Formik
							initialValues={props.item}
							onSubmit={async (values) => {
								const formFields = { ...ordersDetails, ...values, senderId: id }
								const res = await axios.put(`http://localhost:5000/orders`, formFields)
								console.log(res)
								if (res.status && res.data.message && isEdit) {
									dispatch(setAlertMessages(res.data.message))
								}
								setIsEdit()
							}}
						>

							<Form>
								<MyTextInput name="itemName" type="text" placeholder="Item name" />
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

								<button style={{ padding: '10px 20px', color: '#fff', background: '#a82973', border: 0, marginRight: '5px' }} type="submit"><span>Save</span></button>
								<button onClick={() => isEdit} style={{ padding: '10px 20px', color: '#fff', background: '#a82973', border: 0 }} type="submit"><span>cancle</span></button>
							</Form>
						</Formik> :

						<>
							<p><i><BookmarkBorderOutlinedIcon /></i> <span>{props.item.category}</span></p>
							<p><CardGiftcardOutlinedIcon /> <span>{props.item.itemName}</span></p>
							<p><ScaleOutlinedIcon /> <span>{props.item.weight} kg</span></p>
							<p><ContactPageOutlinedIcon /> <span>{props.item.receiverName}</span></p>
							<p><PhoneIphoneOutlinedIcon /> <span>{props.item.receiverPhoneNumber}</span></p>
							<p><CalendarMonthOutlinedIcon /> <span>{props.item.pickupDate}</span></p>
						</>
					}
				</div>
			</div>
		</>
	)
}

export default OrdersCard;
