import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderCoordinates: {},
  ordersDetails: {},
  receiverCoordinates: {},
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderCoordinates: (state, actions) => {
      console.log(actions.payload);
      state.senderCoordinates = actions.payload;
    },
    setOrdersDetails: (state, actions) => {
      state.ordersDetails[actions.payload] = actions.payload
    },
    setReceiverCoordinates: (state, actions) => {
      state.receiverCoordinates = actions.payload;
    },
  },
});

export const { setSenderCoordinates, setReceiverCoordinates ,setOrdersDetails} =
  locationSlice.actions;
export default locationSlice.reducer;
