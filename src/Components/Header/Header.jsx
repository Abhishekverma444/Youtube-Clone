import React, { useState, useEffect } from 'react';
import { user, hamburger, youtube, searchIcon } from '../../assets/index'
import { Button } from '../index'
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from '../../store/searchSlice';
import { toggle } from '../../store/toggleSlice'
import { YOUTUBE_SEARCH_API } from '../../utils/constants'
import { Link } from 'react-router-dom';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search); //subscribing the cache

    // console.log(suggestions);

    useEffect(() => {
        // make an api call after every key press
        // but if the difference between 2 API calls is <200ms
        // decline the API call
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200)

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery])

    const dispatch = useDispatch();
 
    const getSearchSuggestions = async () => {
        console.log("API CALL : " + searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        // console.log(json[1])
        setSuggestions(json[1]);
        dispatch(
            cacheResults({
                ['searchCache']: json[1],
            })
        )
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    }

    // this is the Beast for this Header's Search functionality.
    const handleInputBlur = () => {
        // Delay hiding the suggestions to allow click event on suggestion item to be processed
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200); // Adjust the delay time as needed
    };

    const toggleMenuHandler = () => {
        dispatch(
            toggle()
        )
    }


    const handleSearchClick = () => {
        dispatch(
            cacheResults({
                ['searchQuery']: searchQuery,
            })
        )
    }

    return (
        <div className=' bg bg-[#FFD700] overflow-hidden flex justify-between p-4 fixed top-0 left-0 w-full z-20'
        >
            <div className='flex flex-row items-center'>
                <img
                    onClick={() => toggleMenuHandler()}
                    className="h-8 mx-2 cursor-pointer"
                    alt="menu"
                    src={hamburger}
                />
                <a href="/">
                    <img
                        className="h-12 mx-2"
                        alt="logo"
                        src={youtube}
                    />
                </a>
            </div>

            <div className=' ' >

                <div className='flex items-center mb-1'>
                    <input
                        className='h-12 px-4 w-96 font-semibold text-gray-700 rounded-l-full mt-2 outline-1 outline-blue-700'
                        type="text"
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={handleInputBlur}
                    />
                    <Button className='bg-white w-fit cursor-pointer rounded-r-full h-12 place-content-center mt-2' bgColor='bg-white'
                        onClick={handleSearchClick}>
                        <img className='h-7 px-5' src={searchIcon} alt="Search" />
                    </Button>
                </div>

                {showSuggestions && (
                    <div className='fixed bg-white py-2 px-2 mx-1 w-[24rem] shadow-lg rounded-lg border border-gray-100' >
                        {suggestions.map((s, index) => (
                            <li
                                className='py-2 flex items-center px-3 shadow-sm shadow-gray-400 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                                key={index}
                                onClick={() => handleSuggestionClick(s)}

                            >
                                <img src={searchIcon} className='h-5 px-4' />
                                <span className='text-gray-800 font-medium'>{s}</span>
                            </li>

                        ))}


                    </div>
                )}


            </div>

            <div className='flex items-center'>
                {/* <img
                    className='h-14 w-14 rounded-full border-2 border-blue-600 p-1 transition duration-300 ease-in-out transform hover:scale-105'
                    src={user}
                    alt="user"
                />

                <Button class="bg-gradient-to-r from-[#9e1818] to-red-700 hover:from-red-600 hover:to-red-900 text-white font-bold py-3 px-5 rounded-full m-2 shadow-lg transform transition-transform hover:scale-105">
                    Logout
                </Button> */}

                {/* agar user login nhi hai to. */}
                <Link to="/login">
                    <Button className="bg-gradient-to-r from-[#026504] to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-6 rounded-full m-2 shadow-lg transform transition-transform hover:scale-105">
                        Login
                    </Button>
                </Link>
                <Link to='/signup'>
                    <button className="bg-gradient-to-r from-[#26249f] to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-6 rounded-full m-2 shadow-lg transform transition-transform hover:scale-105">
                        Signup
                    </button>
                </Link>


            </div>
        </div>
    );
};


export default Header;
