import React from 'react'

const ChannelEmptyPage = ({logo, heading, paragraph}) => {
    return (
        <div className='w-auto h-96 border-t-2 m-4 flex flex-col items-center justify-center'>
            <img src={logo} alt="" className='h-16 w-16 contrast-200'/>
            <div className=' text-xl text-gray-800 font-semibold mb-2'>{heading}</div>
            <p className='max-w-96 text-center font-serif mb-8 text-gray-700'>{paragraph}</p>
        </div>
    )
}

export default ChannelEmptyPage