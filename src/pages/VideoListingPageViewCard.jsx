import React, { useEffect, useRef } from 'react'
import { VideoCard } from '../Components'
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchVideos,
  updateSortBy,
  updateSortType,
  updateQuery,
  updateUserId,
  updatePage,
  updateLimit,
} from '../store/videoSlice';

const VideoListingPageViewCard = () => {
  const toggle = useSelector((state) => state.toggle)
  const search = useSelector((state) => state.search)

  const dispatch = useDispatch();
  const { sortBy, sortType, query, userId, page, limit, videos, status, error } = useSelector((state) => state.videos);
  const bottomBoundaryRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    dispatch(fetchVideos({ sortBy, sortType, query, userId, page, limit }))
  }, [sortBy, sortType, query, userId, page, limit])


  useEffect(() => { // for pagination
    const handleScroll = () => {
      if (bottomBoundaryRef.current && window.innerHeight + window.scrollY >= bottomBoundaryRef.current.offsetTop) {
        // If debounceTimeoutRef is null, set a timeout to increment the page after 500ms
        if (!debounceTimeoutRef.current) {
          debounceTimeoutRef.current = setTimeout(() => {
            // Increment page and fetch more videos
            dispatch(updatePage(page + 1));
            debounceTimeoutRef.current = null; // Reset debounceTimeoutRef
          }, 2000); // Set the delay to 500ms
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, page]);

  // console.log(page);

  return (
    <div >
        {status === 'loading' && <div className={`w-screen h-screen bg-yellow-300 flex justify-center items-center font-bold text-red-500 font-mono text-xl`}>Loading...</div>}
        {status === 'failed' && <div className={`w-screen h-screen bg-yellow-300 flex justify-center items-center font-bold text-red-500 font-mono text-xl`}>Error: {error}</div>}

      {status === 'succeeded' && (
        <div className={`flex flex-wrap justify-evenly px-5 mt-[7%]  ${toggle.status ? 'ml-[15%]' : 'ml-[6%]'}  bg-yellow-400`}>
          {videos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))
          }
        </div>
      )}
       <div ref={bottomBoundaryRef} style={{ height: '10px', background: 'transparent' }}></div>
    </div>
  )
}

export default VideoListingPageViewCard