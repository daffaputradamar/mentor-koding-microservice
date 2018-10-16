function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    req.token = "";
    // req.token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmM1ZWRiMWI4ZDg2NzM1ZThlMzdlYjYiLCJpYXQiOjE1Mzk2OTgxMDMsImV4cCI6MTUzOTc4NDUwM30.Q07BzUkTyNVgj5-hbZ4FoYLR0URM9Lm6df-EEEsgEZ0";
    next();
  }
}

module.exports = verifyToken;
