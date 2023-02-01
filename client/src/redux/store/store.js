import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from '../reducers/userSlice'
import logger from 'redux-logger'


const reducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;