import { configureStore } from "@reduxjs/toolkit";
import searchSlice from './searchSlice'
import toggleSlice from './toggleSlice'
import flashMsgSlice from "./flashMsgSlice";
import videoSlice from './videoSlice'
import userSlice from "./userSlice";
import playlistSlice from "./playlistSlice";
import commentSlice from './commentSlice'

const store = configureStore({
    reducer: {
        search: searchSlice,
        toggle: toggleSlice,
        message: flashMsgSlice,
        videos: videoSlice,
        user: userSlice,
        playlist: playlistSlice,
        comment: commentSlice,
    }
})

export default store