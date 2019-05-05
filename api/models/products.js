// Making Data Schema

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    price: { type: String, required: true}
});

module.exports = mongoose.model("product", productsSchema);

