//IMPORTS
const uuid = require('uuid')
//local
const check_fields = require('../helpers/check_req_fields')
const modelLogs = require('../models/logs')
const modelUsers = require('../models/users')
const modelExercises = require('../models/exercises')

//add new
add = async (req, res, next) => {
    const required_fields = ['username']

    //check if all required keys are provided
    if(!check_fields(req.body, ...required_fields))
        return next(`These fields are required: ${required_fields}.`)
    
    //check if user exists
    const user = await modelUsers.get_user_by({username: req.body.user})
    if(!user)
        return next(`User: ${req.body.username} doesn't exist.`)
    
    //check if exercise exists
    let exercise
    if(req.body.name) 
        exercise = await modelExercises.get_exercise_by({name: req.body.name})
    if(!exercise && req.body.exercise_id)
        exercise = await  modelExercises.get_exercise_by({eid: req.body.exercise_name})
    if(!exercise)
        return next(`Can't find specified exercise.`)
    
    //rebuild reqbody
    req.body = {
        lid: uuid.v4(),
        uid: user.uid,
        eid: exercise.eid,
        repetitions: req.body.repetitions,
        distance: req.body.distance,
        heart_rate: req.body.heart_rate,
        weight: req.body.weight,
        calories: req.body.calories,
        notes: req.body.notes,
        datetime: req.body.datetime
    }

    next()
}

//update
update = async (req, res, next) => {
    //check if log exists
    let log = await modelLogs.get_log_by({lid: req.params.lid})
    if(!log)
        return next(`Couldn't find log ${req.params.lid}.`)

    //rebuild reqbody
    for(let key in log) {
        if(req.body.hasOwnProperty(key))
            log[key] = req.body[key]
    }
    req.body = log

    next()
}

//EXPORTS
module.exports = {
    add,
}