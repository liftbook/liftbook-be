//IMPORTS
//local
const db = require('../../data/config')

//MODELS
//create
const add_exercise = async exercise => {
    await db('exercises').insert(exercise)
    return get_exercise_by({eid: exercise.eid})
}

//read
const get_all_exercises = async () =>
    await db('exercises')
//takes an object{eid: 133337}
const get_exercise_by = async value => //old
    await db('exercises').where(value).first()
const get_by = async value =>
    await db('exercises').where(value).first()
const get_by_id_or_name = async value =>
    await db('exercises').where({eid: value}).orWhere({name: value}).first()

//update
const update_exercise = async (exercise) => {
    return await db('exercises').where({eid: exercise.eid}).update(exercise)
}
    
//delete
const remove_exercise = async eid => {
    await db('exercises').where({eid: eid}).delete()
    return await get_all_exercises()
}

//EXPORT
module.exports = {
    add_exercise,
    get_all_exercises,
    get_exercise_by, //old
    get_by,
    get_by_id_or_name,
    update_exercise,
    remove_exercise
}