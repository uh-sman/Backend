const servers = {
    server:[process.env.NODE_ENV === 'production' ? {
        url:'https://dcanestate.onrender.com',
        description:"Staging server"
    } : {
        url:"http://localhost:4000",
        description:"local server"
    }]
}

module.exports = servers