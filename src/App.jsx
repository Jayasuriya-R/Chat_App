import { useState } from 'react'
import './App.css'
import bgImage from './assets/bg.jpg'
import MainContainer from './components/MainContainer'

function App() {
  

  return (
    <>
     <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${bgImage})` }}>
      <MainContainer />
     </div>
    </>
  )
}

export default App
