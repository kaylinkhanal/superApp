import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    selectedCardDetail: {}
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setSelectedCardDetails: (state, actions) => {
            state.selectedCardDetail = actions.payload;
        },
    },
});

export const { setSelectedCardDetails } = orderSlice.actions;
export default orderSlice.reducer;
