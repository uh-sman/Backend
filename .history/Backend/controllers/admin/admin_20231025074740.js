const asyncHandler = require('express-async-handler')
const superAdminRegister = require('./adminFunc/index')
const SuperAdminController = asyncHandler(async (req,res ,next) => {
    const superAdminService = await superAdminRegister(req.body)
    return res.json(superAdminService)
})

module.exports = SuperAdminController