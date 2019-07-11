//IMPORTS
const uuid = require('uuid')
//local
const check_fields = require('../helpers/check_req_fields')
const modelExercises = require('../models/exercises')
const modelUsers = require('../models/users')

//adding an exercise
add = async (req, res, next) => {
    const required_fields = ['name', 'username', 'description']

    //check if all required keys are provided
    if(!check_fields(req.body, ...required_fields))
        return next(`These fields are required: ${required_fields}.`)

    //check if name is unique
    if(await modelExercises.get_exercise_by({name: req.body.name}))
        return next(`Exercise name: ${req.body.name} is currently in use.`)

    //check if username exists and get uid if it does
    const user = modelUsers.get_user_by({username: req.body.username})
    if(user)
        req.body.uid = user.uid
    else 
        return next(`User: ${req.body.username} doesn't exist.`)

    //rebuild reqbody
    req.body = {
        eid: uuid.v4(),
        created_by: req.body.uid,
        updated_by: req.body.uid,
        name: req.body.name,
        description: req.body.description,
        icon_src: req.body.icon_src
    }

    next()
}

//updating an exercise
update = async (req, res, next) => {
    //check if exercise exists
        //--by id
    let exercise = await modelExercises.get_exercise_by({eid: req.params.id})
    if(!exercise)
        //--by name
        exercise = await modelExercises.get_exercise_by({name: req.params.id})
    if(!exercise)
        return next(`Couldn't find exercise ${req.params.id}.`)
    
    //rebuild reqbody
    for(let key in exercise) {
        req.body.hasOwnProperty(key)
            exercise[key] = req.body[key]
    }
    req.body = exercise

    next()
}

//remove an exercise
remove = async (req, res, next) => {
    //check if exercise exists
        //--by id
    let exercise = await modelExercises.get_exercise_by({eid: req.params.id})
    if(!exercise)
        //--by name
        exercise = await modelExercises.get_exercise_by({name: req.params.id})
    if(!exercise)
        return next(`Couldn't find exercise ${req.params.id}.`)
    
    //rebuild reqbody
    req.body = exercise

    next()
}

//EXPORTS
module.exports = {
    add,
    update,
    remove
}