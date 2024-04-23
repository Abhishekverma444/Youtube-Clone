import { createSlice } from "@reduxjs/toolkit";

const flashMsgSlice = createSlice({
    name : 'message',
    initialState: {

    },
    reducers: {
        setFlashMessage: (state, action) => {
            state = Object.assign(state,action.payload);
       },
    },
})

export const {setFlashMessage} = flashMsgSlice.actions;

export default flashMsgSlice.reducer;