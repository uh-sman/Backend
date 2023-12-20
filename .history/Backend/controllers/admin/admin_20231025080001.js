const asyncHandler = require('express-async-handler')
const {
    superAdminRegister,
    superAdminLogin
} = require('./adminFunc/index')
const SuperAdminSignUpController = asyncHandler(async (req,res ,next) => {
    const superAdminRegisterService = await superAdminRegister(req.body)
    return res.json(superAdminRegisterService)
})


const superAdminLoginController = asyncHandler (async (req,res,next) => {
const superAdminLoginService = await superAdminLogin(req.body)
return res.json(superAdminLoginService)
})
module.exports = {
    SuperAdminSignUpController,
    superAdminLoginController
}