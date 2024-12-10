import validator from  'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import {stringify} from 'flatted'
import userModel from '../models/userModel.js'
//API for adding doctor

const addDoctor = async (req,res)=>{
    try {
        const {name, email, password, speciality, degree, experience, about, fee, address} = req.body
        const imageFile = req.file

        //cjheck all fields
        if(!name || !email || !password || !speciality || !degree || !experience || !about ||!fee || !address){
            return res.json({success:false, message:"Missing Details"})
        }

        //email validation
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter valid Email"})
        }

        //strong password validation
        if(password.length< 8){
            return res.json({success:false, message:"Please enter strong password"})
        }

        //password encrypt
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to clodinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address:JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true, message:"Doctor Added"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}


//Admin login api
const loginAdmin = async (req, res)=>{
    try {
        const { email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token}) 
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//all doctors api (admin)
const allDoctors = async (req,res) => {
    try {
      const doctors = await doctorModel.find({}).select('-password')
      res.json({success:true, doctors})  
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//all appointments api

// const appointmentsAdmin = async (req,res) => {
//     try {
//         const appointments = appointmentModel.find({});
        

//         res.json({ success: true, appointments })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }


const appointmentsAdmin = async (req, res) => {
    try {
        // Fetch appointments from the database
        const appointments = await appointmentModel.find({}).lean(); // Use .lean() to get plain JavaScript objects

        // Check if any appointments exist
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found" });
        }

        // Send the sanitized data
        res.json({ success: true, appointments });
    } catch (error) {
        console.error("Error in appointmentsAdmin:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//cancel appointment api
const cancelAppointmentAdmin = async (req, res) => {
    try {
        const {  appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId)
        let slots_booked = docData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e != slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//dashboard data api
const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)

        } 
        res.json({success:true, dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {addDoctor, loginAdmin, allDoctors,appointmentsAdmin,cancelAppointmentAdmin,adminDashboard}