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
    // req.token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmMxNzBhNDI4NWVjYjUxMzhhODEzODAiLCJ1c2VybmFtZSI6IkFrdSIsIm5hbWUiOiJEYWZmYSIsInByb2ZpbGVQaWMiOiJkYWZmYS5qcGciLCJlbWFpbCI6ImRhZmZhQGRhZmZhLmNvbSIsImlzTWVudG9yIjpmYWxzZSwiaWF0IjoxNTM5NDI5NTAzLCJleHAiOjE1Mzk1MTU5MDN9.2t8FF-SISg1zH1j76GRqRjfeI5ApJj2UZ_m9mX_g0x0";
    req.token = "";
    next();
  }
}

module.exports = verifyToken;
