import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : 'search',
    initialState: {

    },
    reducers: {
        cacheResults: (state, action) => {
            state = Object.assign(state,action.payload); 
        },
        getSearchQuery: (state, action) => {
            state = Object.assign(state,action.payload); 
        }
    },
})

export const {cacheResults, getSearchQuery} = searchSlice.actions;

export default searchSlice.reducer;