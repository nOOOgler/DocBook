import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from './pages/Admin/AllAppointment'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
      const {atoken} = useContext(AdminContext)
      const {dtoken} = useContext(DoctorContext)

  return atoken || dtoken ? (
    
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path ='/' element={<></>}/>
          <Route path ='/admin-dashboard' element={<Dashboard/>}/>
          <Route path ='/all-appointment' element={<AllAppointment/>}/>
          <Route path ='/add-doctor' element={<AddDoctor/>}/>
          <Route path ='/doctor-list' element={<DoctorList/>}/>

          {/* doctor routes */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
