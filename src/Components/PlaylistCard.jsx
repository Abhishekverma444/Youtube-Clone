import React from 'react'
import { useSelector } from 'react-redux';
import { user, video } from '../assets/index'
import dateFormat, { masks } from "dateformat";

const PlaylistCard = ({playlist}) => {

    const toggle = useSelector((state) => state.toggle)

    return (
        <div className={` ${toggle.status ? 'w-[450px]' : 'w-[375px]'}  m-2 pb-3 bg-[#fdde2e] cursor-pointer shadow-lg border border-yellow-500 overflow-hidden mx-2 my-4  select-none`} >
            <img src={video} alt='' className="w-full h-48 object-contain contrast-200  bg-stone-300" />

            <div className={`${toggle.status ? 'w-[35.5%]' : 'w-[29.6%]'} absolute`}>
                <div className='flex justify-between relative -top-[68px] shadow-sm bg-gray-200 opacity-80  px-3 py-2 border-t-2 border-white  items-center'>
                    <div>
                        <h1 className='text-xl font-medium contrast-200'>Playlist</h1>
                    <h4 className=' font-medium contrast-200'>{dateFormat(playlist?.createdAt, 'mmmm dd, yyyy')}</h4>
                    </div>
                    <div className='font-medium contrast-200'>{playlist.videos.length} videos</div>
                </div>
            </div>

            <h1 className=' pt-2 px-2 text-lg font-bold'>{playlist.name}</h1>
            <p className='px-2 text-base text-justify contrast-200 '>{playlist.description}</p>
        </div>
    )
}

export default PlaylistCard