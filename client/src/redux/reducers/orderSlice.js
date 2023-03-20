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
    changeOrderStatusId:  (state, actions) => {
      state.selectedCardDetails.orderStatusId++
    },
  }
});

export const { setOrdersDetails , changeOrderStatusId} =
  orderSlice.actions;
export default orderSlice.reducer;
