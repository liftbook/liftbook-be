//IMPORTS
//local
const db = require('../../data/config')

//MODELS
//create
const add_exercise = async exercise => {
    console.log(exercise)
    await db('exercises').insert(exercise)
    return get_exercise_by({eid: exerise.eid})
}

//read
const get_all_exercises = async () =>
    await db('exercises')
//takes an object{eid: 133337}
const get_exercise_by = async value =>
    await db('exercises').where(value).first()

//update
const update_exercise = async (id, exercise) => {
    console.log('value in model', id)
    return await db('exercises').where({eid: id}).update(exercise)
}
    
//delete
const remove_exercise = async eid =>
    await db('exercises').where({eid}).del()

//EXPORT
module.exports = {
    add_exercise,
    get_all_exercises,
    get_exercise_by,
    update_exercise,
    remove_exercise
}