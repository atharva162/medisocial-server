const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    creator: {type: Number, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;