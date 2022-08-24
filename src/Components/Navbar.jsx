import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import React, { useState } from 'react'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  return (
    <div className="flex justify-between md:justify-around items-center py-4 px-12">
      <h1 className="text-white text-2xl lg:text-4xl font-light">CryptoX</h1>
      <ul className="hidden md:flex text-white ">
        <li className="mx-4 cursor-pointer lg:text-xl text-lg font-light">Market</li>
        <li className="mx-4 cursor-pointer lg:text-xl text-lg font-light">Tutorials</li>
        <li className="mx-4 cursor-pointer lg:text-xl text-lg font-light">Exchange</li>
        <li className="mx-4 cursor-pointer lg:text-xl text-lg font-light">Wallets</li>
      </ul>

      { toggle ? (
          <div className="flex z-10 justify-between glass-window p-4 fixed right-0 top-0 h-screen w-3/5 animate-slide">
            <AiOutlineClose onClick={() => setToggle(false)} className='cursor-pointer text-black' />
            <ul className="text-white">
              <li className="mx-4 cursor-pointer lg:text-xl text-xl text-black font-light">Market</li>
              <li className="mx-4 cursor-pointer lg:text-xl text-xl text-black font-light mt-4">Tutorials</li>
              <li className="mx-4 cursor-pointer lg:text-xl text-xl text-black font-light mt-4">Exchange</li>
              <li className="mx-4 cursor-pointer lg:text-xl text-xl text-black font-light mt-4">Wallets</li>
            </ul>
          </div>
      ) : (
        <HiMenuAlt4 onClick={() => setToggle(true)} className="text-white text-3xl cursor-pointer md:hidden"/>
      )}      
    </div>
  )
}

export default Navbar