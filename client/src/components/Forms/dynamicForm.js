import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { assignUserRole } from "../../redux/reducers/userSlice"
import { setAlertMessages, apiResStatus } from '../../redux/reducers/notifySlice'
import '../../containers/auth/authForm.css'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import {
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'

const DynamicForm = (props) => {
  const { id } = useSelector(state => state.user)

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
    const [vehicleOption, setVehicleOption] = useState('')
    console.log(vehicleOption)

    if (item.type === 'dropdown') {
      return (
        <>
          <InputLabel id="vehicleTypeLabel">{item.label}</InputLabel>
          <Select
            labelId="vehicleTypeLabel"
            id="vehicleType"
            name="vehicleType"
            type={item.type}
            value={vehicleOption}
            onChange={(e) => setVehicleOption(e.target.value)}
          >
            {item.options.map((item, id) => {
              return (
                <MenuItem key={id} value={item}>{item}</MenuItem>
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
    let requestOptions = {
      method: !props.updateRole ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(!props.updateRole ? updatedValues
        : values, { userRole: 'user' ? 'rider' : 'user' })
    }

    const res = await fetch(
      `http://localhost:5000${props.apiEndpoint}/${props.updateRole ? id : ''}`,
      requestOptions
    )

    const data = await res.json()
    navigate(props.onSuccessNavigation)

    if (res.status && data.message) {
      dispatch(setAlertMessages(data.message))
      dispatch(apiResStatus(true))
    } else {
      dispatch(apiResStatus(false))
    }

    if (props.updateRole) {
      dispatch(assignUserRole(''))
    }
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={values => submitFormData(values)}
    //  validationSchema={schema}
    >
      {({ errors, touched, values }) => (
        <div className="form">
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
