const mongoose = require("mongoose");
const Joi = require("joi");
// Create Schema
const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  phone: {
    type: String,
    required: true,
  },
});

// create model
const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).max(10).required(),
    phone: Joi.string().min(1).max(20).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
