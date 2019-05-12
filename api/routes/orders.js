const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const orderModel = require('../models/order');
const productModel = require('../models/products');
const orderController = require('../controller/order');


// order에 대한 전체 데이터 불러와서 뿌려주기
router.get('/', checkAuth, orderController.orders_get_all);

// 상세 주문 정보 조회
router.get('/:orderId', checkAuth, orderController.orders_get_order);


// Order Register
// root: /orders/
router.post('/', checkAuth, orderController.orders_create_order);

router.put('/', checkAuth, (req, res) => {
    res.status(200).json({
        message: "PUT / orders.js"
    });
});

router.delete('/:orderId', checkAuth, orderController.orders_delete_order);

module.exports = router;

