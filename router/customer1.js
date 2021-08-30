const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const router = express.router();

// createSchema

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 10 },
  phone: { type: String, required: true },
  isGold: boolean,
});

//create Model
const Customer = mongoose.model("Customer", customerSchema);

//validate
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().required().min(2).max(10),
    phone: Joi.string().required(),
  };
  return Joi.validate(customer, schema);
}

//get,post,put,delete

//get
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

//get id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Cannot find this customer... ");
  res.send(customer);
});

//post
router.post("/", async (req, res) => {
  //Validate
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).rend(error.details[0].message);

  // new customer
  let customer = Customer({ name: req.body.name }, { phone: req.body.phone });
  customer = await Customer.save();

  res.send(customer);
});

//put
router.put("/:id", (req, res) => {
  Customer.findByIdAndUpdate(req.body.id);
});
