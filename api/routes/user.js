const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = require("../models/user");

// Register User
// 아래의 '/singup 이라는 코드는 users 경로에 추가적으로 서브 경로를 만든 것이다.
router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        usr_msg: err
      });
    } else {
      const user = new userModel({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });

      console.log(user);

      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: "User created"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

module.exports = router;
