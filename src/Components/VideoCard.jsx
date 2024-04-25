import React from 'react';

const VideoCard = ({video}) => {
      const { thumbnail, title = 'title', views = 0, createdAt, channelName, duration, channelImage } = video;
        // let {_id} = video;
      console.log(video);

    return (
        <div className="max-w-md p-2 bg-[#fdde2e] cursor-pointer shadow-lg rounded-lg overflow-hidden mx-2 my-4 hover:rounded-none select-none" >
            <div className="relative overflow-visible ">
                <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute bottom-0 right-0 m-2 rounded-md bg-gray-800 text-white px-3 py-1 text-xs font-semibold">{duration}0:1</div>
            </div>
            <div className="flex  py-2">
               <div> 
                <img src={channelImage} alt={channelName} className="w-12 h-12 object-cover rounded-full m-2" />
                </div>

                <div className='mt-2'>
                <h3 className="text-gray-800 text-xl font-bold break-words mb-1">{title}</h3>
                <p className="text-gray-600 text-sm font-semibold ">Channel: {channelName}</p>
                <span className="text-gray-600 text-sm font-semibold pr-4">{views} views</span>
                <span className="text-gray-600 text-sm font-semibold">Published: {createdAt}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
