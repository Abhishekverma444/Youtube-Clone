import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from '../utils/constants'

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
    const accessToken = localStorage.getItem('accessToken')
    const { sortBy, sortType, query, userId, page, limit } = params;
    const url = API_URL + `/videos?sortBy=${sortBy}&sortType=${sortType}&query=${query}&useId=${userId}&page=${page}&limit=${limit}`;
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            // console.log(response);
        return response.data.data;
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
    extraReducers(builder) {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.videos = action.payload;
                // Append the fetched videos to the existing videos array
                state.videos = [...state.videos, ...action.payload];

                // If videos array exceeds a certain limit, remove the oldest videos
                const maxVideos = 6; // Define your maximum number of videos here
                if (state.videos.length > maxVideos) {
                    state.videos = state.videos.slice(state.videos.length - maxVideos);
                }
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
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