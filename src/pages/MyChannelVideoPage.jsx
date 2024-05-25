import React, { useState } from 'react';
import { video } from '../assets/index';
import { UploadVideoPopup } from '../Components'; // Import the previously defined UploadVideoPopup component
import { togglePopup } from '../store/toggleSlice';
import { useDispatch } from 'react-redux';

const MyChannelVideoPage = () => {

  const dispatch = useDispatch();
 
  return (
    <div className=' absolute w-[93.79%]  '>
      <div className=' flex flex-col justif  bg-yellow-400 ml-[2px] min-h-80 items-center'>
        <img src={video} alt="" className='h-12 w-12' />
        <h1 className='font-medium text-lg pb-1'>No videos uploaded</h1>
        <p className='w-96 text-center pb-3'>This page has yet to upload a video. Search another page in order to find more videos.</p>
        <button 
        onClick={()=> dispatch(togglePopup())}
         className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
          + New Video
        </button>

      </div>

      

        <UploadVideoPopup />





    </div>
  );
};

export default MyChannelVideoPage;
