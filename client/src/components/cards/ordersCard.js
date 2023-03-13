import React, { useState,useEffect } from 'react';
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { io } from 'socket.io-client';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { setAlertMessages, apiResStatus } from "../../redux/reducers/notifySlice"
import { setOrdersDetails } from "../../redux/reducers/orderSlice"
import DeleteAlert from '../alerts/deleteAlert';
const socket = io(process.env.REACT_APP_API_URL);
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

	useEffect(()=>{
	
		socket.on('connection');
		// socket.on('greetings',(anythingkataibata)=>{
		// 	console.log(anythingkataibata)
		// })
		return () => {
			socket.off('connection');
		  };
	})
	const [isEdit, setIsEdit] = useState(false)
	const [isDeleteConfirmPopup, setIsDeleteConfirmPopup] = useState(false)
	const dispatch = useDispatch()

	const { ordersDetails } = useSelector(state => state.location)
	const { selectedCardDetails } = useSelector(state => state.order)

	const { id } = useSelector(state => state.user)
	const confirmDelete = async (orderId) => {
		const res = await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${orderId}`)
		if (res) props.fetchOrders()
		setIsDeleteConfirmPopup(false)
	}

	const handleClose = () => {
		setIsDeleteConfirmPopup(false)
	}
	return (
		<>
		<button onClick={()=> socket.emit('greetings', 'hi')}>Send hi to server</button>
			</>
	)
}

export default OrdersCard;
