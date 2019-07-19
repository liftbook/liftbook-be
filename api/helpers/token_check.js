const jwt = require("jsonwebtoken");

const jwtKey = require("../../config/jwt_secret.js");

token_check = (req, res, next) => {
    const token = req.headers.authorization
    console.log('checking the token, bitch')
    if(token) {
        jwt.verify(token, jwtKey, (err, decoded) => {
            console.log(err)
            if(err) return res.status(401).json(err);

            req.decoded = decoded;
            next();
        })
    } else {
        return res.status(401).json({
            error: "No token on the Auth header, rookie!"
        })
    }
}

module.exports = {
    token_check
}