const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const server = express();
server.use(express.json());
server.use(cors());

const userRoutes = require("./users-folder/userRoutes");
server.use("/api/users", userRoutes);
const authRoutes = require("./auth/authRouter");
server.use("/api/auth", authRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "please use API endpoints" });
});

module.exports = server;
