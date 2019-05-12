const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const orderModel = require('../models/order');
const productModel = require('../models/products');

// order에 대한 전체 데이터 불러와서 뿌려주기
router.get('/', checkAuth, (req, res) => {
    orderModel.find()
        .select("product quantity _id")
        .exec()
        .then( docs => {
            res.status(200).json({
                count: docs.length,
                order: docs.map( doc => {
                    return{
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    }
                })

            });
        })
        .catch( err => {
            res.status(500).json({
                ord_msg: err
            });
        });
});

// 상세 주문 정보 조회
router.get('/:orderId', checkAuth, (req, res) => {
   const id = req.params.orderId;
   orderModel.findById(id)
    .exec()
    .then( order => {
        if(!order){
            return res.status(400).json({
                ord_err: "Order Num Not Found"
            });
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: "http://localhost:3000/orders"
            }
        });
    })
    .catch( err => {
        res.status(500).json({
            ord_err: err
        })
    });
});


// Order Register
// root: /orders/


router.post('/', checkAuth, (req, res) => {
    productModel.findById(req.body.productId)
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const order = new orderModel({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Order stored",
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: "GET",
                url: "http://localhost:3000/orders/" + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    // productModel
    //     .findById(req.body.productId)
    //     .then( product => {
    //         // 제품이 없는 경우 처리
    //         if(!product) {
    //             return res.status(404).json({
    //                 ord_msg: "Product Not Found."
    //             });
    //         }

    //         //제품이 있는 경우
    //         const order = new orderModel({
    //             _id: mongoose.Types.ObjectId(),
    //             product: req.body.productId,
    //             quantity: req.body.quantity
    //         });
    //         return order.save();
    //     })
    //     .then( result => {
    //         console.log(result);
    //         res.status(201).json({
    //             ord_msg:"Order Stored",
    //             createdOrder: {
    //                 _id: result._id,
    //                 product: result.product,
    //                 quantity:result.quantity
    //             },
    //             request: {
    //                 type: 'GET',
    //                 url: "http://localshot:3000/orders/" + result._id
    //             }
    //         });
    //     })
    //     .catch( err => {
    //         console.log(err);
    //         res.status(500).json({
    //             ord_err: err
    //         });
    //     });
});

router.put('/', checkAuth, (req, res) => {
    res.status(200).json({
        message: "PUT / orders.js"
    });
});

router.delete('/:orderId', checkAuth,  (req, res) => {
    orderModel.remove({ _id: req.params.orderId })
        .exec()
        .then( result => {
            res.status(200).json({
                ord_msg: "Order Info Deleted!!",
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: "ID", quantity: "Number"}
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                ord_err: err
            });
        });
});

module.exports = router;

