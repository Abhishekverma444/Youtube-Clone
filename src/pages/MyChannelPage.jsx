import React from 'react'
import { useSelector } from 'react-redux'

const MyChannelPage = () => {
    const toggle = useSelector((state)=> state.toggle)
    console.log(toggle);
  return (
    <div className={`w-full h-full m-0 p-0 bg mt-[7.5%] ${toggle?.status ? 'ml-[15%]' : 'ml-[6.2%]'} bg-yellow-400`}>
        hii
    </div>
  )
}

export default MyChannelPage