import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchPlaylistById, updatePlaylist } from '../store/playlistSlice'
import { PlaylistCard, VideoList } from '../Components'
import dateFormat, { masks } from 'dateformat'
import { video } from '../assets/index'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { useForm } from 'react-hook-form'


const ChannelPlaylistVideoPage = () => {
  const toggle = useSelector((state) => state.toggle)
  const { playlistByPlaylistId, updatedPlaylist } = useSelector((state) => state.playlist)
  const [playlist, setPlaylist] = useState({});
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const accessToken = localStorage.getItem('accessToken')
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId));
  }, [playlistId, updatedPlaylist])

  useEffect(() => {
    setPlaylist(playlistByPlaylistId);

    (playlistByPlaylistId?.videos?.length !== 0) ? getPlaylistVideos() : setVideos([]);
  }, [playlistByPlaylistId, playlistId, dispatch])

  useEffect(() => {
    if (playlist) {
      setValue('name', playlist.name);
      setValue('description', playlist.description);
    }
  }, [playlist, setValue]);

  const getPlaylistVideos = async () => {
    if (playlist?.videos?.length) {
      const result = await Promise.all(
        playlist.videos.map(async (videoId) => {
          const response = await axios.get(API_URL + '/videos/' + videoId, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          return response.data.data;
        })
      );
      setVideos(result);
    }
  }
  // console.log("videos", videos);

  const onSubmit = (data) => {
    dispatch(updatePlaylist({playlistId, formData:data}))
  };

  return (
    <div className={`w-full h-full m-0 p-0 bg  mt-[7.5%] ${toggle?.status ? 'ml-[15%]' : 'ml-[6.2%]'} bg-yellow-400 `}>
      {playlist._id && <div className={` ${toggle.status ? 'w-[450px]' : 'w-[375px]'} rounded-lg  m-2 pb-3 bg-[#fdde2e] cursor-pointer shadow-lg border border-yellow-500 overflow-hidden mx-6 my-4  select-none`} >
        <img src={video} alt='' className="w-full h-48 object-contain contrast-200  bg-stone-300" />

        <div className={`${toggle.status ? 'w-[35.5%]' : 'w-[29.6%]'} absolute`}>
          <div className='flex justify-between relative -top-[68px] shadow-sm bg-gray-200 opacity-80  px-3 py-2 border-t-2 border-white  items-center'>
            <div>
              <h1 className='text-xl font-medium contrast-200'>Playlist</h1>
              <h4 className=' font-medium contrast-200'>{dateFormat(playlist?.createdAt, 'mmmm dd, yyyy')}</h4>
            </div>
            <div className='font-medium contrast-200'>{playlist.videos.length} videos</div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className=' text-center'>
          <h1 className='pt-4 px-2 text-lg font-bold '>
            <input
              type='text'
              className='outline-none border-none bg-transparent w-full relative'
              {...register('name')}
            />
          </h1>
          <p className='px-2 text-base text-justify contrast-200 '>
            <textarea
              className='outline-none border-none bg-transparent w-full'
              rows='2'
              {...register('description', { required: true })}
            />
          </p>
          <button type='submit' className='w-full py-2 bg-blue-500 text-white hover:contrast-150 font-bold mt-'>
            Update Playlist
          </button>
        </form>
      </div>}



      <div className={`flex flex-col pl-3 pr-6  bg-yellow-400 `}>
        {videos.length && videos.map((video, index) => (
          <Link key={video._id} to={"/videos/" + video._id} >
            <VideoList video={video} isSmallList={false} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ChannelPlaylistVideoPage