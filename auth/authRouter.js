require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const users = require("../users-folder/usersModel");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secret";

function generateToken(user) {
  //construct a payload
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  //add options
  const options = {
    expiresIn: "1d"
  };

  //generate a token with based on the payload the secret and the options
  return jwt.sign(payload, secret, options);
}

router.post("/register", (req, res) => {
  //get credentials off body
  let user = req.body;
  console.log(user);
  //hash the password
  const salt = 10;
  const hash = bcrypt.hashSync(user.password, salt);
  //set user password to the hash
  user.password = hash;

  // add the user to the database
  users
    .add(user)
    .then(u => {
      // realistically you would want to return a token here
      const token = generateToken(user);
      res.status(201).json({ message: `created user`, token });
    })
    .catch(error => {
      if (error.errno === 19) {
        res.status(422);
      } else {
        res.status(500).json({ error });
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  users
    .findByUsername(username)
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome ${user.username}`, token });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
