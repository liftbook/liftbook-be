//IMPORTS
const knex = require('knex')
const db = require('../../data/config')

//SETUP
//tables
const tblUsers = db('users')

//EXPORT
module.exports = {
    add_user,
    get_all_users,
    get_user_by,
}

//MODELS
//create
const add_user = async user => {
    await tblUsers.insert(user)
    return null
    // await get_user_by({id})
}
//request(?)
const get_all_users = async () =>
    await tblUsers
//takes an object {id: 13337}
const get_user_by = async value =>
    await tblUsers.first().where(value)