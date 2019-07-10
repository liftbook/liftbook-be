//IMPORTS
//local
const db = require('../../data/config')

//MODELS
//create
const add_user = async user => {
    await db('users').insert(user)
    return get_user_by({uid: user.uid})
}
//request(?)
const get_all_users = async () =>
    await db('users')
//takes an object {uid: 13337}
const get_user_by = async value =>
    await db('users').where(value).first()

//EXPORT
module.exports = {
    add_user,
    get_all_users,
    get_user_by,
}