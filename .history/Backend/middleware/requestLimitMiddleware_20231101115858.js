const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const UserRequest = require('../models/requestLimit/requesLimit')
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

    console.log('userId', email)
    if(!userId)  throw new Error('not authorized')
    // .user.id

    const currentTime = new Date();
    const timeWindowStart = new Date(currentTime - RATE_LIMIT_WINDOW_MS);
    
    const requestCount = await UserRequest.countDocuments({
        userId,
        timestamp:{$gte: timeWindowStart, $lte: currentTime}
    })

    if(requestCount >= RATE_LIMIT_MAX_REQUESTS){
        // User has exceeded the rate limit calculate time until next valid request

        const timeUntilValid = RATE_LIMIT_WINDOW_MS - (currentTime - timeWindowStart)
        return res.status(429).json({
            error: `You have exceeded the limit. Try again in ${timeUntilValid / 1000} seconds.`
        })
    }

    await new UserRequest({
        userId,
        timestamp: currentTime
    }).save()
    next()
})

module.exports = rateLimitMiddleWare
