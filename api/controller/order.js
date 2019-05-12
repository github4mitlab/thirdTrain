const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/products');

exports.orders_get_all = (req, res) => {
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
};


exports.orders_create_order = (req, res) => {
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
};


exports.orders_get_order = (req, res) => {
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
 };


exports.orders_delete_order =  (req, res) => {
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
};
