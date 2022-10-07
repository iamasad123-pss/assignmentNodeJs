const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
};

function close() {
  return mongoose.disconnect();
}

module.exports = { connectDB, close };
