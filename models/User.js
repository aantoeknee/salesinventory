var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
}, {
    versionKey: false
})

module.exports = mongoose.model('users',userSchema)