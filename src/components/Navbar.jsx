import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#452264] text-white py-3'>
      <nav className="flex justify-between mx-7 ">
        <div className="logo mx-5">
            <span className='text-xl font-bold cursor-pointer'>iTasks</span>
        </div>
        <ul className="flex gap-3 ">
            <li className=' cursor-pointer hover:font-bold'>Home</li>
            <li className=' cursor-pointer hover:font-bold'>YourTasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
