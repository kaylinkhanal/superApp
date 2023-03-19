import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAlertMessages,
  apiResStatus
} from '../../redux/reducers/notifySlice'
import '../../containers/auth/authForm.css'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import {
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'

const DynamicForm = props => {
  const { userRole } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [stepCount, setStepCount] = useState(1)
  const schema = Yup.object().shape({
    fullName: Yup.string()
      .min(5, 'Too Short')
      .required('Required'),
    registerEmail: Yup.string()
      .email('Invalid Email')
      .optional(),
    phoneNumber: Yup.string()
      .min(10, 'Invalid Phone Number')
      .max(10, 'Invalid Phone Number')
      .required('Required'),
    vehicleType: Yup.string().required('Vehicle Type is Required'),
    vehicleNumber: Yup.string()
      .min(5, 'Invalid Vehicle Number')
      .required('Required'),
    password: Yup.string()
      .required('Please enter your password')
      .min(8, 'Password must be atleast 8 characters long'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Must enter the same password'
    )
  })

  const DetermineFieldType = ({ item }) => {
    if (item.type === 'dropdown') {
      return (
        <>
          <InputLabel id="vehicleTypeLabel">{item.label}</InputLabel>
          <Select
            labelId="vehicleTypeLabel"
            id="vehicleType"
            name="vehicleType"
          >
            {item.options.map((item, id) => {
              return (
                <MenuItem key={id} value={item}>
                  {item}
                </MenuItem>
              )
            })}
          </Select>
        </>
      )
    }
    return (
      <Field
        name={item.label}
        type={item.type}
        placeholder={item.placeholder || item.label}
      />
    )
  }

  const submitFormData = async values => {
    const updatedValues = { ...values, ...props.additionalFields }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedValues)
    }
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}` + props.apiEndpoint,
      requestOptions
    )
    debugger
    const data = await res.json()
    navigate(props.onSuccessNavigation)
    if (res.status && data.message) {
      dispatch(setAlertMessages(data.message))
      dispatch(apiResStatus(true))
    } else {
      dispatch(apiResStatus(false))
    }
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={values => submitFormData(values)}
    //  validationSchema={schema}
    >
      {({ errors, touched, values }) => (
        <div className="form" style={{ background: userRole === 'user' ? 'rgb(168 41 115 / 12%)' : 'rgb(96 81 183 / 12%)' }}>
          <Form>
            {props.firstPageFields.map((item, id) => {
              return (
                <div key={id}>
                  <DetermineFieldType item={item} />
                </div>
              )
            })}
            <button className="btn" type="submit">
              <span>Submit</span> <TrendingFlatIcon />
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}
export default DynamicForm
