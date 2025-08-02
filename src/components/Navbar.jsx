import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex  items-center px-4 justify-between h-14 py-5">
      <div className="logo font-bold text-white text-2xl">
        <span className='text-green-700'>&lt;</span>
       <span>Pass</span>
        <span className='text-green-700'>OP/&gt;</span>
       
        </div>
      {/* <ul>
        <li className='flex gap-4'>
          <a href="/" className='hover:font-bold'>Home</a>
          <a href="#" className='hover:font-bold'>About</a>
          <a href="#" className='hover:font-bold'>Contact</a>

        </li>
      </ul> */}

      <button>
        <img src="icons/github.svg" alt="github" />
      </button>



      </div>
    </nav>
     
  )
}

export default Navbar