exports.seed = function(knex) {
  return knex("users").insert([
    { name: "bob", age: 21 },
    { name: "sam", age: 25 },
    { name: "eve", age: 28 }
  ]);
};
