const mongoose = require('mongoose');

const Post = mongoose.model(
  'Post',
  new mongoose.Schema({
    title: String,
    author: String,
  })
);

module.exports = Post;
