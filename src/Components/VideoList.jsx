import React from 'react';
import { useSelector } from 'react-redux';
 
// isSmallList is used to reuse the code for showing a small list of videos by using the same component
const VideoList = ({ video, isSmallList }) => {
  const toggle = useSelector((state) => state.toggle)
  const { thumbnail, title = 'title', views = 0, createdAt, channelName, duration, channelImage, description } = video;


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
    <div className={`w-full p-2 bg-[#fdde2e] cursor-pointer flex shadow-lg rounded-lg overflow-hidden m-2 hover:rounded-none select-none`}>

      <div className="relative overflow-visible" style={{ width: '45%' }}>
        <img src={thumbnail} alt={title} className={`${!isSmallList ? 'w-full h-64': ' h-32 w-full' }    object-cover `} />
        <div className="absolute bottom-0 right-0 m-2 rounded-md bg-gray-800 text-white px-3 py-1 text-xs font-semibold">{formattedTime}</div>
      </div>

      <div className={`flex flex-col ${!isSmallList ? 'py-4 pl-9': '  pl-3' }  `} style={{ width: '55%' }} >
        <div>
          <h3 className={`text-gray-800 text-xl mb-1 font-bold  my-1`}>{title}</h3>
          <span className="text-gray-600 text-sm font-semibold pr-1">{formatViews(views)} views</span>
          <span className="text-gray-600 text-sm font-semibold">   {published} ago</span>
        </div>

        <div className="flex items-center mt-2" >
          {!isSmallList && <img src={channelImage} alt={channelName} className="w-12 h-12 object-cover rounded-full mt-1 mr-3" />}
          <p className="text-gray-700 text-base font-semibold ">{channelName}</p>
        </div>

        {!isSmallList && <p className="text-gray-700 text-base mt-3 font-medium ">{description}</p>}
      </div>


    </div>
  );
};

export default VideoList;


