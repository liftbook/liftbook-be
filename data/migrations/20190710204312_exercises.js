
exports.up = (knex) =>
    knex.schema.createTable('exercises', tbl => {
        tbl.string('eid')
        .primary()
        .unique()
        .notNullable()
        tbl.string('uid')
        .references("uid")
        .inTable("users")
        .notNullable()
        tbl.string('name')
        .unique()
        .notNullable()
        tbl.string('description')
        .notNullable()
        tbl.string('icon_src')
        tbl.timestamps(true, true)
    })
exports.down = function(knex) {
  knex.schema.dropTableIfExists('exercises')
};
