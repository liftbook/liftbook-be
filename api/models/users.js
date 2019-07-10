//IMPORTS
const knex = require('knex')
const db = require('../../data/config')

//SETUP
//tables
const tblUsers = db('users')

//MODELS
//create
const add_user = async user => {
    await tblUsers.insert(user)
    return get_user_by({uid: user.uid})
}
//request(?)
const get_all_users = async () =>
    await tblUsers
//takes an object {uid: 13337}
const get_user_by = async value =>
    await db('users').where(value).first()

//EXPORT
module.exports = {
    add_user,
    get_all_users,
    get_user_by,
}