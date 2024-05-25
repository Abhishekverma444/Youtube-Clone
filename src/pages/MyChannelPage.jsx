import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscriber, user, tweet, video, folder } from '../assets/index'
import { Outlet, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'

const MyChannelPage = () => {
  const toggle = useSelector((state) => state.toggle)
  const [selected, setSelected] = useState('video');
  const [channel, setChannel] = useState({});
  const userData = JSON.parse(localStorage.getItem('userData'));
  const accessToken = localStorage.getItem('accessToken')

  const dispatch = useDispatch();

  // console.log(userData);

  useEffect(() => {
    const getUserChannelProfile = async () => {
      const response = await axios.get(API_URL + '/users/c/' + userData?.username,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
      // console.log(response.data.data);
      setChannel(response.data.data)
    }
    getUserChannelProfile();
  }, [userData?.username])



  // console.log(toggle);
  return (
    <div className={`w-full h-full m-0 p-0 bg mt-[7.5%]  ${toggle?.status ? 'ml-[15%]' : 'ml-[6.2%]'} bg-yellow-400`}>
      <img src={channel?.coverImage} alt="" className='h-52 w-full object-cover' />
      <div className='px-4 flex relative h-full justify-between'>
        <img src={channel?.avatar} alt="" className='absolute bg-white left-7 -top-8 z-10 h-28 w-28 border-2 rounded-full object-cover scale-105' />
        <div className='ml-36'>
          <h1 className='font-medium text-xl text-gray-900 mt-4 mb-2'>{channel?.fullname}</h1>
          <div className="font-normal text-gray-700">@{channel?.username}</div>
          <div className="font-normal text-gray-700 mb-5">{channel?.subscribersCount} subscribers • {channel?.channelsSubscribedToCount} subscribed</div>
        </div>


        <button className="group/btn my-auto pr-5 mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
          🖋️ Edit
        </button>


      </div>
      <div className='px-4 pb-4 border-b mb-4 flex justify-between'>
        <Link
          to='/myChannel'
          onClick={() => setSelected('video')}
          className={`font-semibold ${selected === "video" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}
        >Videos</Link>

        <Link
          to='/myChannel/playlist'
          onClick={() => setSelected('playlist')}
          className={`font-semibold ${selected === "playlist" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}
        >Playlists</Link>

        <Link
          to='/myChannel/tweet'
          onClick={() => setSelected('tweet')}
          className={`font-semibold ${selected === "tweet" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}
        >Tweets</Link>

        <Link
          to='/myChannel/subscribed'
          onClick={() => setSelected('subscribed')}
          className={`font-semibold ${selected === "subscribed" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}
        >Subscribed</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default MyChannelPage