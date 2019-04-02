const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ message: "please use API endpoints" });
});

module.exports = server;
