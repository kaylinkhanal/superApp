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
    }
  },
});

export const {setOrdersDetails} =
orderSlice.actions;
export default orderSlice.reducer;
