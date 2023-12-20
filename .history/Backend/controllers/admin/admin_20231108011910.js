const asyncHandler = require('express-async-handler')
const {
    superAdminRegister,
    superAdminLogin,
    tokenRequest,
    tokenConfirmation,
    deleteAdmin,
    getUserByAdmin,
    createAdmin,
    updateAdmin
} = require('./adminFunc/index')
const Tokens = require('../users/token/index')
const SuperAdminSignUpController = asyncHandler(async (req,res ,next) => {
    try{
        const superAdminRegisterService = await superAdminRegister(req.body)
        return res.json(superAdminRegisterService)
    }catch(error) {
        res.status(500)
        throw new Error ('failed' + error.message)
    }
})


const superAdminLoginController = asyncHandler (async (req,res,next) => {
    try{
        const superAdminLoginService = await superAdminLogin(req.body)
        return res.json(superAdminLoginService)

    }catch(error){
        res.status(500)
        throw new Error(error,message)
    }
})


const tokenRequestController = asyncHandler( async (req,res,next) => {
    const tokenRequestService = await tokenRequest(req.body)
   return res.json(tokenRequestService)
})

const tokenConfirmationController = asyncHandler( async (req,res,next) => {
    const tokenService = await tokenConfirmation(req.query.token, req.query.id)
    return res.json(tokenService)
})

const requestTokenController = asyncHandler ( async (req,res,next) => {
    const requestTokenService = await Tokens(req.body)
    return res.json(requestTokenService)
})

const deleteAdminController = asyncHandler (async (req,res,next) => {
    try{
        const deleteAdminService = await deleteAdmin(req.query.userId)
        return res.json(deleteAdminService)
    }
    catch(error){
        return res.status(500).json({message: 'Error deleting user', error: error.message})
    }
})

const getUserByAdminController = asyncHandler (async (req, res) => {
    console.log(req.body)
    // res.send(req.body.roleName)
    const getUserByAdminRegister = await getUserByAdmin(req.body.roleName)
    return res.json(getUserByAdminRegister)
})

const createAdminController = asyncHandler ( async (req,res) => {
    const createAdminService = await createAdmin(req.query.userId)
    res.json(createAdminService)
})

const updateAdminController = asyncHandler ( async (req,res) => {
    try{
        const updateAdminService = await updateAdmin(req)
        return res.json(updateAdminService)
    }catch(error){
        res.send(error)
    }
} )
module.exports = {
    SuperAdminSignUpController,
    superAdminLoginController,
    tokenRequestController,
    tokenConfirmationController,
    requestTokenController,
    deleteAdminController,
    getUserByAdminController,
    createAdminController,
    updateAdminController
}