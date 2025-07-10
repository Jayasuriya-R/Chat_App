import React from 'react'
import avatar from '../assets/avatar.png'
import { useDispatch } from 'react-redux';
import { addSelectedUser } from '../utils/userSlice';

const Chat = ({name,id}) => {
  const dispatch = useDispatch();
  return (
    <div className='cursor-pointer hover:bg-gray-800/50 rounded-lg transition-all duration-200'onClick={() => dispatch(addSelectedUser(id))}>
      <div className='flex items-center px-3 py-4'>
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <div>
        <h1 className="text-base font-medium">{name}</h1>
        <span className='text-sm'>Hello !</span>
        </div>
      </div>
      <hr className='border-white/15' />
    </div>
  )
}

export default Chat
