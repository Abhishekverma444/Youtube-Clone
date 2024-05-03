import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { createPlaylist, fetchUserPlaylists, addVideoToPlaylist, removeVideoFromPlaylist, updateVideoAddedToPlaylist, updateVideoRemovedFromPlaylist } from '../store/playlistSlice'
import { setFlashMessage } from '../store/flashMsgSlice';

const AddToPlaylist = ({ showPlaylist, videoId }) => {
  const { register, handleSubmit } = useForm();
  const { status, createdPlaylist, userPlaylists, videoAddedToPlaylist, videoRemovedFromPlaylist } = useSelector((state) => state.playlist)
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([]);
  const [playlist, setPlaylist] = useState({})

  // console.log(userPlaylists);
  // console.log("video",videoId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userData._id))
    // console.log('userPlaylists', userPlaylists);
    createdPlaylist._id && dispatch(setFlashMessage({ "message": createdPlaylist.name + ' playlist created successfully' }))
  }, [dispatch, createdPlaylist])

  const onSubmit = (data) => {
    dispatch(createPlaylist(data))
    dispatch(setFlashMessage({ "message": createdPlaylist.name + ' playlist created successfully' }))
  }

  const handleCheckboxChange = (playlistId) => {
    if (selectedPlaylistIds.includes(playlistId)) {
      setSelectedPlaylistIds((prevIds) => prevIds.filter((id) => id !== playlistId))

      // remove video from playlist
      dispatch(removeVideoFromPlaylist({ videoId, playlistId }));
      // console.log(videoRemovedFromPlaylist);
      videoRemovedFromPlaylist && dispatch(setFlashMessage({ "message": 'Removed video from ' + videoRemovedFromPlaylist.name }))
    } else {
      setSelectedPlaylistIds((prevIds) => [...prevIds, playlistId])

      // add video to playlist 
      dispatch(addVideoToPlaylist({ videoId, playlistId }))
      // console.log(videoAddedToPlaylist);
      videoAddedToPlaylist && dispatch(setFlashMessage({ "message": 'Added video to ' + videoAddedToPlaylist.name }))
    }
  };


  return showPlaylist && (
    <div className="max-w-md absolute overflow-visible z-30 mx-auto mt-12 border-2 border-[#c5ad14] p-6 bg-[#f0d318] shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Save to playlist</h2>

      <div className="max-w-md mx-auto ">
        {userPlaylists && userPlaylists.map((playlist) => (
          <div key={playlist._id} className="flex items-center mb-3">
            <input
              type="checkbox"
              id={`playlist-${playlist._id}`}
              className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={selectedPlaylistIds.includes(playlist._id)}
              onChange={() => handleCheckboxChange(playlist._id)}
            />
            <label
              htmlFor={`playlist-${playlist._id}`}
              className={`text-lg ${selectedPlaylistIds.includes(playlist._id) ? 'text-indigo-800 font-semibold' : 'text-gray-800'} cursor-pointer`}
              onChange={() => handleCheckboxChange(playlist._id)}
            >
              {playlist.name}
            </label>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='text-center'>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium pt-2 text-gray-700 text-left">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter playlist name"
            {...register("name", { required: true })}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`bg-indigo-500 ${(status === 'loading') ? 'opacity-70 cursor-not-allowed' : ''} text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300`}
        >
          {status === 'loading' ? 'Creating...' : 'Create new playlist'}
        </button>
      </form>
    </div>
  );
};

export default AddToPlaylist;
