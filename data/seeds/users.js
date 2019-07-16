exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          uid: "1",
          username: "test",
          password: "testtest",
          first_name: "test",
          last_name: "test",
          email: "test@test.com"
        }
      ]);
    });
};

