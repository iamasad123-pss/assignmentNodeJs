const mongoose = require('mongoose');
const schema = mongoose.Schema;

const WordToPdfConverter = new schema({
  file: {
    data: Buffer,
  },
});

const WordToPdf = mongoose.model('WordToPdf', WordToPdfConverter);
module.exports = { WordToPdf };
