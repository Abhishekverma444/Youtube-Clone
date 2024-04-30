import React, { useState } from 'react';

const AddToPlaylist = ({ onCreatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleInputChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistName.trim() === '') {
      alert('Please enter a playlist name.');
      return;
    }
    onCreatePlaylist(playlistName);
    setPlaylistName('');
  };


  const [collections, setCollections] = useState([
    { name: 'JavaScript Basics', checked: false },
    { name: 'C++ Tuts', checked: false },
    { name: 'Feel Good Music', checked: false },
    { name: 'Ed Sheeran', checked: false },
    { name: 'Python', checked: false }
  ]);

  const handleCheckboxChange = (index) => {
    const updatedCollections = [...collections];
    updatedCollections[index].checked = !updatedCollections[index].checked;
    setCollections(updatedCollections);
  };

  return (
    <div className="max-w-md absolute mx-auto mt-12 border-2 border-[#c5ad14] p-6 bg-[#f0d318] shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Save to playlist</h2>

      <div className="max-w-md mx-auto ">
      {collections.map((collection, index) => (
        <div key={index} className="flex items-center mb-3">
          <input
            type="checkbox"
            id={`collection-${index}`}
            className="mr-3 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={collection.checked}
            onChange={() => handleCheckboxChange(index)}
          />
          <label
            htmlFor={`collection-${index}`}
            className={`text-lg ${collection.checked ? 'text-indigo-800' : 'text-gray-800'} cursor-pointer`}
            onClick={() => handleCheckboxChange(index)}
          >
            {collection.name}
          </label>
        </div>
      ))}
    </div>

      <form onSubmit={handleSubmit} className='text-center'>
        <div className="mb-4">
          <label htmlFor="playlistName" className="block font-medium pt-2 text-gray-700 text-left">
           Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Create new playlist
        </button>
      </form>
    </div>
  );
};

export default AddToPlaylist;
