require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secret";
//authorization middleware, read, decode, verify
module.exports = (req, res, next) => {
  //read/decode
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        // verification error possibly tampering, or expired that
        console.log(error);
        res.status(403).json({ message: "unauthorized" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "unauthorized" });
  }
};
