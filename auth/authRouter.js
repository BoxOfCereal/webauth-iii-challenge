const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const users = require("../users-folder/usersModel");

server.post("/register", (req, res) => {
  //get credentials off body
  let user = req.body;
  //hash the password
  const salt = 10;
  const hash = bcrypt.hashSync(user.password, salt);
  //set user password to the hash
  user.password = hash;

  // add the user to the database
  users
    .add(user)
    .then(u => {
      res.status(201).json({ message: `created user`, u });
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
