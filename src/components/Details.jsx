import React, { useState } from "react";
import Avatar from "../assets/avatar.png";
import upArrow from "../assets/arrowUp.png";
import downArrow from "../assets/arrowDown.png";
import download from "../assets/download.png";
import { useDispatch } from "react-redux";
import { removeuser } from "../utils/userSlice";

const Details = () => {
  const [openSetting, setOpenSetting] = useState(null);
  const dispatch = useDispatch();
  const settings = [
    { id: 1, label: "Chat settings" },
    { id: 2, label: "Privacy settings" },
    { id: 3, label: "Shared Photos" },
  ];

  const toggle = (id) => {
    setOpenSetting((prev) => (prev === id ? null : id));
  };
  return (
    <div className="pb-2 px-1">
      <div className="flex flex-col items-center justify-center ">
        <img
          src={Avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full "
        />
        <h1 className="text-base font-medium">Surya</h1>
        <p className="text-[#a5a5a5] text-sm">Busy at work !</p>
      </div>
      <hr className="border-white/15 my-2" />
      <div>
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex justify-between items-center text-left px-3 pb-2 mb-1 cursor-pointer"
            onClick={() => toggle(setting.id)}
          >
            <p>{setting.label}</p>
            <img
              src={openSetting === setting.id ? upArrow : downArrow}
              alt="Arrow Icon"
              className="w-[30px] h-[30px] text-right bg-gray-800 p-[10px] rounded-full"
            />
          </div>
        ))}
        <div>
          {[1, 2, 3, 4].map((_,index) => {
            return (
              <div key={index} className="flex justify-between items-center px-3 pb-2 mb-1 cursor-pointer">
                <img
                  src="https://picsum.photos/200/300"
                  alt="Shared"
                  className="w-12 h-10 object-cover mb-2"
                />
                <img
                  src={download}
                  alt="Download Icon"
                  className="w-[30px] h-[30px] text-right bg-gray-800 p-[10px] rounded-full"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center px-3 pb-2 mt-1 cursor-pointer">
          <p>Shared Files</p>
          <img
              src={ upArrow}
              alt="Arrow Icon"
              className="w-[30px] h-[30px] text-right bg-gray-800 p-[10px] rounded-full"
            />
        </div>
        <div className="flex flex-col px-2  gap-2 mt-1">
        <button className="bg-red-400 w-full px-2 py-[4px] text-xs rounded-xs cursor-pointer hover:bg-red-500"> Block User</button>
        <button className="bg-blue-400 text-white w-full text-xs px-2 py-[4px] rounded-xs cursor-pointer hover:bg-blue-500" onClick={()=>dispatch(removeuser())}> Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
