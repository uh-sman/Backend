const asyncHandler = require('express-async-handler')

const OtpRouter = asyncHandler(async(req,res) => {
    try{
        const {email,subject,message,duration} = req.body
    }catch(error){
        res.status(401).send({error})
    }
})

const sendOTP = async({email,subject,message,duration = 1}) => {
    try{
        if(!(email && subject && message))
    }catch(error) {

    }
}