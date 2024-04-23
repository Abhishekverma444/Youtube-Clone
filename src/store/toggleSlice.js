import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : 'toggle',
    initialState: {
        status: false,
    },
    reducers: {
        toggle: (state) => {
            state.status = !state.status; // Update the status property of state
       },
    },
})

export const {toggle} = toggleSlice.actions;

export default toggleSlice.reducer;