import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext)
  const { dtoken, setdtoken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    atoken && setatoken('')
    atoken && localStorage.removeItem('atoken')
    dtoken && setdtoken('')
    dtoken && localStorage.removeItem('dtoken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-48 sm:w-52 cursor-pointer' src={assets.logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white tex-sm px-10 py-2 rounded-full '>Logout</button>
    </div>
  )
}

export default Navbar
