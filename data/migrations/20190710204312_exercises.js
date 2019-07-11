
exports.up = (knex) =>
    knex.schema.createTable('exercises')

exports.down = function(knex) {
  
};
