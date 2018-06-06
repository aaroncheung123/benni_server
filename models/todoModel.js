var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    username: String,
    password: String,
    info: String,
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;
