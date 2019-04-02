const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findByUsername,
  findById,
  findByDepartment
};

function find() {
  return db("users").select("id", "username", "password");
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}
function findByDepartment(department) {
  return db("users").where({ department });
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
