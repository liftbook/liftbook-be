//IMPORTS
const uuid = require("uuid")
//models
//helpers
const check = require('../helpers/check')
const updater = require('../helpers/update_body')
const retrieve = require('../helpers/retreive')

// ___      _______  _______    __   __  ___   ______   ______   ___      _______  _     _  _______  ______    _______ 
//|   |    |       ||       |  |  |_|  ||   | |      | |      | |   |    |       || | _ | ||   _   ||    _ |  |       |
//|   |    |   _   ||    ___|  |       ||   | |  _    ||  _    ||   |    |    ___|| || || ||  |_|  ||   | ||  |    ___|
//|   |    |  | |  ||   | __   |       ||   | | | |   || | |   ||   |    |   |___ |       ||       ||   |_||_ |   |___ 
//|   |___ |  |_|  ||   ||  |  |       ||   | | |_|   || |_|   ||   |___ |    ___||       ||       ||    __  ||    ___|
//|       ||       ||   |_| |  | ||_|| ||   | |       ||       ||       ||   |___ |   _   ||   _   ||   |  | ||   |___ 
//|_______||_______||_______|  |_|   |_||___| |______| |______| |_______||_______||__| |__||__| |__||___|  |_||_______|

check_required = async (req, res, next) => {
    const required_fields = ['username', 'exercise']
    const requirements_met = await check.required(req.body, ...required_fields)
    if(!requirements_met)
        return res.status(612).json({message: `Required fields are: ${required_fields}`})
    
    next()
}
prepare_new = async (req, res, next) => {
    const user = await retrieve.user_by_username(req.body.username)
    if(!user)
        return res.status(404).json({message: `Username ${req.body.username} couldn't be found.`})
    const exercise = await retrieve.exercise(req.body.exercise)
    if(!exercise)
        return res.status(404).json({message: `Exercise ${req.body.exercise} couldn't be found.`})

    req.body = {
        lid: uuid.v4(),
        uid: user.uid,
        eid: exercise.eid,
        duration: req.body.duration,
        repititions: req.body.repititions,
        distance: req.body.distance,
        heart_rate: req.body.heart_rate,
        weight: req.body.weight,
        calories: req.body.calories,
        notes: req.body.notes,
        datetime: req.body.datetime,
    }

    next()
}

get = async (req, res, next) => {
    const log = await retrieve.log(req.params.log)
    if(!log)
        return res.status(404).json({message: `Log ${req.params.log} couldn't be found.`})
    req.body.x = log
    next()
}

update = async (req, res, next) => {
    req.body = updater(req.body.x, req.body)
    next()
}

//EXPORTS
module.exports = {
    check_required,
    prepare_new,
    get,
    update
}