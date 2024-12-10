import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [dtoken, setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
  const [appointments, setappointments] = useState([])
  const [dashData, setdashData] = useState(false)
  const [profiledata, setprofiledata] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dtoken } })
      if (data.success) {
        setappointments(data.appointments)
        console.log(data.appointments);

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const appointmentComplete = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/appointment-complete', { appointmentId }, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const appointmentCancel = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/doctor/appointment-cancel', { appointmentId }, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/doctor-dashboard', { headers: { dtoken } })
      if (data.success) {
        setdashData(data.dashData)
        console.log(data.dashData);

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/doctor-profile', { headers: { dtoken } })
      if (data.success) {
        setprofiledata(data.profileData)
        console.log(data.profileData);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  const value = {
    backendUrl, dtoken, setdtoken,
    getAppointments, appointments, setappointments,
    appointmentComplete, appointmentCancel,
    dashData, setdashData, getDashData,
    getProfileData, setprofiledata, profiledata
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider