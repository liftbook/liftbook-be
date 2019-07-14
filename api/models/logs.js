//IMPORTS
//local
const db = require('../../data/config')

// ___      _______  _______    __   __  _______  ______   _______  ___      _______ 
//|   |    |       ||       |  |  |_|  ||       ||      | |       ||   |    |       |
//|   |    |   _   ||    ___|  |       ||   _   ||  _    ||    ___||   |    |  _____|
//|   |    |  | |  ||   | __   |       ||  | |  || | |   ||   |___ |   |    | |_____ 
//|   |___ |  |_|  ||   ||  |  |       ||  |_|  || |_|   ||    ___||   |___ |_____  |
//|       ||       ||   |_| |  | ||_|| ||       ||       ||   |___ |       | _____| |
//|_______||_______||_______|  |_|   |_||_______||______| |_______||_______||_______|

//create
const add = async log => {
    await db('logs').insert(log)
    return await get_by({lid: log.lid})
}

//read
const get_all = async () => await db('logs')
const get_by = async (value) => await db('logs').where(value).first()
const get_user_logs = async (username) =>
    await db.select('logs.*')
        .from('logs')
        .join('users', {'users.uid': 'logs.uid'})
        .where({'users.username': username})
const get_user_logs_by_exercise = async (username, exercise) =>
    await db.select('logs.*')
        .from('logs')
        .join('users', {'users.uid': 'logs.uid'})
        .where({'users.username': username})
        .join('exercises', {'exercises.eid': 'records.eid'})
        .where({'exercises.name': exercise})
        .orWhere({'exercises.eid': exercise})
//update
const update = async (log) =>
    await db('logs')
        .where({lid: log.lid})
        .update(log)
//delete
const remove_by = async (value) =>
    await db('logs')
        .where(value)
        .delete()

//EXPORT
module.exports = {
    add,
    get_all,
    get_by,
    get_user_logs,
    get_user_logs_by_exercise,
    update,
    remove_by
}