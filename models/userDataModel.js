var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var userDataSchema = new Schema({
//     info:{
//         firstName: String,
//         lastName: String,
//         phone: String,
//         address: String,
//         email: String,
//         password: String
//     },
//     progressNumbers:{
//         drive: Number,
//         chat: Number,
//         math: Number,
//         charge: Number
//     }
// });

var userDataSchema = new Schema({
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        email: String,
        password: String,
        t1: String,
        num: Number,
        progressNumbers:{
        drive: Number,
        chat: Number,
        math: Number,
        charge: Number
    }
});

var userData = mongoose.model('userData', userDataSchema);

module.exports = userData;
