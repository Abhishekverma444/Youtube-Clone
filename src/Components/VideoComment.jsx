import React, { useEffect, useState } from 'react';
import {user } from '../assets/index'
import { useForm } from 'react-hook-form';
import { getVideoComments, addComment } from '../store/commentSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setFlashMessage } from '../store/flashMsgSlice'
import dateFormat, { masks } from "dateformat";

const VideoComment = ({ video }) => {

  const [page, setPage] = useState(1);
  const {videoComments, status, commentAdded } = useSelector((state) => state.comment)
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getVideoComments({videoId: video?._id, limit: 10, page: page }));
    commentAdded._id && dispatch(setFlashMessage({'message': 'Comment added successfully'}))
  },[dispatch, video?._id, commentAdded._id, page])
  // console.log("videoComments", videoComments);

  const onSubmit = (data) => {
    console.log(data.content);
    dispatch(addComment({videoId: video?._id, content: data}))
  }

  // console.log(page);

  return (
    <div className="bg-[#fdde2e] p-5 rounded-lg shadow-md mt-4 mb-8 ">
      {/* Total number of comments */}
      <div className="flex items-center mb-4">
        <div className="text-lg font-medium mr-1">{videoComments[1]?.NumOfComments[0]?.totalComments}</div>
        <div className="font-medium text-lg ">Comments</div>
      </div> 
      {/* Add Comment Input Box */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mb-4">
        <input
          type="text"
          id="AddComment"
          placeholder="Add your comment..."
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
          {...register("content", {required: true})}
        />
        <button 
        type='submit'
        disabled={status === 'loading'}
        className={`bg-blue-500 ${(status === 'loading') ? 'opacity-70 cursor-not-allowed' : ''} text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 `}>
          {status === 'loading' ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Comments List */}
      <div>
        {videoComments[0]?.comments.map((comment) => (
          <div key={comment._id} className="flex  items-start border-t-2 gap-3 border-yellow-400 py-3 mb-2">
          <img src={comment.avatar} alt="" className="w-14 h-14 absolute rounded-full mt-2 border-2 object-cover" style={{ alignSelf: 'flex-start' }} />
          <div className='ml-16'>
            <div className="font-medium text-gray-800">{comment.fullname} • {dateFormat(comment?.createdAt, 'mmmm dd, yyyy')}</div>
            <div className="font-normal text-gray-700">@{comment.username}</div>
            <p className='mt-2'>
              {comment.content}
            </p>
          </div>
        </div>
        
        ))}
      </div>
      <div className='w-full flex justify-center gap-2'>
      <button onClick={()=>setPage((pre)=> (pre>1)? pre - 1 : 1)} className='hover:contrast-200 text-2xl'>⬅️</button>
      <button onClick={()=>setPage((pre)=> pre + 1)} className='hover:contrast-200 text-2xl'>➡️</button>
      </div>
    </div>
  );
};

export default VideoComment;
