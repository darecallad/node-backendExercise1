const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

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

//router, get, push, put, delete /:id

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).max(10).required(),
    phone: Joi.string().min(1).max(20).required(),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
}
//Router.get
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

//get by ID
router.get("/:id", async (req, res) => {
  // find iD
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Cannot find the customer...");

  //send the customer data back
  res.send(customer);
});

//router.post
router.post("/", async (req, res) => {
  //validate
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //new customer
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

//router put
router.put("/:id", async (req, res) => {
  //Validate
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer) return res.status(404).send("cannot find customer....");
  res.send(customer);
});

//router.delete
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("Cannot find the customer");

  res.send(customer);
});

module.exports = router;
