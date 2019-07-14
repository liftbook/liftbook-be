const modelExercises = require('../models/exercises')
const modelUsers = require('../models/users')
const modelLogs = require('../models/logs')

//user is a username
user_by_username = async (username) => {
    const user = await modelUsers.get_user_by({username: username})
    if(user) return user
    else return false
}
//email is a user email
user_by_email = async (email) => {
    const user = await modelUsers.get_user_by({email: email})
    if(user) return user
    else return false
}
//exercise is either an exercise name or id
exercise = async (exercise) => {
    const exxxercise = await modelExercises.get_by_id_or_name(exercise)
    if(exxxercise) return exxxercise
    else return false
}
//log_id is an id
log = async (log_id) => {
    const log = await modelLogs.get_log_by({lid: log_id})
    if(log) return log
    else return false
}

module.exports = {
    user_by_username,
    user_by_email,
    exercise,
    log
}