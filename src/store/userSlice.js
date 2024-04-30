import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState: {
    
    },
    reducers: {
        setUserData: (state, action) => {
            state = Object.assign(state,action.payload); 
        },
       
    },
})

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;