// Making Data Schema

const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: String
});

module.exports = mongoose.model("product", productsSchema);

