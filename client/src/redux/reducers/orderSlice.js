import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  selectedCardDetails: {}
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrdersDetails: (state, actions) => {
      state.selectedCardDetails = actions.payload;
    },
    changeOrderStatusID: (state, actions) => {
      state.selectedCardDetails.orderStatusId++
      console.log(state.selectedCardDetails.orderStatusId)
    }
  },
});

export const { setOrdersDetails, changeOrderStatusID } = orderSlice.actions;
export default orderSlice.reducer;
