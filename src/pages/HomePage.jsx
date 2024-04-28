import React, { useEffect, useState } from 'react'
import {Header, Sidebar, FlashMessage} from '../Components/index'

import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setFlashMessage } from '../store/flashMsgSlice'


const HomePage = () => {
  const [message, setMessage] = useState('');
  
  const flashMsg = useSelector((store)=> store.message);

  // console.log(flashMsg);

  useEffect(()=>{
    setTimeout(() => {
      
    }, 2000);
  }, [flashMsg])

  return (
    <div className='w-full flex justify-self-end'>
        <Header />
        <Sidebar  />
        <Outlet />
        {flashMsg.message && <FlashMessage message={flashMsg.message} />}
    </div>
  )
}

export default HomePage