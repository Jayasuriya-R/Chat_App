import React from 'react'
import {  setBlockUserToogleFalse } from '../utils/addUserToogleSlice'
import { useDispatch } from 'react-redux';
import { addToBlockList } from '../utils/userSlice';


const BlockUser = ({blockedUser}) => {
    const dispatch = useDispatch();
  return (
    <div>
      <div className='bg-[#111928] opacity-100 p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15 text-center'>
        <h1 className="text-lg font-semibold">Block User</h1>
        <p className="text-sm text-gray-500">Are you sure you want to block this user?</p>
        <div className='flex justify-center items-center gap-2 mt-2'>
        <button className='py-1 px-2 rounded-lg bg-red-500 text-white'onClick={()=> {
            dispatch(addToBlockList(blockedUser?.user.uid));
            dispatch(setBlockUserToogleFalse());
        }}>Yes</button>
        <button className='py-1 px-2 rounded-lg bg-red-500 text-white'onClick={() => dispatch(setBlockUserToogleFalse())}>No</button>
        </div>
      </div>
    </div>
  )
}

export default BlockUser
