import React from 'react';
import { useSelector } from 'react-redux';
import { like, home, history, folder, vid_rec, subscriber, settings } from '../../assets/index';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const toggleStatus = useSelector((store) => store.toggle);
    // console.log("from homepage", toggleStatus.status);
    
    if (!toggleStatus.status) {
        return (
            <div className='flex flex-col fixed justify-between  min-w-[6%] p-4 bg bg-[#ffdd00]  h-screen pt-28 '>
                <ul> 
                    <Link to="/"><li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={home} alt="Home" /></li></Link>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={like} alt="Liked Videos" /></li>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={history} alt="History" /></li>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={vid_rec} alt="My Content" /></li>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={folder} alt="Collections" /></li>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={subscriber} alt="Subscribers" /></li>
                </ul>
                <ul>
                    <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={settings} alt="Settings" /></li>
                </ul>
            </div>
        );
    }

    return (
        <div className='flex flex-col fixed justify-between w-[15%] p-4 bg bg-[#ffdd00]  h-screen pt-28 '>
            <ul> 
                <Link to="/"><li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={home} alt="Home" /> Home</li></Link>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={like} alt="Liked Videos" /> Liked Videos</li>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={history} alt="History" /> History</li>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={vid_rec} alt="My Content" /> My Content</li>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={folder} alt="Collections" /> Collections</li>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={subscriber} alt="Subscribers" /> Subscribers</li>
            </ul>
            <ul>
                <li className='flex items-center p-2 hover:bg-[rgb(255,251,0)] hover:rounded-lg'><img className='h-6 w-6 mr-2' src={settings} alt="Settings" /> Settings</li>
            </ul>
        </div>
    );
};

export default Sidebar;
