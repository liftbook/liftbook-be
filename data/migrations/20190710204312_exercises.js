exports.up = knex =>
  knex.schema.createTable("exercises", tbl => {
    tbl
      .string("eid")
      .primary()
      .unique()
      .notNullable();
    tbl
      .string("created_by")
      .references("uid")
      .inTable("users")
      .notNullable();
    tbl
      .string("updated_by")
      .references("uid")
      .inTable("users")
      .notNullable();
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.string("weight_lifted").notNullable();
    tbl.string("repetitions");
    tbl.string("body_part");
    tbl.string("date");
    tbl.string("icon_src");
    tbl.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists("exercises");
