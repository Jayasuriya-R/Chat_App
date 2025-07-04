import { useState } from "react";
import "./App.css";
import bgImage from "./assets/bg.jpg";
import MainContainer from "./components/MainContainer";
import Login from "./components/Login";

function App() {
  let user = false;
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-[#111928]">
        <div className="w-11/12 h-11/12">
         {
          user ?  <MainContainer /> : <Login />
         }
          
        </div>
      </div>
    </>
  );
}

export default App;
