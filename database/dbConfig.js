const environment = process.env.ENVIRONMENT || "development";
const config = require("../knexfile.js")[environment];
module.exports = require("knex")(config);

//same thing
// const knex = require("knex");
// const knexConfig = require("../knexfile.js");

// module.exports = knex(knexConfig.development);
