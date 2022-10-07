const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
