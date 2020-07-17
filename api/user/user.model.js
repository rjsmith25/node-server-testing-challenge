const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = { find, insert, findById, remove };
