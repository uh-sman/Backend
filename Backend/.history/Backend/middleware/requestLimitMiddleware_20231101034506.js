const UserRequest = require('../models/requestLimit/requesLimit')
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 5;


const rateLimitMiddleWare = async  (req,res,next) => {
    const userId = req.params;
    console.log(userId)
    if(!userId)  throw new Error('not authorized')
    

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
}

module.exports = rateLimitMiddleWare
