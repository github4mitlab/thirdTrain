const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userModel = require("../models/user");


exports.user_get_all;

exports.user_signup = (req, res) => {
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
  };

exports.user_login = (req, res) => {
    userModel.find({ email : req.body.email })
        .exec()
        .then( user => {
            if (user.length < 1) {
                return res.status(401).json({
                    usr_msg: "인증 실패"
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        usr_msg: "패스워드가 다릅니다."
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email : user[0].email,
                        userId: user[0]._id
                        },
                        "secret", { expiresIn: "1h" }
                    );
                    return res.status(200).json({
                        usr_msg: "인증성공",
                        token : token
                    });
                }
                return res.status(401).json({
                    usr_msg: "에러"
                });
            });
        })
        .catch();
};


exports.user_delete =(req, res) => {
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
};

