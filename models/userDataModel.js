var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    email: String,
    password: String
});

var userData = mongoose.model('userData', userDataSchema);

module.exports = userData;
