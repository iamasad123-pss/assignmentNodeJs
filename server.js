const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const colors = require('colors');
const session = require('express-session');

const connect = require('./config/db');

const facebookAuthRoute = require('./controllers/facebookauthcontroller');
const googleAuthRoute = require('./controllers/googleauthcontroller');
const razorPayRoute = require('./routes/razorpay');
const WordToPdfRoute = require('./routes/wordPdfConvert');
const oneToOneRoute = require('./routes/oneToOne');
const oneToManyRoute = require('./routes/onetomany');
const manyToManyRoute = require('./routes/manttomany');

dotenv.config({ path: './config/config.env' });

connect.connectDB();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/api/v1/user/', facebookAuthRoute);
app.use('/api/v1/user/', googleAuthRoute);
app.use('/api/v1/razor/', razorPayRoute);
app.use('/api/v1/convert/', WordToPdfRoute);
app.use('/api/v1/db/', oneToOneRoute);
app.use('/api/v1/db/', oneToManyRoute);
app.use('/api/v1/db/', manyToManyRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.yellow.underline);
});

module.exports = app;
