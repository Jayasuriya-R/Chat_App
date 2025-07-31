import React, { use } from "react";
import LeftPannel from "./LeftPannel";
import ChatMain from "./ChatMain";
import Details from "./Details";
import { useSelector } from "react-redux";
import AddUser from "./AddUser";
import BlockUser from "./BlockUser";

const MainContainer = () => {
  const msgId = useSelector((store) => store.CurrentUser.selectedUser);
  const showAddUser = useSelector((store) => store.addUserToogle); 
  const  BlockedUser = useSelector((store) => store.CurrentUser.blockedUsers);
  console.log(BlockedUser);
  //pointer-events-none select-none opacity-70
  return (
    <div
      className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15"
      style={{ backgroundColor: "rgba(17, 25, 40, 0.75)" }}
    >
      {/* Left Panel */}
      <div className="lg:col-span-3 h-full border-b lg:border-b-0 lg:border-r border-white/15 overflow-hidden">
        <LeftPannel />
      </div>

      {/* Chat Main */}
      <div className={`lg:col-span-6 h-full border-b lg:border-b-0 lg:border-r border-white/15 overflow-hidden ${BlockedUser.includes(msgId?.user.uid )? "pointer-events-none select-none opacity-70" :""}`}>
       {msgId && <ChatMain />}
       {showAddUser.addUserToogle && (
        <div className=" absolute bottom-0 left-0 top-0 right-0 w-fit h-fit m-auto text-white rounded-lg shadow-lg">
          <AddUser />
        </div>
      )}
      </div>

      {/* Right Panel */}
      <div className={`lg:col-span-3 h-full overflow-hidden ${BlockedUser.includes(msgId?.user.uid )? "pointer-events-none select-none opacity-70" :""}`}>
        {msgId && <Details />}
        {showAddUser.blockUserToggle && (
        <div className=" absolute bottom-0 left-0 top-0 right-0 w-fit h-fit m-auto text-white rounded-lg shadow-lg">
          <BlockUser blockedUser={msgId}/>
        </div>
      )}
      </div>
    </div>
  );
};

export default MainContainer;
