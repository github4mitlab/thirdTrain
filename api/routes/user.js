const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userModel = require("../models/user");

const userController = require('../controller/user');


// Register User
// 아래의 '/singup 이라는 코드는 users 경로에 추가적으로 서브 경로를 만든 것이다.
router.post("/signup", userController.user_signup);

// 로그인 구현
router.post('/login', userController.user_login);

// 사용자 계정 삭제 
router.delete('/:userId', userController.user_delete);

module.exports = router;
