import React from 'react'

const AddUser = () => {
  return (
    <div className='bg-[#111928] opacity-100 p-3 rounded-lg text-white backdrop-blur-[19px] backdrop-saturate-[180%] border border-white/15'>
      <form className='flex items-center justify-between gap-3' onSubmit={(e)=>{e.preventDefault()}}>
        <input type='text' placeholder='Username' className='w-full p-2 my-4 rounded bg-gray-800 border border-gray-700 text-white' />
        <button className='bg-blue-400 p-2  border-gray-200 rounded-lg'>Search</button>
    
      </form>
      <div className='p-2 flex items-center gap-3'>
        <img src='https://picsum.photos/200/300' alt='user avatar' className='w-10 h-10 rounded-full'/>
        <h1 className='text-white text-sm'>User Name</h1>
        <button className='ml-2 p-2 bg-blue-400 rounded-lg'>Add User</button>
      </div>
      
    </div>
  )
}

export default AddUser
