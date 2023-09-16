const asyncHandler = require('express-async-handler')

const createListing = (req,res) => {
    res.send(req.body)
}
const deleteListing = (req,res) => {
    res.send(req.body)
}
const updateListing = (req,res) => {
    res.send(req.body)
}
const getListing = (req,res) => {
    res.send(req.body)
}
// const createListing = (req,res) => {
//     res.send(req.body)
// }


module.exports = {
createListing,
deleteListing,
updateListing,
getListing
}