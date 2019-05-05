const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }

});



// const mongooes = require('mongoose');

// // Add Order Model
// const orderSchema = mongooes.Schema({
//     _id: mongooes.Schema.Types.ObjectId,
//     product: {
//         type: mongooes.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         default: 1
//     }

// });

module.exports = mongoose.model('Order', orderSchema);
