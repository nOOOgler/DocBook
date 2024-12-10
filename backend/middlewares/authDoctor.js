import jwt from 'jsonwebtoken'

//Dcotor authentication
const authDoctor = async (req,res,next)=>{
     try {
        const {dtoken} = req.headers
        if(!dtoken){
            return res.json({success:false, message:"Not authorized !! Login Again"})
        }

        const dtoken_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = dtoken_decode.id
     next();
     } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
     }
}

export default authDoctor