//IMPORTS
//local
const db = require('../../data/config')

//MODELS
//create
const add_log = async log => {
    await db('logs').insert(log)
    return get_log_by({lid: log.lid})
}
//read
const get_all_logs = async () =>
    await db('logs')
const get_log_by = async value =>
    await db('logs').where(value).first()
//USER
const get_all_user_logs = async uid =>
    null
const get_all_user_logs_for_exercise = async (uid, eid) =>
    null

//update
const update_log = async (lid, log) =>
    null

//delete
const remove_log = async lid =>
    null
const remove_all_logs = async () =>
    null
const remove_all_user_logs = async uid =>
    null
const remove_all_user_logs_for_exercise = async (uid, eid) =>
    null

//EXPORT
module.exports = {
    add_log,
    get_all_logs,
    get_log_by,
    get_all_user_logs,
    get_all_user_logs_for_exercise,
    update_log,
    remove_log,
    remove_all_logs,
    remove_all_user_logs,
    remove_all_user_logs_for_exercise
}