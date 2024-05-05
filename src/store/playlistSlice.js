import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import axios from "axios";

const initialState={
    userPlaylists: [],
    playlistByPlaylistId: {},
    createdPlaylist: {},
    videoAddedToPlaylist: {},
    videoRemovedFromPlaylist: {},
    deletedPlaylist: {},
    updatedPlaylist: {},
    status: 'idle',
    error: null,
}

const accessToken = localStorage.getItem('accessToken')
// console.log("accessToken", accessToken);

export const createPlaylist = createAsyncThunk('playlist/createPlaylist', async (formData) => {
    // name: , description: 
    const url = API_URL+`/playlist`;
    try {
        const response = await axios.post(url,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log(response);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to create playlist');
    }
})

export const fetchUserPlaylists = createAsyncThunk('playlist/fetchUserPlaylists', async (userId) => {
    // console.log(userId);
    const url = API_URL+`/playlist/user/${userId}`;
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
        throw new Error('Failed to fetch user playlists');
    }
})

export const fetchPlaylistById = createAsyncThunk('playlist/fetchPlaylistById', async (playlistId) => {
 
    const url = API_URL+`/playlist/${playlistId}`;
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
        throw new Error('Failed to fetch playlist by id');
    }
})

export const addVideoToPlaylist = createAsyncThunk('playlist/addVideoToPlaylist', async ({videoId, playlistId}, {getState}) => {
    // console.log("from playlist",videoId,playlistId);
    const url = API_URL+`/playlist/add/${videoId}/${playlistId}`;
    try {
        const response = await axios.patch(url, 
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log(response);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to add video to playlist');
    }
})

export const removeVideoFromPlaylist = createAsyncThunk('playlist/removeVideoFromPlaylist', async ({videoId, playlistId}, {getState} ) => {
    // console.log("from remove playlist",videoId,playlistId);
    const url = API_URL+`/playlist/remove/${videoId}/${playlistId}`;
    try {
        const response = await axios.patch(url, 
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log('removeRes',response.data.data);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to remove video from playlist');
    }
})

export const deletePlaylist = createAsyncThunk('playlist/deletePlaylist', async ( playlistId ) => {
    const url = API_URL+`/playlist/${playlistId}`;
    try {
        const response = await axios.delete(url, 
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log(response);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to delete playlist');
    }
})

export const updatePlaylist = createAsyncThunk('playlist/updatePlaylist', async ( {playlistId, formData}, {getState} ) => {
    // console.log(formData);
    const url = API_URL+`/playlist/${playlistId}`;
    try {
        const response = await axios.patch(url, 
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // console.log(response);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to update playlist');
    }
})


const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    
    extraReducers(builder) {
        builder
            // Reducer for createPlaylist
            .addCase(createPlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.createdPlaylist = action.payload;
                state.status = 'succeeded';
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for fetchUserPlaylists
            .addCase(fetchUserPlaylists.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserPlaylists.fulfilled, (state, action) => {
                state.userPlaylists = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserPlaylists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for fetchPlaylistById
            .addCase(fetchPlaylistById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPlaylistById.fulfilled, (state, action) => {
                state.playlistByPlaylistId = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPlaylistById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for addVideoToPlaylist
            .addCase(addVideoToPlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
                state.videoAddedToPlaylist = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addVideoToPlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for removeVideoFromPlaylist
            .addCase(removeVideoFromPlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
                state.videoRemovedFromPlaylist = action.payload;
                state.status = 'succeeded';
            })
            .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for deletePlaylist
            .addCase(deletePlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.deletePlaylist = action.payload;
                state.status = 'succeeded';
            })
            .addCase(deletePlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Reducer for updatePlaylist
            .addCase(updatePlaylist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePlaylist.fulfilled, (state, action) => {
                state.updatePlaylist = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updatePlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { updateVideoAddedToPlaylist, updateVideoRemovedFromPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
