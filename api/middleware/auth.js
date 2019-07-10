//IMPORTS
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
//local
const modelUsers = require('../models/users')
const jwtGenToken = require('../helpers/jwt_token_generator')
const jwtSecret = require('../../config/jwt_secret')
const check_fields = require('../helpers/check_req_fields')

//logging in
// authenticate = async (req, res, next) => {
//     console.log('middleware => authenticate')
//     const required_fields = ['username', 'password']

//     //check for required fields
//     if(check_fields(req.body, ...required_fields))
//         //remove any extra fields that might exist
//         req.body = {username: req.body.username, password: req.body.password}
//     else
//         //exit with error
//         return next(`These fields are required: ${required_fields}.`)

//     //finish this later
// }

//registering new user
register = async (req, res, next) => {
    const required_fields = ['username', 'password', 'email', 'first_name', 'last_name']

    //check if all required keys are provided
    if(!check_fields(req.body, ...required_fields))
        return next(`These fields are required: ${required_fields}.`)

    //check if username is unique
    if(await modelUsers.get_user_by({username: req.body.username}))
        return next(`Username ${req.body.username} is currently in use.`)
    
    //check if email is unqiue
    if(await modelUsers.get_user_by({email: req.body.email}))
        return next(`Email ${req.body.email} is currently in use.`)

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        uid: uuid.v4(),
        username: req.body.username,
        password: crypt.hashSync(req.body.password, 1),
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        avatar_src: req.body.avatar_src
    }
    next()
}

//EXPORTS
module.exports = {
    register,
}