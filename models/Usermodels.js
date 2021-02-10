const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: Number, required: true},
    role: {type: String, required: true},
    name: String,
    address: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;