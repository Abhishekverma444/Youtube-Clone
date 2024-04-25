import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    videos: [],
    sortBy: 'descDur',
    sortType: 'all',
    query: '',
    userId: '',
    page: 1,
    limit: 10,
    status: 'idle',
    error: null,
}

// Define an async thunk to fetch videos
export const fetchVideos = createAsyncThunk('videos/fetchVideos', async (params) => {
    const { sortBy, sortType, query, userId, page, limit } = params;
    const url = `{{server}}/videos?sortBy=${sortBy}&sortType=${sortType}&query=${query}&useId=${userId}&page=${page}&limit=${limit}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch videos');
    }
});


const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        updateSortBy(state, action) {
            state.sortBy = action.payload;
        },
        updateSortType(state, action) {
            state.sortType = action.payload;
        },
        updateQuery(state, action) {
            state.query = action.payload;
        },
        updateUserId(state, action) {
            state.userId = action.payload;
        },
        updatePage(state, action) {
            state.page = action.payload;
        },
        updateLimit(state, action) {
            state.limit = action.payload;
        },
    },
    extraReducers: {
        [fetchVideos.pending]: (state) => {
          state.status = 'loading';
        },
        [fetchVideos.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.videos = action.payload;
        },
        [fetchVideos.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      },
});

export const {
    updateSortBy,
    updateSortType,
    updateQuery,
    updateUserId,
    updatePage,
    updateLimit,
} = videoSlice.actions;

export default videoSlice.reducer;