import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from '../utils/constants'

const initialState = {
    videoRes: [],
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
    // console.log(accessToken);
    const { sortBy, sortType, query, userId, page, limit } = params;
    const url = API_URL + `/videos?sortBy=${sortBy}&sortType=${sortType}&query=${query}&userId=${userId}&page=${page}&limit=${limit}`;
    // console.log("query", query);
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
            state.videoRes = [];
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
                // console.log("action.payload", action.payload);
                if (action.payload.length === 0) {
                    // Clear videos array if fetched result is empty and query has changed
                    if (state.query !== '') {
                        state.videoRes = [];
                    }
                } else {
                    // Append the fetched videos to the existing videos array
                    state.videoRes = [...state.videoRes, ...action.payload];

                    // If videos array exceeds a certain limit, remove the oldest videos
                    const maxVideos = 3; // Define your maximum number of videos here
                    if (state.videoRes.length > maxVideos) {
                        state.videoRes = state.videoRes.slice(state.videoRes.length - maxVideos);
                    }
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
    updateVideos
} = videoSlice.actions;

export default videoSlice.reducer;