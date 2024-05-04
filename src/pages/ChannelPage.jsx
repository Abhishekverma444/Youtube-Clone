import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscriber, user, tweet, video, folder } from '../assets/index'
import { motion } from 'framer-motion'
import { fetchUserPlaylists } from '../store/playlistSlice'
import { ChannelEmptyPage } from './index'
import { ChannelTweets, PlaylistCard } from '../Components'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { Link } from 'react-router-dom'


const ChannelPage = () => {
    const toggle = useSelector((state) => state.toggle)
    const { userPlaylists } = useSelector((state) => state.playlist)
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [selected, setSelected] = useState('video');
    const [isloading, setIsloading] = useState(false)
    const [tweets, setTweets] = useState([]);
    const [channel, setChannel] = useState({});
    const userData = JSON.parse(localStorage.getItem('userData'));
    const { videoOwnerId, videoOwnerUsername } = useSelector((state) => state.user)
    const accessToken = localStorage.getItem('accessToken')

    const dispatch = useDispatch();

    useEffect(() => {
        const getUserChannelProfile = async () => {
            const response = await axios.get(API_URL+'/users/c/'+videoOwnerUsername,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // console.log(response.data.data);
            setChannel(response.data.data)
            setIsSubscribed(response.data.data.isSubscribed)
        }
        getUserChannelProfile();
    }, [])

    const handleSubscription = async () => {
        const response = await axios.post(API_URL + `/subscriptions/c/${channel?._id}`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setIsSubscribed(response.data.data)
    }


    const handleVideoClick = () => {
        setSelected('video')
        console.log('video');
    }
    const handlePlaylistClick = () => {
        setSelected('playlist')
        dispatch(fetchUserPlaylists(videoOwnerId));
    }
    const handleTweetClick = async () => {
        setSelected('tweet')
        setIsloading(true);

        const response = await axios.get(API_URL + '/tweets/user/' + videoOwnerId,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        // console.log(response.data.data);
        setTweets(response.data.data);
        setIsloading(false);
    }
    const handleSubscribedClick = () => {
        setSelected('subscribed')

        console.log('subscribed');
    }

    return (
        <div className={`w-full h-full m-0 p-0 bg pb-10 mt-[7%] ${toggle?.status ? 'ml-[15%]' : 'ml-[6%]'} bg-yellow-400 `}>
            <img src={channel?.coverImage} alt="" className='h-52 w-full object-cover' />
            <div className='px-4 flex relative h-full justify-between'>
                <img src={channel?.avatar} alt="" className='absolute bg-white left-7 -top-8 z-10 h-28 w-28 border-2 rounded-full object-cover scale-105' />

                <div className='ml-36'>
                    <h1 className='font-medium text-xl text-gray-900 mt-4 mb-2' >{channel?.fullname}</h1>
                    <div className="font-normal text-gray-700 text-">@{channel?.username}</div>
                    <div className="font-normal text-gray-700 mb-5 ">{channel?.subscribersCount} subscribers • {channel?.channelsSubscribedToCount} subscribed</div>
                </div>

                <motion.button
                    className={` flex  items-center my-10 px-7 py-2 mr-1 text-lg text-gray-800 font-medium  shadow-inner  ${isSubscribed ? 'bg-green-500' : 'bg-purple-400'}`}
                    onClick={handleSubscription}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ rotate: isSubscribed ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <img src={subscriber} alt="subscribe logo" className="h-5 w-5 mr-1" />
                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </motion.button>
            </div>

            <div className='px-4 flex justify-between'>
                <button onClick={handleVideoClick} className={`font-semibold ${selected === "video" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}>Videos</button>
                <button onClick={handlePlaylistClick} className={`font-semibold ${selected === "playlist" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}>Playlists</button>
                <button onClick={handleTweetClick} className={`font-semibold ${selected === "tweet" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}>Tweets</button>
                <button onClick={handleSubscribedClick} className={`font-semibold ${selected === "subscribed" ? 'bg-yellow-50' : ''} text-center w-[25%] border py-2 hover:bg-yellow-200`}>Subscribed</button>
            </div>


            {selected === 'video' && <ChannelEmptyPage
                logo={video}
                heading={'No videos uploaded'}
                paragraph={"This page has yet to upload a video. Search another page in order to find more videos."}
            />}
            {(selected === 'playlist' && userPlaylists.length === 0) && <ChannelEmptyPage
                logo={folder}
                heading={'No playlist created'}
                paragraph={"There are no playlist created on this channel."}
            />}
            <div className='flex flex-wrap justify-evenly items-start mt-4'>
                {userPlaylists.length && selected === 'playlist' && userPlaylists.map((playlist) => (
                    <Link key={playlist._id} to={"/channel/playlist/"+playlist._id}>
                        <PlaylistCard playlist={playlist} />
                    </Link>
                ))
                }</div>

            {(selected === 'tweet' && tweets.length === 0) &&
                <ChannelEmptyPage
                    logo={tweet}
                    heading={'No Tweets'}
                    paragraph={"This channel has yet to make a Tweet."}
                />}
            {tweets.length && tweets.map((tweet) => (
                <div key={tweet._id} className='my-2 pb-3 mx-4  border-b'>
                    <ChannelTweets tweet={tweet} />
                </div>
            ))}

            {selected === 'subscribed' && <ChannelEmptyPage
                logo={tweet}
                heading={'No people subscribers'}
                paragraph={"This channel has yet to subscribe a new channel."}
            />}




        </div>
    )
}

export default ChannelPage