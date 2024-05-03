import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import axios from "axios";

const initialState = {
    videoComments: [],
    commentAdded: {},
    updatedComment: {},
    deletedComment: {},
    status: 'idle',
    error: null,
}

const accessToken = localStorage.getItem('accessToken');

export const addComment = createAsyncThunk('comment/addComment', async ({ videoId, content }, { getState }) => {
    const url = API_URL + `/comments/${videoId}`;
    try {
        const response = await axios.post(url, content,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to add the comment.')
    }
})

export const getVideoComments = createAsyncThunk('comment/getVideoComments', async ({videoId, limit=10, page=1}) => {
    // console.log("videoId", videoId);
    const url = API_URL+`/comments/${videoId}?page=${page}&limit=${limit}`;
    try {
        const response = await axios.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        // console.log("videoCommentsRes",response);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to get video comments')
    }
})

export const updateComment = createAsyncThunk('comment/updateComment', async ({ commentId, content }, { getState }) => {
    const url = API_URL + `/comments/c/${commentId}`;
    try {
        const response = await axios.patch(url, content,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to update the comment.')
    }
})

export const deleteComment = createAsyncThunk('comment/deleteComment', async (commentId) => {
    const url = API_URL + `/comments/c/${commentId}`;
    try {
        const response = await axios.delete(url,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to delete the comment.')
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,

    extraReducers(builder) {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                state.commentAdded = action.payload;
            })
            .addCase(getVideoComments.fulfilled, (state, action) => {
                state.videoComments = action.payload;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.updatedComment = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.deletedComment = action.payload;
            })
            .addMatcher(
                (action) => [
                    addComment.pending,
                    getVideoComments.pending,
                    updateComment.pending,
                    deleteComment.pending,
                ].includes(action.type),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => [
                    addComment.rejected,
                    getVideoComments.rejected,
                    updateComment.rejected,
                    deleteComment.rejected,
                ].includes(action.type),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    }
});


export const { } = commentSlice.actions;
export default commentSlice.reducer;