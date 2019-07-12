const modelUsers = require('../models/users')

module.exports = async (username) => {
    const user = await modelUsers.get_user_by({username: username})
    if(user) return user
    return false
}