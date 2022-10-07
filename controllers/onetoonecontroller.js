const Customer = require('../models/onetoone/Customer');
const Identifier = require('../models/onetoone/Identifier');
const asyncHandler = require('../middleware/async');

const oneToOne = asyncHandler(async (req, res, next) => {
  const createCustomer = function (name, age, gender) {
    const customer = new Customer({
      name,
      age,
      gender,
    });

    return customer.save();
  };

  const createIdentifier = function (cardCode, customer) {
    const identifier = new Identifier({
      cardCode,
      customer,
    });

    return identifier.save();
  };
  createCustomer('asad', 24, 'male')
    .then((customer) => {
      console.log(customer);
      const customerId = customer._id.toString();
      return createIdentifier(
        customerId.substring(0, 10).toUpperCase(),
        customerId
      );
    })
    .then((identifier) => {
      console.log();
      console.log(identifier);
      res.status(200).json({
        customer: identifier.customer,
        identifier: identifier,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = { oneToOne };
