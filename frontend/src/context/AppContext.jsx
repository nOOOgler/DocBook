import { createContext, useState, useEffect } from "react";
import {toast} from 'react-toastify'

export const AppContext = createContext();
import axios from 'axios'

const AppContextProvider = (props)=>{
    const [doctors, setdoctors] = useState([])

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[token,settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : false )
    const[userData, setuserData] = useState(false)
    

    const getDoctorsData = async () => {
        try {
            const {data} =  await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
              setdoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loaduserProfile = async () => {
        try {
           const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}}) 
           if(data.success){
            setuserData(data.userData)
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const value = {
        doctors, currencySymbol,getDoctorsData,
        token, settoken,
        backendUrl,
        userData,setuserData, loaduserProfile
    }

    useEffect(() => {
      getDoctorsData()
    }, [])

    useEffect(() => {
      if(token){
        loaduserProfile()
      }else{
        setuserData(false)
      }
    }, [token])
    
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider