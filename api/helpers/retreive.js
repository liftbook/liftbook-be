const modelExercises = require('../models/exercises')
const modelUsers = require('../models/users')
const modelRecords = require('../models/records')
const modelLogs = require('../models/logs')
const modelGoals = require('../models/goals')

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
//record_id is an id
record = async (record_id) => {
    const reccord = await modelRecords.get_record_by({rid: record_id})
    if(reccord) return reccord
    else return false
}
//log_id is an id
log = async (log_id) => {
    const log = await modelLogs.get_by({lid: log_id})
    if(log) return log
    else return false
}
//goal_id is an id
goal = async (goal_id) => {
    const goal = await modelGoals.get_by({gid: goal_id})
    if(goal) return goal
    else return false
}

module.exports = {
    user_by_username,
    user_by_email,
    record,
    exercise,
    log,
    goal
}