const mongoose = require('mongoose');

const Comment = mongoose.model(
  'Comment',
  new mongoose.Schema({
    comment: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  })
);

module.exports = Comment;
