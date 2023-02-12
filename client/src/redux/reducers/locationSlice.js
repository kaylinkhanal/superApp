import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderCoordintes: {},
  receiverCoordinates: {},
};

//What is createSlice in Redux Toolkit?
//createSlice is a higher order function that accepts an initial state, an object full of reducer functions and a slice name.

// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderCoordinates: (state, actions) => {
      console.log(actions.payload);
      state.senderCoordintes = actions.payload;
    },
    setReceiverCoordintes: (state, actions) => {
      state.firstTimeUser = false;
    },
  },
});

export const { setSenderCoordinates } = locationSlice.actions;
export default locationSlice.reducer;
