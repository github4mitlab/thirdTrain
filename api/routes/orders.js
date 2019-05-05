const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/products');

// order에 대한 전체 데이터 불러와서 뿌려주기
router.get('/', (req, res) => {
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

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;
    if (id !== '1234') {
        res.status(200).json({
            orders_message: "잘못된 아이디"
        });
    } else {
        res.status(200).json({
            orders_message: "정확한 아이디",
            id : id
        });

    }

});


// Order Register
// root: /orders/


router.post('/', (req, res) => {
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

router.put('/', (req, res) => {
    res.status(200).json({
        message: "PUT / orders.js"
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        message: "DELETE / orders.js"
    });
});

module.exports = router;

