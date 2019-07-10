/*
USER SCHEMA
-uid (user id) - primary, unqiue, required, set by uuid on create user
-username - unique, required
-password - required, mininum 8 characters
-email - unique, required
-first name - required
-last name - required
-avatar img source - optional
-timestamps - automatic
*/
exports.up = (knex) =>
    knex.schema.createTable('users', tbl => {
        tbl.string('uid')
            .primary()
            .unique()
            .notNullable()
        tbl.string('password', 8)
            .notNullable()
        tbl.string('username')
            .unique()
            .notNullable()
        tbl.string('first_name')
            .notNullable()
        tbl.string('last_name')
            .notNullable()
        tbl.string('email')
            .unique()
            .notNullable()
        tbl.string('avatar_src')
        tbl.timestamps(true, true)
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('users')