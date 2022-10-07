const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const razorpayOrder = (req, res, next) => {
  var options = {
    amount: req.body.amount,
    currency: 'INR',
    receipt: 'rcp1',
  };
  instance.orders.create(options, function (err, order) {
    res.status(200).json({
      order,
    });
  });
};

module.exports = { razorpayOrder };
