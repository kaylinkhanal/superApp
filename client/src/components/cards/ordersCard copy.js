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
const OrdersCard = props => {
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleteConfirmPopup, setIsDeleteConfirmPopup] = useState(false)
  const dispatch = useDispatch()

  const { ordersDetails } = useSelector(state => state.location)
  const { selectedCardDetails } = useSelector(state => state.order)

  const { id } = useSelector(state => state.user)
  const confirmDelete = async orderId => {
    const res = await axios.delete(`http://localhost:5000/orders/${orderId}`)
    if (res) props.fetchOrders()
    setIsDeleteConfirmPopup(false)
  }
  const handleClose = () => {
    setIsDeleteConfirmPopup(false)
  }
  return (
    <>
      <div
        onClick={() => dispatch(setOrdersDetails(props.item))}
        className="orders"
        style={{
          backgroundColor:
            selectedCardDetails._id == props.item._id ? 'aqua' : null
        }}
      >
        {!isEdit && (
          <div className="update_field">
            <button className="random_btn" onClick={() => setIsEdit(!isEdit)}>
              <EditOutlinedIcon />
            </button>
            <button
              className="random_btn"
              onClick={() => setIsDeleteConfirmPopup(true)}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          </div>
        )}
        <DeleteAlert
          confirmDelete={confirmDelete}
          handleClose={handleClose}
          isDeleteConfirmPopup={isDeleteConfirmPopup}
          itemId={props.item._id}
        />
        <div className="order_content">
          {isEdit ? (
            <Formik
              initialValues={props.item}
              onSubmit={async values => {
                const formFields = { ...ordersDetails, ...values, senderId: id }
                const res = await axios.put(
                  `http://localhost:5000/orders`,
                  formFields
                )
                if (res.status && res.data.message && isEdit) {
                  dispatch(setAlertMessages(res.data.message))
                  dispatch(apiResStatus(true))
                  await props.fetchOrders()
                }
                setIsEdit()
              }}
            >
              <Form>
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
                <button
                  style={{
                    padding: '10px 20px',
                    color: '#fff',
                    background: '#a82973',
                    border: 0,
                    marginRight: '5px'
                  }}
                  type="submit"
                >
                  <span>Save</span>
                </button>
                <button
                  onClick={() => isEdit}
                  style={{
                    padding: '10px 20px',
                    color: '#fff',
                    background: '#a82973',
                    border: 0
                  }}
                >
                  <span>cancle</span>
                </button>
              </Form>
            </Formik>
          ) : (
            <>
              <p>
                <i>
                  <BookmarkBorderOutlinedIcon />
                </i>{' '}
                <span>{props.item.category}</span>
              </p>
              <p>
                <CardGiftcardOutlinedIcon /> <span>{props.item.itemName}</span>
              </p>
              <p>
                <ScaleOutlinedIcon /> <span>{props.item.weight} kg</span>
              </p>
              <p>
                <CalendarMonthOutlinedIcon />{' '}
                <span>{props.item.pickupDate}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default OrdersCard
