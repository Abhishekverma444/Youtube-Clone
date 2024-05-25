import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : 'toggle',
    initialState: {
        status: false,
        showPopup: false,
    },
    reducers: {
        toggle: (state) => {
            state.status = !state.status; // Update the status property of state
       },
       togglePopup: (state) => {
        state.showPopup = !state.showPopup;
       }
    },
})

export const {toggle, togglePopup} = toggleSlice.actions;

export default toggleSlice.reducer;