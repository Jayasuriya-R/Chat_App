import React from 'react'
import avatar from '../assets/avatar.png'
import { useDispatch } from 'react-redux';
import { addSelectedUser } from '../utils/userSlice';

const Chat = ({name,id,msg}) => {
  const dispatch = useDispatch();
  
  return (
    <div className={`cursor-pointer  hover:bg-gray-800/50 rounded-lg transition-all duration-200`}onClick={() => dispatch(addSelectedUser(id))}>
      <div className='flex items-center px-3 py-4'>
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <div>
        <h1 className="text-base font-medium">{name}</h1>
        <span className='text-sm'>{msg}</span>
        </div>
      </div>
      
    </div>
  )
}

export const UnSeenChat = ({name,id,msg}) =>{
  return(
    <div className='bg-blue-500 rounded-lg hover:bg-blue-400/50 transition-all duration-200'>
      <Chat name={name} id={id} msg={msg} />
    </div>
  )
}
export default Chat
