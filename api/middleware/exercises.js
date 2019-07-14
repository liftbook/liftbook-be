//IMPORTS
const uuid = require('uuid')
//local
const modelExercises = require('../models/exercises')
const updater = require('../helpers/update_body')
const retrieve = require('../helpers/retreive')
const check = require('../helpers/check')

//prepares the reqbody for insertion into the db
//removes all unnessary fields for protection
prepare_new = async (req, res, next) => {
    const user = await retrieve.user_by_username(req.body.username)
    req.body = {
        eid: uuid.v4(),
        created_by: user.uid,
        updated_by: user.uid,
        name: req.body.name,
        description: req.body.description,
        icon_src: req.body.icon_src
    }
    next()
}

//MUST proceed "get" middleware
update = async (req, res, next) => {
    //if a username is provided and exists in the db
    //updates the "updated_by" field with the uid of that user
    //otherwise sets "updated_by" to an empty string
    if(req.body.username) {
        const user = await retrieve.user_by_username(req.body.username)
        user
        ?   req.body.updated_by = user.uid
        :   req.body.updated_by = ''
    }
    else
        req.body.updated_by = ''

    //updates req.body.x with any matching fields in req.body
    //then replaces req.body with req.body.x
    req.body = updater(req.body.x, req.body)
    console.log('update', req.body)
    next()
}

check_required = async (req, res, next) => {
    const required_fields = ['name', 'username', 'description']
    const requirements_met = await check.required(req.body, required_fields)
    if(requirements_met) return res.status(612).json({message: `nope`})
    next()
}

check_unqiue = async (req, res, next) => {
    const unique_fields = ['eid', 'name'] //unique to exercises
    //loops through req.body and checks if any keys match the unique fields
    //if there's a match, it checks to see if it's value already exists in the db
    //returns true if test passes
    //returns the key it failed on it test fails
    const unique = await check.unique(req.body, unique_fields, modelExercises)
    console.log('made it here')
    if(true !== unique)
        return res.status(612).json({message: `${req.body[unique]} is already in use.`})
    next()
}

//takes in an exercise id or name from params
//finds exercise in the db and adds it to req.body.x
get = async (req, res, next) => {
    let exercise = await retrieve.exercise(req.params.exercise)
    if(!exercise)
        return res.status(504).json({message: `Couldn't find exercise ${req.params.exercise}`})
    req.body.x = exercise
    next()
}

//EXPORTS
module.exports = {
    get,
    check_unqiue,
    check_required,
    prepare_new,
    update,
}