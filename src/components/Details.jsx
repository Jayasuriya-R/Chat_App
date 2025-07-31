import React, { useState } from "react";
import Avatar from "../assets/avatar.png";
import upArrow from "../assets/arrowUp.png";
import downArrow from "../assets/arrowDown.png";
import download from "../assets/download.png";
import { useDispatch } from "react-redux";
import { addSelectedUser, removeuser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { setAddUserToogle, setAddUserToogleFalse, setBlockUserToogleTrue } from "../utils/addUserToogleSlice";

const Details = () => {
  const [openSetting, setOpenSetting] = useState(null);
  const dispatch = useDispatch();
  const details = useSelector((store) => store.CurrentUser.selectedUser);
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
      <div className="flex flex-col items-center justify-center">
        <img
          src={details.user.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mt-3"
        />
        <h1 className="text-base font-medium">{details.user.username}</h1>
        <p className="text-[#a5a5a5] text-sm">Busy at work !</p>
      </div>

      <hr className="border-white/15 my-2" />

      <div>
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex justify-between items-center text-left px-3 py-2 mb-1 cursor-pointer hover:bg-gray-700 rounded-md"
            onClick={() => toggle(setting.id)}
          >
            <p>{setting.label}</p>
            <img
              src={openSetting === setting.id ? upArrow : downArrow}
              alt="Arrow Icon"
              className="w-[30px] h-[30px] bg-gray-800 p-[6px] rounded-full"
            />
          </div>
        ))}

        <div className="flex justify-between items-center px-3 mt-3 mb-2">
          <p className="text-sm font-semibold">Shared Files</p>
          <img
            src={upArrow}
            alt="Arrow Icon"
            className="w-[30px] h-[30px] bg-gray-800 p-[6px] rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2 px-3">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 cursor-pointer"
            >
              <img
                src="https://picsum.photos/200/300"
                alt="Shared"
                className="w-12 h-10 object-cover rounded-md"
              />
              <img
                src={download}
                alt="Download Icon"
                className="w-[30px] h-[30px] bg-gray-800 p-[6px] rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col px-3 gap-2 mt-4">
          <button
            className="bg-red-500 w-full px-2 py-1 text-xs rounded-sm text-white hover:bg-red-600"
            onClick={() => {
              dispatch(setBlockUserToogleTrue());
              dispatch(setAddUserToogleFalse())
            }}
          >
            Block User
          </button>
          <button
            className="bg-blue-500 text-white w-full text-xs px-2 py-1 rounded-sm hover:bg-blue-600"
            onClick={() => {
              dispatch(removeuser());
              dispatch(addSelectedUser(null));
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
