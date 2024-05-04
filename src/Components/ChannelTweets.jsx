import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { user, like } from '../assets/index'
import { API_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setFlashMessage } from '../store/flashMsgSlice'
import dateFormat, { masks } from "dateformat";

const ChannelTweets = ({ tweet }) => {
    const [isLiked, setIsLiked] = useState(false);
    

    const accessToken = localStorage.getItem('accessToken')


    const dispatch = useDispatch();
    const handleLike = async(tweetId) => {
        setIsLiked((pre) => !pre)
        const response = await axios.post(API_URL+'/likes/toggle/t/'+tweetId, {}, 
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            alert(response.data.message);
           
        if(response.data.data){
            dispatch(setFlashMessage({["message"]: response.data.message}))
        }
    }
    return (
        <div >
            <div className='flex justify-items-start py-2 '  >
                <img src={tweet.avatar} alt="" className='h-16 w-16 absolute rounded-full border-2 mr-4 my-2 object-cover' />
                <div className='mt-2 pl-20'>
                    <span className='text-lg font-medium mr-3'>{tweet.fullname}</span>
                    <span className='text-sm text-gray-700 font-medium'>{dateFormat(tweet?.createdAt, 'mmmm dd, yyyy')}</span>
                    <p className='mt-1 text-gray-800 font-medium text-wrap mr-3'>{tweet.tweet}</p>

                    <button onClick={()=>handleLike(tweet._id)} className={`flex items-center rounded-full border bg-yellow-200 px-6 py-2 mt-2 hover:scale-110 `}>
                        <img src={like} alt="" className="h-5 w-5 mr-1" />
                    </button>

                </div>
            </div>


        </div>
    )
}

export default ChannelTweets