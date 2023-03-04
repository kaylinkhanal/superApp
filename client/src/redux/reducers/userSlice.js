import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userRole: '',
  firstTimeUser: true,
  isLoggedIn: false,
  token: '',
  id: '',
  username: ''
};

//What is createSlice in Redux Toolkit?
//createSlice is a higher order function that accepts an initial state, an object full of reducer functions and a slice name. 

// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserRole: (state, actions) => {
      state.userRole = actions.payload
    },
    setIsFirstTimeUser: (state, actions) => {
      state.firstTimeUser = false
    },
    setLoginDetails: (state, actions) => {
      if (actions.payload) {
        const { token, id, username } = actions.payload
        state.token = token
        state.id = id
        state.username = username
      }
      state.isLoggedIn = !state.isLoggedIn
    }
  }
});

export const { assignUserRole, setIsFirstTimeUser, setLoginDetails } = userSlice.actions;
export default userSlice.reducer;