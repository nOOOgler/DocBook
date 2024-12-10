import React, {useContext, useState} from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';



const Navbar = () => {

    const navigate = useNavigate();
    const [showmenu, setshowmenu] = useState(false)
    const {token, settoken, userData} = useContext(AppContext);
    const logout = ()=>{
      settoken(false)
      localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={()=>{navigate("/"); scrollTo(0,0)}} className='w-48 cursor-pointer ' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start gap-12 font-medium uppercase'>
        <NavLink to={"/"}>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/doctors'}>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/about'}>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to={'/contact'}>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
            token && userData
            ? <div className='flex item-center gap-2 cursor-pointer group relative'>
                <img className='w-10 rounded-full ' src={userData.image} alt="" />
                <img className="w-2.5"  src={assets.dropdown_icon} alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600  hidden group-hover:block '>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                        <p onClick={()=>{navigate("/myprofile")}} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>{navigate("/myappointments")}} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            : <button
            onClick={()=>{
                navigate('/login')
            }}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }

        <img onClick={()=>setshowmenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* Mobile sidebar */}
        <div className={`${showmenu? 'fixed w-full ' : 'w-0 h-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36 ' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setshowmenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 text-lg px-5 font-medium'>
            <NavLink onClick={()=>setshowmenu(false)}  to={'/'}><p className={'px-4 py-2 rounded inline-block'}>Home</p></NavLink>
            <NavLink onClick={()=>setshowmenu(false)}  to={'/doctors'}><p className={'px-4 py-2 rounded inline-block'}>All Doctors</p></NavLink>
            <NavLink onClick={()=>setshowmenu(false)}  to={'/about'}><p className={'px-4 py-2 rounded inline-block'}>About</p></NavLink>
            <NavLink onClick={()=>setshowmenu(false)}  to={'/contact'}><p className={'px-4 py-2 rounded inline-block'}>Contact</p></NavLink>
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
