const mongoose = require('mongoose');

const Category = mongoose.model(
  'Category',
  new mongoose.Schema({
    category: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  })
);

module.exports = Category;
