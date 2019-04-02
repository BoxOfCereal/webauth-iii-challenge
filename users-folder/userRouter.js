const express = require("express");
const router = express.Router();
const users = require("./usersModel");

router.get("/", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
