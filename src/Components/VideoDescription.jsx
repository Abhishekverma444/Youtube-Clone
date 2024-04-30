import React, { useEffect, useState } from 'react';
import { dislike, like, folder, subscriber, user } from '../assets/index'
import { motion } from 'framer-motion';
import dateFormat, { masks } from "dateformat";
import { API_URL } from '../utils/constants'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AddToPlaylist } from '../Components'

const VideoDescription = ({ video }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribers, setSubscribers] = useState([])
    const [likeDislike, setLikeDislike] = useState([])
    const [state, setState] = useState(false)
    const [clickToLike, setClickToLike] = useState(false)
    const [clickToDislike, setClickToDislike] = useState(false)
    const accessToken = localStorage.getItem('accessToken')

    const user = useSelector((state)=> state.user);
  
    
    const formattedDate = dateFormat(video?.createdAt, 'mmmm dd, yyyy');

    useEffect(() => {
        const fetchData = async () => {
            if (video?._id) {
                const response = await axios.get(API_URL + `/likes/video/likes-dislikes/${video?._id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setLikeDislike(response.data.data);
                setClickToLike(false);
                setClickToDislike(false);
            }
        };
        fetchData();
    }, [video?._id, state]);

    useEffect(()=> {
        const fetchData = async () => {
            if (video?._id) {
                const response = await axios.get(API_URL+`/subscriptions/c/${video?.owner}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setSubscribers(response.data.data)
                if(!response.data.data){
                    setSubscribers([])
                }
                if(response.data.data){
                    const isSubscriber = response.data.data.filter((subscriber)=>subscriber.userId === user.userData._id)[0]
                    if(isSubscriber){
                        setIsSubscribed(true)
                    }
                }else{
                    setIsSubscribed(false)
                }
            }
        };
        fetchData();
    },[video?._id, isSubscribed])

    const handleLike = async () => {
        setClickToLike(true);
        setClickToDislike(false)
        const response = await axios.post(API_URL+`/likes/toggle/v/like/${video?._id}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setState(!state)
    }

    const handleDislike = async () => {
        setClickToLike(false);
        setClickToDislike(true)
        const response = await axios.post(API_URL+`/likes/toggle/v/dislike/${video?._id}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setState(!state)
    }

    const handleSubscription = async() => {
        const response = await axios.post(API_URL+`/subscriptions/c/${user.userData._id}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }); 
        // console.log(response.data.data);
        setIsSubscribed(response.data.data)
    };





    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


  


    return (
        <div className="bg-[#fdde2e] p-4 rounded-lg shadow-md">
            {/* First Row: Video Title */}
            <div className="font-bold text-xl mb-2">{video?.title}</div>

            {/* Second Row: Views and Created At */}
            <div className="text-sm text-gray-600 mb-2">
                {video?.views} views • {formattedDate}
            </div>


            <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center rounded-lg border-2 border-gray-700 ${(clickToLike || clickToDislike)? 'border-pink-500': 'border-yellow-500'}`}>
                    <button onClick={handleLike} className={`flex items-center ${clickToLike? 'hover:bg-pink-400 bg-pink-300 rounded-l-lg': 'hover:bg-yellow-400 bg-yellow-300 rounded-l-lg'} hover:rounded-l-lg px-4 py-2`}>
                        <img src={like} alt="" className="h-5 w-5 mr-1" />
                        {likeDislike[0]?.likes?.length}
                    </button>
                    
                    <button onClick={handleDislike} className={`flex items-center hover:rounded-r-lg px-4 py-2 ${clickToDislike? 'hover:bg-pink-400 bg-pink-300 rounded-r-lg': 'hover:bg-yellow-400 bg-yellow-300 rounded-r-lg'}`}>
                        <img src={dislike} alt="" className="h-5 w-5 mr-1" />
                        {likeDislike[1]?.dislikes?.length}
                    </button>
                </div>
                <div className='flex justify-end'>
                <button className="flex bg-white items-center text-gray-700 border-2 hover:border-gray-400 rounded-lg px-4 py-2 font-semibold">
                    <img src={folder} alt="" className="h-6 w-6" />
                    Save
                </button>
                <AddToPlaylist/>
                </div>
            </div>


            <div className="flex items-center mb-4">
                <img src={video?.channelImage} alt='channel_image' className="h-12 w-12 border-2 border-yellow-500 object-cover rounded-full mr-2" />
                <div>
                    <div className="font-medium">{video?.channelName}</div>
                    <div className="text-sm text-gray-700">{subscribers && subscribers.length} subscribers</div>
                </div>

                <motion.button
                    className={`ml-auto flex items-center px-3 py-2 text-gray-800 font-medium  shadow-inner  ${isSubscribed ? 'bg-green-500' : 'bg-purple-400'
                        }`}
                    onClick={handleSubscription}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ rotate: isSubscribed ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <img src={subscriber} alt="" className="h-5 w-5 mr-1" />
                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </motion.button>
            </div>


            <div className="mb-4">
                {showFullDescription ? (
                    <div>{video?.description}</div>
                ) : (
                    <div onClick={toggleDescription} className="cursor-pointer underline">
                        {video?.description.split('\n')[0]}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoDescription;
