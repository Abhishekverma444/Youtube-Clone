import { configureStore } from "@reduxjs/toolkit";
import searchSlice from './searchSlice'
import toggleSlice from './toggleSlice'
import flashMsgSlice from "./flashMsgSlice";
import videoSlice from './videoSlice'
import userSlice from "./userSlice";
import playlistSlice from "./playlistSlice";

const store = configureStore({
    reducer: {
        search: searchSlice,
        toggle: toggleSlice,
        message: flashMsgSlice,
        videos: videoSlice,
        user: userSlice,
        playlist: playlistSlice,
    }
})

export default store