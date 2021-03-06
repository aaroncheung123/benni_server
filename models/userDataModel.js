var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
        info:{
                firstName: String,
                lastName: String,
                phone: String,
                address: String,
                email: String,
                password: String
        },
        progressNumbers:{
                loved: Number,
                happy: Number
    }
});

var userData = mongoose.model('userData', userDataSchema);

module.exports = userData;
