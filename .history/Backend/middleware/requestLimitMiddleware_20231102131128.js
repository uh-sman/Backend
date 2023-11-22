const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const UserRequest = require('../models/requestLimit/requestLimit')
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 5;


const rateLimitMiddleWare = asyncHandler(async  (req,res,next, data) => {
    // const { userId } = data
    const { email } = req.body
    // const userId = await User.findById(req.params.id)
    const user = await  User.findOne({ email })
    // const userId = req.user.id
    let userId = user._id
    
    // let id ;

    // console.log('userId', email)
    if(!userId)  throw new Error('not authorized')
   
    // .user.id
    // let userExists = await UserRequest.findOne({ userId: user._id }).where('userId').gte(5)
    // // // console.log('userExists',userExists)
    // if (userExists) {
    //     // await UserRequest.findOne({userId: {$gt: 1}})
    //     // userExists.findOne({userId: {$gt: 5}})
    //     res.json({message:'failed'})
    // }
    // else{
    //     console.log('success')
    // }
    // const countDoc = await userExists.countDocuments({userId: {$gt : 5}})
        // if(userExists) await userExists.deleteOne()
        // if(countDoc) await countDoc.deleteOne()
 

    const currentTime = new Date();
    const timeWindowStart = new Date(currentTime - RATE_LIMIT_WINDOW_MS);
    
    const requestCount = await UserRequest.findOne({userId:userId}).countDocuments({
        userId,
        timestamp:{$gte: timeWindowStart, $lte: currentTime}
    })

    if(requestCount >= RATE_LIMIT_MAX_REQUESTS){
        // User has exceeded the rate limit calculate time until next valid request

        const timeUntilValid = RATE_LIMIT_WINDOW_MS - (currentTime - timeWindowStart)
          res.status(429).json({
            error: `You have exceeded the limit. Try again in ${timeUntilValid / 1000} seconds.`
        })
        await UserRequest.deleteOne()
        
    }

    await new UserRequest({
        userId,
        timestamp: currentTime
    }).save()
    next()

    await UserRequest.deleteOne()
})

module.exports = rateLimitMiddleWare
