//IMPORTS
//local
const db = require('../../data/config')

// _______  _______  _______  ___        __   __  _______  ______   _______  ___      _______ 
//|       ||       ||   _   ||   |      |  |_|  ||       ||      | |       ||   |    |       |
//|    ___||   _   ||  |_|  ||   |      |       ||   _   ||  _    ||    ___||   |    |  _____|
//|   | __ |  | |  ||       ||   |      |       ||  | |  || | |   ||   |___ |   |    | |_____ 
//|   ||  ||  |_|  ||       ||   |___   |       ||  |_|  || |_|   ||    ___||   |___ |_____  |
//|   |_| ||       ||   _   ||       |  | ||_|| ||       ||       ||   |___ |       | _____| |
//|_______||_______||__| |__||_______|  |_|   |_||_______||______| |_______||_______||_______|

//create
const add = async goal => {
    await db('goals').insert(goal)
    return await get_by({gid: goal.gid})
}

//read
const get_all = async () => await db('goals')
const get_by = async (value) => await db('goals').where(value).first()
const get_user_goals = async (username) =>
    await db.select('goals.*')
        .from('goals')
        .join('users', {'users.uid': 'goals.uid'})
        .where({'users.username': username})
const get_user_goals_by_exercise = async (username, exercise) =>
    await db.select('goals.*')
        .from('goals')
        .join('users', {'users.uid': 'goals.uid'})
        .where({'users.username': username})
        .join('exercises', {'exercises.eid': 'goals.eid'})
        .where({'exercises.name': exercise})
        .orWhere({'exercises.eid': exercise})

//update
const update = async (goal) => {
    await db('goals')
        .where({gid: goal.gid})
        .update(goal)
    return await db('goals').where({gid: goal.gid})
}

//delete
const remove_by = async (value) =>
    await db('goals')
        .where(value)
        .delete()

//EXPORTS
module.exports = {
    add,
    get_all,
    get_by,
    get_user_goals,
    get_user_goals_by_exercise,
    update,
    remove_by,
}