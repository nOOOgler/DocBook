import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { getProfileData, setprofiledata, profiledata, dtoken, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setisEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profiledata.address,
        fee: profiledata.fee,
        available: profiledata.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/profile-update', updateData, { headers: { dtoken } })
      if (data.success) {
        toast.success(data.message)
        setisEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);

    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])

  return profiledata && (
    <div>

      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profiledata.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white '>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700 '>{profiledata.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600 '>
            <p>{profiledata.degree}- {profiledata.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profiledata.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 '>{profiledata.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>Appointment Fee:
            <span className='text-gray-800 '>{currency} {isEdit ? <input type="number" onChange={(e) => setprofiledata(prev => ({ ...prev, fee: e.target.value }))} value={profiledata.fee} /> : profiledata.fee}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setprofiledata(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profiledata.address.line1} /> : profiledata.address.line1} <br />
              {isEdit ? <input type="text" onChange={(e) => setprofiledata(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profiledata.address.line2} /> : profiledata.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setprofiledata(prev => ({ ...prev, available: !prev.available }))} checked={profiledata.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
              ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              : <button onClick={() => setisEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }


        </div>
      </div>

    </div>
  )
}

export default DoctorProfile
