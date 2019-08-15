var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName: String,
    quantity: Number,
    price: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('products',productSchema)