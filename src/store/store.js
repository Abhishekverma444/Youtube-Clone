import { configureStore } from "@reduxjs/toolkit";
import searchSlice from './searchSlice'
import toggleSlice from './toggleSlice'
import flashMsgSlice from "./flashMsgSlice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        toggle: toggleSlice,
        message: flashMsgSlice,
    }
})

export default store