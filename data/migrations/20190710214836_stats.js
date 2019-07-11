exports.up = knex =>
  knex.schema.createTable("stats", tbl => {
    tbl
      .string("sid")
      .primary()
      .unique()
      .notNullable();
    tbl
      .string("uid")
      .references("uid")
      .inTable("users")
      .notNullable();
    tbl.string("hitpoints");
    tbl.string("stamina");
    tbl.string("endurance");
    tbl.string("mana");
    tbl.string("experience");
    tbl.integer("level");
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists("stats")
