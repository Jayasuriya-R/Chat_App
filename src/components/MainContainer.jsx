import React from 'react'
import LeftPannel from './LeftPannel'
import ChatMain from './ChatMain'
import Details from './Details'

const MainContainer = () => {
  return (
    <div className='w-11/12 h-11/12 p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-lg text-center text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15' style={{ backgroundColor: 'rgba(17, 25, 40, 0.75)' }}>
  
  {/* Left Panel */}
  <div className='lg:col-span-3 h-full border-b lg:border-b-0 lg:border-r border-white/15'>
    <LeftPannel />
  </div>

  {/* Chat Main */}
  <div className='lg:col-span-6 h-full border-b lg:border-b-0 lg:border-r border-white/15'>
    <ChatMain />
  </div>

  {/* Details */}
  <div className='lg:col-span-3 h-full'>
    <Details />
  </div>

</div>

  )
}

export default MainContainer
