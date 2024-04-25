import { configureStore } from "@reduxjs/toolkit";
import searchSlice from './searchSlice'
import toggleSlice from './toggleSlice'
import flashMsgSlice from "./flashMsgSlice";
import videoSlice from './videoSlice'

const store = configureStore({
    reducer: {
        search: searchSlice,
        toggle: toggleSlice,
        message: flashMsgSlice,
        videos: videoSlice,
    }
})

export default store