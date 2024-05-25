import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '../store/toggleSlice';
import { video } from '../assets/index';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const UploadVideoPopup = () => {
  const { handleSubmit, register, setValue } = useForm();
  const { showPopup } = useSelector((store) => store.toggle);
  const [uploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [videoData, setVideoData] = useState({});
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(togglePopup());
    setIsUploaded(false);
    setIsUploading(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      // console.log('Dropped file:', droppedFile);
      setValue('videoFile', droppedFile); 
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      // console.log('Selected file:', selectedFile);
      setValue('videoFile', selectedFile);
    }
  };

  const accessToken = localStorage.getItem('accessToken');

  const onSubmit = async (data) => {
    // console.log('Form data:', data);
    setVideoData(data);
    setIsUploading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('videoFile', data.videoFile); 
    formDataToSend.append('thumbnail', data.thumbnail[0]); // Access first element
    formDataToSend.append('title', data.title);
    formDataToSend.append('description', data.description);
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(`${API_URL}/videos`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      setIsUploading(false);
      console.log(response?.data?.data);

      if (response.data.data) {
        setIsUploaded(true);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setIsUploading(false);
    }
  };

  if (showPopup && (uploading || isUploaded)) {
    return (
      <div className="fixed overflow-auto w-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-gray-800 w-[27rem] bg-opacity-80 shadow-md shadow-yellow-500 py-5 text-white rounded-lg px-8 pt-3 max-w-lg relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white hover:text-gray-300 focus:outline-none"
          >
            ✖️
          </button>

          <h2 className="text-xl font-semibold mb-0">Uploading... Videos</h2>
          <h4 className="text-sm text-gray-300 font-semibold mb-1">Track your video uploading process.</h4>

          <div className="w-full border flex items-start justify-start border-gray-400 rounded-lg px-1 py-1 text-center">
            <img src={video} alt="" className='h-12 w-12 saturate-200' />
            <div className='text-start'>
              <h3 className=' text-lg mt-1'>{videoData?.title}.mp4 </h3>
              <h4 className='text-sm text-gray-300'> {(videoData?.videoFile?.size / 1048576).toFixed(2)} mb</h4>

              {isUploaded ? (
                <div className='flex items-center'>
                  <span className="mt-1 inline-block w-6 rounded-full text-[#AE7AFF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="white" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M9 12l2 2l4-4"
                      />
                    </svg>
                  </span>
                  <p className='ml-2 text-base font-semibold'> Uploaded Successfully</p>
                </div>
                
              ) : (
                <div role="status" className='flex items-center'>
                  <svg aria-hidden="true" className="w-6 h-6 my-2 text-gray-200 animate-spin dark:text-gray-500 fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <p className='ml-2 text-base font-semibold'> Uploading...</p>
                </div>
              )}
            </div>
          </div>

          <div className='flex justify-around space-x-3'>
            <button onClick={handleClose} hidden={isUploaded} className='w-full my-2 py-2 rounded-lg border border-white bg-opacity-60 bg-slate-200 hover:bg-opacity-50 '> Cancel </button>
            <button onClick={isUploaded && handleClose} hidden={uploading} className='w-full my-2 py-2 rounded-lg border bg-green-700 bg-opacity-80 hover:bg-opacity-60 border-green-500'> Finish </button>
          </div>
        </div>
      </div>
    );
  } else if (showPopup) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="fixed overflow-auto w-full inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-gray-800 bg-opacity-80 shadow-md shadow-yellow-400 py-5 text-white rounded-lg px-8 pt-3 max-w-lg relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white hover:text-gray-300 focus:outline-none"
          >
            ✖️
          </button>

          <h2 className="text-xl font-semibold mb-1">Upload Videos</h2>

          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-full flex flex-col items-center border-dotted border-2 pb-3 border-gray-600 rounded-lg px-8 py-1 text-center">
              <span className="mt-1 inline-block w-10 rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-white">Drag and drop video files to upload</h3>
              <p className="text-gray-400 mb-2">Your videos will be private until you publish them.</p>

              <label
                htmlFor="videoFile"
                className="group/btn mr-1 pl-auto flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
              >
                Select Files
                <input
                  type="file"
                  {...register("videoFile", { required: false })}
                  onChange={handleFileSelect}
                  id="videoFile"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="thumbnail" className="block text-white mb-1">
              Thumbnail <sup>*</sup>
            </label>
            <input
              id="thumbnail"
              type="file"
              {...register('thumbnail', { required: true })}
              className="w-full border p-1 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="title" className="block text-white mb-1">
              Title <sup>*</sup>
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: true })}
              className="w-full border p-1 bg-gray-700 text-white rounded"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="description" className="block text-white mb-1">
              Description <sup>*</sup>
            </label>
            <textarea
              id="description"
              {...register('description', { required: true })}
              className="w-full h-24 border p-1 bg-gray-700 text-white rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="group/btn mt-2 ml-auto flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
};

export default UploadVideoPopup;
