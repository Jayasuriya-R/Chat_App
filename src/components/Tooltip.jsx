import React from 'react'

const Tooltip = ({desc}) => {
  return (
    <div className='absolute top-full left-1/2 -translate-x-1/2 mt-1 
                   px-2 py-1 text-xs text-white bg-black rounded 
                   invisible group-hover:visible whitespace-nowrap z-10'>
      <span>{desc}</span>
    </div>
  )
}

export default Tooltip
