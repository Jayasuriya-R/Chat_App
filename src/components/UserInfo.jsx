import React from 'react'
import Avatar from '../assets/avatar.png'
import More from '../assets/more.png'
import Video from '../assets/video.png'
import Edit from '../assets/edit.png'

const UserInfo = () => {
  return (
    <div className='flex justify-between px-3'>
      <div className='flex items-center '>
        <img src={Avatar} alt="User Avatar" className="w-10 h-10 rounded-full mx-auto mr-2" />
        <h1>Surya</h1>
      </div>
      <div className='flex items-center ml-4 space-x-2'>
        <img src={More} alt="More Options" className="w-6 h-6 cursor-pointer" />
        <img src={Video} alt="Video Call" className="w-6 h-6 cursor-pointer ml-2" />
        <img src={Edit} alt="Edit Profile" className="w-6 h-6 cursor-pointer ml-2" />
      </div>
    </div>
  )
}

export default UserInfo
