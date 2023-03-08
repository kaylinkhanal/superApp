import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Formik, Form, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NavBar from '../../components/header/navBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { setAlertMessages, apiResStatus } from '../../redux/reducers/notifySlice'

const MyTextInput = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input> and alse replace ErrorMessage entirely.
	const [field, meta] = useField(props)

	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}

const MyCheckbox = ({ children, ...props }) => {
	const [field, meta] = useField({ ...props, type: 'checkbox' })
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
	)
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '';
    font-size: 10px;
  }
  @media (prefers-color-scheme: red) {
    color: var(--red-300);
  }
`

const StyledLabel = styled.label`
  margin-top: 1rem;
`

const MySelect = ({ label, ...props }) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input> and alse replace ErrorMessage entirely.
	const [field, meta] = useField(props)
	return (
		<>
			<StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
			<StyledSelect {...field} {...props} />
			{meta.touched && meta.error ? (
				<StyledErrorMessage>{meta.error}</StyledErrorMessage>
			) : null}
		</>
	)
}

// And now we can use these
const Order = () => {
	const { ordersDetails, senderCoordinates, receiverCoordinates } = useSelector(state => state.location)
	const { id } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	return (
		<>
			<NavBar />
			<Formik
				initialValues={{}}
				validationSchema={Yup.object({
					itemName: Yup.string()
						.min(3, 'Must be 3 characters or more')
						.required('Required'),
					weight: Yup.string()
						.min(1, 'Should be over 1 kg')
						.max(100, 'Should be under 100 kg')
						.required('Required'),
					itemDescription: Yup.string()
						.min(25, 'Must be 25 characters or more')
						.required('Required'),
					pickupDate: Yup.string().required('Required'),
					acceptedTerms: Yup.boolean()
						.required('Required')
						.oneOf([true], 'You must accept the terms and conditions.'),
					category: Yup.string()
						// specify the set of valid values for job type
						// @see http://bit.ly/yup-mixed-oneOf
						.oneOf(
							[
								'Document',
								'Clothing',
								'Electronics',
								'HomeAppliance',
								'Food',
								'Jewelry'
							],
							'Invalid Item Type'
						)
						.required(),
					pickUpTime: Yup.string()
						// specify the set of valid values for job type
						// @see http://bit.ly/yup-mixed-oneOf
						.oneOf(['Morning', 'Afternoon'], 'Invalid Time ')
						.required()
				})}
				onSubmit={async (values, { setSubmitting }) => {
					const formFields = { ...ordersDetails, ...values, senderId: id, receiverCoordinates, senderCoordinates }
					const res = await axios.post(`http://localhost:5000/orders`, formFields)

					console.log(res)
					console.log(res.data)

					// if (res.status == 200 && res.data) {
					//   dispatch(setAlertMessages(res.data))
					//   dispatch(apiResStatus(true))
					// } else {
					//   dispatch(apiResStatus(false))
					// }
				}}
			>
				<div className="authForm">
					<h1 className="h1">Create a new order</h1>
					<Form className="form">
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
						<MyCheckbox name="acceptedTerms" className="checkboxline">
							I accept the terms and conditions
						</MyCheckbox>

						<button
							className="btn"
							type="submit"
							onClick={() => navigate('/send-orders')}
						>
							{' '}
							<KeyboardBackspaceIcon /> <span>Back</span>{' '}
						</button>
						<button className="btn" type="submit">
							<span>Submit</span> <TrendingFlatIcon />
						</button>
					</Form>
				</div>
			</Formik>
		</>
	)
}
export default Order
