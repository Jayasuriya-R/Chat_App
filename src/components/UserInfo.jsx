import React from 'react'
import Avatar from '../assets/avatar.png'
import More from '../assets/more.png'
import Video from '../assets/video.png'
import Edit from '../assets/edit.png'

const UserInfo = () => {
  return (
   <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-2 space-y-2 sm:space-y-0">
  {/* Left Section */}
  <div className="flex items-center">
    <img src={Avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
    <h1 className="text-base font-medium">Surya</h1>
  </div>

  {/* Right Icons */}
  <div className="flex items-center space-x-2">
    <img src={More} alt="More Options" className="w-6 h-6 cursor-pointer" />
    <img src={Video} alt="Video Call" className="w-6 h-6 cursor-pointer" />
    <img src={Edit} alt="Edit Profile" className="w-6 h-6 cursor-pointer" />
  </div>
</div>

  )
}

export default UserInfo
