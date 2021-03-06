exports.up = knex =>
  knex.schema.createTable("records", tbl => {
    tbl
      .string("rid")
      .primary()
      .unique()
      .notNullable();
    tbl
      .string("uid")
      .references("uid")
      .inTable("users")
      .notNullable();
    tbl
      .string("eid")
      .references("eid")
      .inTable("exercises")
      .notNullable();
    tbl.string("duration");
    tbl.string("repetitions");
    tbl.string("distance");
    tbl.string("heart_rate");
    tbl.string("weight");
    tbl.string("calories");
    tbl.string("dateTime");
    tbl.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists("records")