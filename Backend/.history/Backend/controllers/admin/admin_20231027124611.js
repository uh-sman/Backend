const asyncHandler = require('express-async-handler')
const {
    superAdminRegister,
    superAdminLogin,
    tokenRequest
} = require('./adminFunc/index')
const SuperAdminSignUpController = asyncHandler(async (req,res ,next) => {
    const superAdminRegisterService = await superAdminRegister(req.body)
    return res.json(superAdminRegisterService)
})


const superAdminLoginController = asyncHandler (async (req,res,next) => {
const superAdminLoginService = await superAdminLogin(req.body)
return res.json(superAdminLoginService)
})


const tokenRequestController = asyncHandler( async (req,res,next) => {
    const tokenRequestService = await tokenRequest(req.body)
   return  res.json(tokenRequestService)
})
module.exports = {
    SuperAdminSignUpController,
    superAdminLoginController,
    tokenRequestController
}