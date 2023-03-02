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
      state.senderCoordinates = actions.payload;
    },
    setOrdersDetails: (state, actions) => {
      const onlyKeys = Object.keys(actions.payload)
      const onlyValues = Object.values(actions.payload)
      onlyKeys.forEach((item,id)=>{
        state.ordersDetails[item] = onlyValues[id]
      })
    },
    setReceiverCoordinates: (state, actions) => {
      state.receiverCoordinates = actions.payload;
    },
  },
});

export const { setSenderCoordinates, setReceiverCoordinates ,setOrdersDetails} =
  locationSlice.actions;
export default locationSlice.reducer;
