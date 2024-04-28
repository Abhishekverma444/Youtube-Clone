import React from 'react';
import { useSelector } from 'react-redux';

const VideoCard = ({ video }) => {
    const toggle = useSelector((state) => state.toggle)
    const { thumbnail, title = 'title', views = 0, createdAt, channelName, duration, channelImage } = video;

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    // Format the time components with leading zeros if necessary
    let formattedTime;
    if (hours > 0) {
        formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }


    const publishedDate = new Date(createdAt);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - publishedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - publishedDate.getMonth();
    const dayDiff = currentDate.getDate() - publishedDate.getDate();
    const hourDiff = currentDate.getHours() - publishedDate.getHours();
    const minuteDiff = currentDate.getMinutes() - publishedDate.getMinutes();

    // Define helper function to pluralize units
    const pluralize = (count, noun) => {
        return count === 1 ? `${count} ${noun}` : `${count} ${noun}s`;
    };

    // Build the time display string based on the differences
    let published = '';
    if (yearDiff > 0) {
        published = pluralize(yearDiff, 'year');
    } else if (monthDiff > 0) {
        published = pluralize(monthDiff, 'month');
    } else if (dayDiff > 0) {
        published = pluralize(dayDiff, 'day');
    } else if (hourDiff > 0) {
        published = pluralize(hourDiff, 'hour');
    } else {
        published = pluralize(minuteDiff, 'minute');
    }



    const formatViews = (noViews) => {
        if (noViews < 1000) {
          return noViews.toString(); // Display views as-is if less than 1000
        } else if (noViews >= 1000 && noViews < 1000000) {
          return (noViews / 1000).toFixed(1) + 'k'; // Display in thousands (e.g., 1.2k)
        } else if (noViews >= 1000000 && noViews < 1000000000) {
          return (noViews / 1000000).toFixed(1) + 'million'; // Display in millions (e.g., 3.5m)
        } else {
          return (noViews / 1000000000).toFixed(1) + 'billion'; // Display in billions (e.g., 7.8b)
        }
      };

    return (
        <div className={` ${toggle.status ? 'w-96' : 'w-80'} p-2 bg-[#fdde2e] cursor-pointer shadow-lg rounded-lg overflow-hidden mx-2 my-4 hover:rounded-none select-none`} >
            <div className="relative overflow-visible ">
                <img src={thumbnail} alt={title} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute bottom-0 right-0 m-2 rounded-md bg-gray-800 text-white px-3 py-1 text-xs font-semibold">{formattedTime}</div>
            </div>
            <div className="flex  py-2">
                <div>
                    <img src={channelImage} alt={channelName} className="w-12 h-12 object-cover rounded-full mt-2 mr-3" />
                </div>

                <div className=' '>
                    <h3 className={`text-gray-800 text-lg font-bold truncate overflow-hidden ${toggle.status ? 'w-64' : 'w-60'} my-1`}>{title }</h3>
                    <p className="text-gray-700 text-sm font-semibold ">{channelName}</p>
                    <span className="text-gray-600 text-sm font-semibold pr-1">{formatViews(views)} views</span>
                    <span className="text-gray-600 text-sm font-semibold"> { published} ago</span>
                  
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
