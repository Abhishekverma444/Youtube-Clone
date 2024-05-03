import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { VideoList , VideoDescription, VideoComment} from '../Components';
import { Link } from 'react-router-dom';

const VideoDetailsPage = () => {
  const [video, setVideo] = useState(null);
  const toggle = useSelector((state) => state.toggle)
  const params = useParams();
  const { videoRes } = useSelector((state) => state.videos);

  useEffect(() => {
    const filteredVideo = videoRes[0]?.videos.filter((video) => video._id === params.videoId)[0];
    // console.log(filteredVideo);
    setVideo(filteredVideo)
  }, [params.videoId])



  return (
    <div className={`w-full h-full m-0 p-0 bg flex flex-row px-5 mt-[7%] pt-4 ${toggle.status ? 'ml-[15%]' : 'ml-[6%]'} bg-yellow-400 `}>
    <div className='w-[62%] h-[35%] relative '>
      <div style={{ paddingTop: '56.25%', position: 'relative', margin:'4px 2px', }}>
        <video
          src={video?.videoFile}
          controls
          className="absolute top-0 left-0 w-full h-full border-4 border-[#fdde2e]"
          style={{ objectFit: 'cover' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <VideoDescription video={video}/>
      <VideoComment video={video}/>
    
    </div>
    <div className={`flex flex-col w-[40%] h-[20%] px-5 bg-yellow-400 `}>
      {videoRes[0]?.videos &&
        videoRes[0]?.videos.map((video) => (
          <Link key={video._id} to={`/videos/${video._id}`}>
            <VideoList video={video} isSmallList={true} />
          </Link>
        ))}
    </div>
  </div>
  )
}

export default VideoDetailsPage