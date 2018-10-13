function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    //TOKEN FORMAT
    //Authorization: Bearer <access token>
    //split at the space
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
