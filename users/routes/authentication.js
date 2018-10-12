const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const verifyToken = require("../config/verifyToken");

router.post("/api/login", (req, res) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({
    email: loginUser.email
  }).then(user => {
    if (!user) {
      return res.sendStatus(403);
    }
    bycript.compare(loginUser.password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign(
          {
            _id: user._id,
            username: user.username,
            name: user.name,
            profilePic: user.profilePic,
            email: user.email,
            isMentor: user.isMentor
          },
          "secret",
          (err, token) => {
            res.json({
              token
            });
          }
        );
      } else {
        res.sendStatus(404);
      }
    });
  });
});

router.get("/cekAuth", verifyToken, (req, res) => {
  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Success",
        authData
      });
    }
  });
});

module.exports = router;
