import React,{useState} from 'react'
import Avatar from '../assets/avatar.png'
import upArrow from '../assets/arrowUp.png'
import downArrow from '../assets/arrowDown.png'

const Details = () => {
  const [openSetting, setOpenSetting] = useState(null);
  const settings = [
    { id: 1, label: "Chat settings" },
    { id: 2, label: "Privacy settings" },
    { id: 3, label: "Shared Photos" },
  ];

  const toggle = (id) => {
    setOpenSetting(prev => (prev === id ? null : id));
  };
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-1'>
          <img src={Avatar} alt="User Avatar" className="w-12 h-12 rounded-full " />
          <h1 className="text-base font-medium">Surya</h1>
          <p className='text-[#a5a5a5] text-sm'>Busy at work !</p>
      </div>
      <hr className='border-white/15 my-2' />
      <div>
      {settings.map(setting => (
        <div
          key={setting.id}
          className='flex justify-between items-center text-left px-3 pb-2 cursor-pointer'
          onClick={() => toggle(setting.id)}
        >
          <p>{setting.label}</p>
          <img
            src={openSetting === setting.id ? upArrow : downArrow}
            alt="Arrow Icon"
            className='w-[30px] h-[30px] text-right bg-gray-800 p-[10px] rounded-full'
          />
        </div>
      ))}
    </div>
    </div>
  )
}

export default Details
