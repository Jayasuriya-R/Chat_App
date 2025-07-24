import React from 'react'
import Avatar from '../assets/avatar.png'
import More from '../assets/more.png'
import Video from '../assets/video.png'
import Edit from '../assets/edit.png'
import { useSelector } from 'react-redux'
import Tooltip from './Tooltip'

const UserInfo = () => {
  const user = useSelector((store) => store.CurrentUser.user)
  // console.log(user)
  return (
   <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-2 space-y-2 sm:space-y-0">
  {/* Left Section */}
  <div className="flex items-center">
    <img src={user[0].avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
    <h1 className="text-base font-medium">{user[0].username}</h1>
  </div>

  {/* Right Icons */}
  <div className="flex items-center space-x-2">
    <div className='relative group'>
    <img src={More} alt="More Options" className="w-6 h-6 cursor-pointer" />
    <Tooltip desc="More"/>
    </div>
    <div className='relative group'>
    <img src={Video} alt="Video Call" className="w-6 h-6 cursor-pointer" />
    <Tooltip desc="video"/>
    </div>
    <div className='relative group'>
    <img src={Edit} alt="Edit Profile" className="w-6 h-6 cursor-pointer" />
    <Tooltip desc="Edit"/>
    </div>
  </div>
</div>

  )
}

export default UserInfo
