import React, { useEffect, useState } from 'react'
import { VideoCard } from '../Components'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'


const VideoListingPageViewCard = () => {
  const toggle = useSelector((store) => store.toggle)
  const search = useSelector((store) => store.search)
  const accessToken = localStorage.getItem('accessToken')
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    const response = await axios.get(API_URL + '/videos', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    setVideos(response.data.data)
  }
  console.log(videos);

  // videos.map((video)=>(console.log(video.title)))

  return (
    <div className={`flex flex-wrap justify-evenly px-5 mt-[7%]  ${toggle.status ? 'ml-[15%]' : 'ml-[6%]'}  bg-yellow-400`}>
      {
      videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))
    }
    </div>
  )
}

export default VideoListingPageViewCard