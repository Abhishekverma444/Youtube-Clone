import React from "react";
import { setFlashMessage } from "../store/flashMsgSlice";
import { useDispatch } from "react-redux";
import { FlashMessage } from "../Components";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/constants";

const EmptyPage = () => {

  const accessToken = localStorage.getItem('accessToken')

  const flashMsg = useSelector((store) => store.message)
  console.log(flashMsg);

  const dispatch = useDispatch()
  const handleClick = async () => {
    const response = await fetch(API_URL+"/users/current-user", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    console.log(data)

    dispatch(
      setFlashMessage({
        ['message']: data.message,
      })
    )
    setTimeout(()=>{
      dispatch(
        setFlashMessage({
          ['message']: null,
        })
      )
    }, 3000)

  }


  return (
    <div className="flex flex-col w-full ml-[6%]  mt-12 items-center bg-yellow-300 justify-center h-screen">
      <div className="bg-yellow-400 p-5 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.5 4A1.5 1.5 0 0 0 2 5.5v9A1.5 1.5 0 0 0 3.5 16h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 16.5 4h-13zM2 3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2H2z" />
          <path d="M9 13.5l5-3-5-3v6z" />
        </svg>
      </div>
      <p className="text-xl text-gray-600 font-semibold mb-4">No videos available</p>
      <p className="text-gray-600 max-w-80 text-center font-serif mb-8">There are no videos here available. Please try to search something else.</p>
      {/* You can replace the icon with any icon from your chosen icon library */}
      <button onClick={handleClick}>Click on me</button>
    </div>
  );
};

export default EmptyPage;