const modelUsers = require('../models/users')

check_user = async (req, res, next) => {
    const username = req.params.username || req.body.udername
    const user = await modelUsers.get_user_by({username: username})
    if(user) {
        req.body.uid = user.uid
        next()
    }
    else
        res.status(404).json({message: `Username ${username} couldn't be found.`})
}

module.exports = {
    check_user,
}