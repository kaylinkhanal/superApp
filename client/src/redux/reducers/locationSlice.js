import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderCoordinates: {},
  receiverCoordinates: {},
  
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderCoordinates: (state, actions) => {
     console.log(actions.payload)
     state.senderCoordinates= actions.payload
    },
  }
});

export const { setSenderCoordinates} = locationSlice.actions;
export default locationSlice.reducer;