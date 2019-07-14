//IMPORTS
const crypt = require('bcryptjs')
const uuid = require('uuid')
//local
const jwtGenToken = require('../helpers/jwt_token_generator')
const check = require('../helpers/check')
const get = require('../helpers/retreive')

//logging in
authenticate = async (req, res, next) => {
    const required_fields = ['username', 'password']

    //check if all required keys are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({message: `The required fields are: ${required_fields}.`})

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        username: req.body.username,
        password: req.body.password
    }
    
    next()
}
username_exists = async (req, res, next) => {
    const user = await get.user_by_username(req.body.username)
    if(user)
        req.body.user = user
    else
        return res.status(404).json({message: `Username ${req.body.username} couldn't be found.`})

    next()
}
password_matches = async (req, res, next) => {
    if(crypt.compareSync(req.body.password, req.body.user.password))
        req.authorization = jwtGenToken(req.body.user)
    else
        return res.status(403).json({message: `Incorrect password dumbass.`})

    next()
}

//registering new user
register = async (req, res, next) => {
    const required_fields = ['username', 'password', 'email', 'first_name', 'last_name']

    //check if all required keys are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({message: `The required fields are: ${required_fields}.`})

    //check if username is unique
    if(await get.user_by_username(req.body.username))
        return next(`Username ${req.body.username} is currently in use.`)
    
    //check if email is unqiue
    if(await get.user_by_email(req.body.email))
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
    authenticate,
    username_exists,
    password_matches,
}