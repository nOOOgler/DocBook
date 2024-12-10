import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity changed' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//doctor login api
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        console.log(doctor.password);

        if (!doctor) {
            res.json({ success: false, message: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        console.log(isMatch);


        if (isMatch) {
            const dtoken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, dtoken })
        } else {
            res.json({ success: false, message: "invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//doctors appointment
const doctorAppointments = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//complete appointment api
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: "Mark Failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//cancel appointment api
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: "Appointment cancelled" })
        } else {
            return res.json({ success: false, message: "Cancellation Failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//dashboard api
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


//doctor profile api
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//doctor profile update api
const updateDoctor = async (req, res) => {
    try {
        const { docId, fee, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fee, address, available })
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export {
    changeAvailability, doctorList, loginDoctor, doctorAppointments,
    appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctor
}