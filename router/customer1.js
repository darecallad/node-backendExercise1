const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const router = express.Router();

// Create Schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  phone: { type: String, required: true, minlength: 5 },
  isGold: Boolean,
});

//model
const Customer = mongoose.model("Customer", customerSchema);

//validate
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(2),
    phone: Joi.string().required().min(5),
  };
  return Joi.validate(customer, schema);
}

// get post put delete
// get
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});
//get:id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.param.id);
  if (!customer) return res.status(404).send("cannot find the customer");

  res.send(customer);
});
//post
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send("ERROR");

  let customer = new Customer(
    { name: req.body.name },
    { phone: req.body.phone },
    { isGold: req.body.isGold }
  );
  customer = await customer.save();
  res.send(customer);
});

//put
router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send("ERROR");

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { phone: req.body.phone },
    { isGold: req.body.isGold },
    { new: true }
  );
  if (!customer) return res.status(404).send("Request 404");
  res.send(customer);
});

//delete
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Bad Request");

  res.send(customer);
});

module.exports = router;
