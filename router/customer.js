const express = require("express");
const { Customer, validate } = require("../customers");
const router = express.Router();

//router, get, push, put, delete /:id

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
  const { error } = validate(req.body);
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
  const { error } = validate(req.body);
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
