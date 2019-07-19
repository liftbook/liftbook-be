//IMPORTS
const jwt = require('jsonwebtoken')
const secret = require('../../config/jwt_secret')

module.exports = user => {
    
    const payload = {
        subject: user.uid,
        username: user.username,
    }
    const options = {
        expiresIn: '2h'
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}