exports.up = knex =>
  knex.schema.createTable("exercises", tbl => {
    tbl
      .string("eid")
      .primary()
      .unique()
      .notNullable()
    tbl.string('created_by')
      .references('uid')
      .inTable('users')
      .notNullable()
    tbl.string('updated_by')
      .references('uid')
      .inTable('users')
      .notNullable()
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.string("description").notNullable();
    tbl.string("icon_src");
    tbl.timestamps(true, true);
  })

exports.down = (knex) =>
  knex.schema.dropTableIfExists("exercises")