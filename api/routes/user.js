const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = require("../models/user");

// Register User
// 아래의 '/singup 이라는 코드는 users 경로에 추가적으로 서브 경로를 만든 것이다.
router.post("/signup", (req, res) => {
  // 기존의 메일 있는지 여부 체크
  userModel
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          usr_msg: "메일이 있습니다."
        });
      } else {
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
      }
    })
    .catch
    (
         // 추후 직접 구현
    );
});

// 사용자 계정 삭제 
router.delete('/:userId', (req, res) => {
    userModel.remove({ _id : req.params.userId})
        .exec()
        .then( result => {
            res.status(200).json({
                usr_msg: "사용자 삭제되었음"
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                usr_err: "삭제중에 오류 발생"
            });
        });
});

module.exports = router;
