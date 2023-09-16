const asyncHandler = require('express-async-handler')

const createListing = (req,res) => {
    const {price,title,location,Description,amenities,nearestLandmark,unitType,distanceToLandmark} = req.body
    // check if listings 

    if(!price || !title || !location || !Description){
        res.status(400)
    }
    res.send({price,title,location,Description,amenities,nearestLandmark,unitType,distanceToLandmark})
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