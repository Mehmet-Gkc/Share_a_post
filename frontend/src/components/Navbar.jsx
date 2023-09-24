import React from 'react'
import { BiLogOut } from 'react-icons/bi'

function Navbar() {

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/logout');            
            localStorage.clear();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        window.location = '/'
      };

  return (
    <div className='h-20 bg-indigo-600 flex items-center justify-between px-5'>
      <div className='text-white font-bold text-2xl cursor-pointer uppercase'>post paylas</div>
      <div className='flex items-center justify-between space-x-5 '>
        <input type="text" placeholder='search' className='p-2 outline-none rounded-md'/>
        <div className='w-36 border p-2 rounded-md uppercase text-white text-center cursor-pointer hover:bg-indigo-800'>post olustur</div>
        <BiLogOut onClick={handleLogout} size={25} className='text-white cursor-pointer'/>
      </div>
    </div>
  )
}

export default Navbar
