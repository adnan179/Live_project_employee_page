import React from 'react'

const Navbar = () => {
  return (
    <div className='items-center p-3 flex gap-3 sticky inset-0 w-full h-[80px] bg-gray-100'>
        <h1 className='text-[32px] font-bold'>Song River</h1>
        <h2 className='text-[24px] font-semibold text-blue-500'>Employee Directory</h2>
    </div>
  )
}

export default Navbar;