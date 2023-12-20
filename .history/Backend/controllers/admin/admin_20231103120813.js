const asyncHandler = require('express-async-handler')
const {
    superAdminRegister,
    superAdminLogin,
    tokenRequest,
    tokenConfirmation,
    deleteAdmin
} = require('./adminFunc/index')
const Tokens = require('../users/token/index')
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
   return res.json(tokenRequestService)
})

const tokenConfirmationController = asyncHandler( async (req,res,next) => {
    // console.log('incoming',req.query)
    const tokenService = await tokenConfirmation(req.query.token, req.query.id)
    return res.json(tokenService)
})

const requestTokenController = asyncHandler ( async (req,res,next) => {
    const requestTokenService = await Tokens(req.body)
    return res.json(requestTokenService)
})

const deleteAdminController = asyncHandler (async (req,res,next) => {
    const deleteAdminService = await deleteAdmin(req.params)
    return res.json(deleteAdminService)
})
module.exports = {
    SuperAdminSignUpController,
    superAdminLoginController,
    tokenRequestController,
    tokenConfirmationController,
    requestTokenController,
    deleteAdminController
}