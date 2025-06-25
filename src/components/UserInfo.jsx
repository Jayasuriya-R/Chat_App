import React from 'react'
import Avatar from '../assets/avatar.png'
import More from '../assets/more.png'
import Video from '../assets/video.png'
import Edit from '../assets/edit.png'

const UserInfo = () => {
  return (
    <div>
      <div>
        <img src={Avatar} alt="User Avatar" className="w-16 h-16 rounded-full mx-auto" />
        <h1>Surya</h1>
      </div>
      <div>
        <img src={More} alt="More Options" className="w-6 h-6 cursor-pointer" />
        <img src={Video} alt="Video Call" className="w-6 h-6 cursor-pointer ml-2" />
        <img src={Edit} alt="Edit Profile" className="w-6 h-6 cursor-pointer ml-2" />
      </div>
    </div>
  )
}

export default UserInfo
