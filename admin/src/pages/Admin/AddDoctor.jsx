import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docimage, setdocimage] = useState(false)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [experience, setexperience] = useState('1 year')
  const [fee, setfee] = useState('')
  const [about, setabout] = useState('')
  const [speciality, setspeciality] = useState('General physician')
  const [degree, setdegree] = useState('')
  const [address1, setaddress1] = useState('')
  const [address2, setaddress2] = useState('')

  const {atoken, backendUrl} = useContext(AdminContext); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      if(!docimage){
        return toast.error('Image not selected')
      }

      const formData = new FormData();
      formData.append('image',docimage)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fee',Number(fee))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1, line2:address2}))

      // formData.forEach((value,index)=>{
      //   console.log(`${index}: ${value}`);
        
      // })

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{atoken}})

      if(data.success){
        toast.success(data.message)
        setdocimage(false)
        setname('')
        setpassword('')
        setemail('')
        setabout('')
        setaddress1('')
        setaddress2('')
        setfee('')      
        setdegree('')
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }



  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full '>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="docimage">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimage ? URL.createObjectURL(docimage) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setdocimage(e.target.files[0])} type="file" id='docimage' hidden />
          <p>Upload doctor <br />picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 '>
          <div className='w-full lg:flex-1 flex flex-col gap-4 '>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input onChange={(e) => setname(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setemail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e) => setpassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setexperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10+ year">10+ year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>fee</p>
              <input onChange={(e) => setfee(e.target.value)} value={fee} className='border rounded px-3 py-2' type="text" placeholder='fee' required />
            </div>


          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setspeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setaddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
              <input onChange={(e) => setaddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2 '>About Doctor</p>
          <textarea onChange={(e) => setabout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded ' type='text' placeholder='write about doctor' rows={5} required></textarea>

        </div>

        <button type='submit' className='bg-primary px-10 py-3  mt-4 text-white rounded'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
