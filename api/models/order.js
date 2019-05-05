const mongooes = require('mongoose');

// Add Order Model
const orderSchema = mongooes.Schema({
    _id: mongooes.Schema.Types.ObjectId,
    product: {
        type: mongooes.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }

});

module.exports = mongooes.model('Order', orderSchema);
