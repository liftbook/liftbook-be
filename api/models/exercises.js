//IMPORTS
//local
const db = require('../../data/config')

//MODELS
//create
const add_exercise = async exerise => {
    await db('exercises').insert(exercise)
    return get_exercise_by({eid: exerise.eid})
}
//read
const get_all_exercises = async () =>
    await db('exercises')
//takes an object{eid: 133337}
const get_exercise_by = async value =>
    await db('exercises').where(value).first()

//EXPORT
module.exports = {
    add_exercise,
    get_all_exercises,
    get_exercise_by
}