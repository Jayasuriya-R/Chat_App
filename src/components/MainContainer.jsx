import React from "react";
import LeftPannel from "./LeftPannel";
import ChatMain from "./ChatMain";
import Details from "./Details";

const MainContainer = () => {
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
      <div className="lg:col-span-6 h-full border-b lg:border-b-0 lg:border-r border-white/15 overflow-hidden">
        <ChatMain />
      </div>

      {/* Right Panel */}
      <div className="lg:col-span-3 h-full overflow-hidden">
        <Details />
      </div>
    </div>
  );
};

export default MainContainer;
