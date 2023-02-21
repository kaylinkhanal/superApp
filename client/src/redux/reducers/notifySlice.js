import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    isApiSuccessMsgOpen: false,
    apiSuccessMessage: ''
};

const notifySlice = createSlice({
    name: "notify",
    initialState,
    reducers: {
        setAlertMessages: (state, actions) => {
            state.apiSuccessMessage = actions.payload
            state.isApiSuccessMsgOpen = true
        },
        resetAlertMessages: (state, actions) => {
            state.apiSuccessMessage = ''
            state.isApiSuccessMsgOpen = false
        },
    }
});

export const { setAlertMessages, resetAlertMessages } = notifySlice.actions;
export default notifySlice.reducer;