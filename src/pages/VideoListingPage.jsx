import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VideoCard, VideoList } from '../Components';
import { EmptyPage } from './index';
import { fetchVideos, updateQuery, updatePage } from '../store/videoSlice';
import { Link } from 'react-router-dom';

const VideoListingPage = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggle);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const { sortBy, sortType, query, userId, page, limit, videoRes, status, error } = useSelector((state) => state.videos);

  const [isMounted, setIsMounted] = useState(false);

  const handleNextPage = () => {
    dispatch(updatePage(page + 1)); // Increase page number
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(updatePage(page - 1)); // Decrease page number, ensuring it doesn't go below 1
    }
  };

  // Update query based on search input, but only after initial render
  useEffect(() => {
    if (isMounted) {
      if (searchQuery) {
        dispatch(updateQuery(searchQuery));
      } else {
        dispatch(updateQuery(''));
      }
    } else {
      setIsMounted(true); // Set isMounted to true after the first render
    }
  }, [isMounted, searchQuery, dispatch]);

  // Fetch videos when query, sorting options, or pagination parameters change
  useEffect(() => {
    dispatch(fetchVideos({ sortBy, sortType, query, userId, page, limit }));
  }, [dispatch, sortBy, sortType, query, userId, page, limit]);


  // console.log(videoRes[0]?.videos);

  return (
    <div className='w-full m-0 p-0 bg bg-yellow-300'>
      {status === 'loading' && (
        <p className='w-screen h-screen bg-yellow-300 flex justify-center items-center font-bold text-red-500 font-mono text-xl'>
          Loading...
        </p>
      )}
      {status === 'failed' && (
        <p className="w-screen h-screen flex justify-center items-center bg-yellow-300 text-red-700 font-medium italic text-2xl">
          <p className='w-96  text-center'>Login required or an error occurred. Please try again.</p>
        </p>
      )}

      {status === 'succeeded' && searchQuery ? (
        <div className={`flex flex-col  px-5 mt-[7%] pt-4 ${toggle.status ? 'ml-[15%]' : 'ml-[6%]'} bg-yellow-400 `}>
          {videoRes[0]?.videos && videoRes[0]?.videos.map((video, index) => (
            <Link key={video._id} to={"/videos/" + video._id} >
              <VideoList video={video} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={`flex flex-wrap justify-evenly px-5 mt-[7%] pt-4 ${toggle.status ? 'ml-[15%]' : 'ml-[6%]'} bg-yellow-400 `}>
          {videoRes[0]?.videos && videoRes[0]?.videos.map((video, index) => (
            <Link key={video._id} to={"/videos/" + video._id} >
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      )}

      {videoRes[0]?.videos.length === 0 && <EmptyPage />}

      <div className={`bg-yellow-400 ${toggle.status ? 'ml-[15%] w-[85%]' : 'ml-[6%] w-[94%]'} absolute`}>
        <div className='flex justify-center my-4'>
          <button onClick={handlePrevPage} className='bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded-lg mr-4'>
            {/* Left Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-3 rounded-lg'>Page: {page}</div>
          <button onClick={handleNextPage} className='bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-2 px-4 rounded-lg'>
            {/* Right Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoListingPage;
