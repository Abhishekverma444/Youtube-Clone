import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchPlaylistById } from '../store/playlistSlice'
import { PlaylistCard, VideoList } from '../Components'
import axios from 'axios'
import { API_URL } from '../utils/constants'


const ChannelPlaylistVideoPage = () => {
  const toggle = useSelector((state) => state.toggle)
  const { playlistByPlaylistId } = useSelector((state) => state.playlist)
  const [playlist, setPlaylist] = useState({});
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const accessToken = localStorage.getItem('accessToken')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaylistById(playlistId));
  }, [playlistId])

  useEffect(() => {
    setPlaylist(playlistByPlaylistId);

    (playlistByPlaylistId?.videos?.length !== 0) ? getPlaylistVideos() : setVideos([]);
  }, [playlistByPlaylistId, playlistId, dispatch])

  const getPlaylistVideos = async () => {
    if(playlist?.videos?.length){
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


  return (
    <div className={`w-full h-full m-0 p-0 bg  mt-[7.5%] ${toggle?.status ? 'ml-[15%]' : 'ml-[6.2%]'} bg-yellow-400 `}>
      <div className='px-3'>{playlist._id && <PlaylistCard playlist={playlist}  />}</div>



      <div  className={`flex flex-col pl-3 pr-6  bg-yellow-400 `}>
          {videos.length && videos.map((video, index) => (
            <Link key={video._id}  to={"/videos/" + video._id} >
              <VideoList video={video} isSmallList={false} />
            </Link>
          ))}
        </div>
    </div>
  )
}

export default ChannelPlaylistVideoPage