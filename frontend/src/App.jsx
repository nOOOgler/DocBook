import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Home, Doctors, Login, About, Contact, MyAppointment, MyProfile, Appointment} from './pages/index.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctors/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/myprofile' element={<MyProfile/>}/>
          <Route path='/myappointments' element={<MyAppointment/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
       </Routes>
       <Footer/>
    </div>
  )
}

export default App
