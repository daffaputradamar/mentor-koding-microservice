const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const verifyToken = require("../config/verifyToken");

router.post("/api/login", (req, res) => {
  const loginUser = {
    username: req.body.username,
    password: req.body.password
  };

  User.findOne({
    username: loginUser.username
  }).then(user => {
    if (!user) {
      return res.sendStatus(403);
    }
    bcrypt.compare(loginUser.password, user.password).then(isMatch => {
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
          "mentorkodingpw",
          { expiresIn: '1d' },
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
  jwt.verify(req.token, "mentorkodingpw", (err, authData) => {
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
