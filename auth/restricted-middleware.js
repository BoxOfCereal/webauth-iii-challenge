require("dotenv").config();
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
  jwt.sign(payload, secret, options);
}
