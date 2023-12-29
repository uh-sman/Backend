// import LoginUser from './login-user.js'
// import RegisterUser from './register-user.js'
const LoginUser = require('./login-user')
const RegisterUser = require('./register-user')

const todoPaths = {
    paths:{
        '/api/users':{
            ...RegisterUser
        },
        '/api/users/login':{
            ...LoginUser,
        }
    }
}

// export default todoPaths;
module.exports = todoPaths