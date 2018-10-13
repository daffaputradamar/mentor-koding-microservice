const jwt = require("jsonwebtoken");

async function passRequest({ req }) {
  //   const authData = await jwt.verify(req.token, "mentorkodingpw");
  return {
    token: req.token
    // authData
  };
}

module.exports = passRequest;
