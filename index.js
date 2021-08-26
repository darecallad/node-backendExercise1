const express = require("express");
const mongoose = require("mongoose");
const home = require("./router/home");
const customer = require("./router/home");
const app = express();

//connect to MongoDB
mongoose
  .connect("mongodb://localhost/customerAPI")
  .then(() => console.log("Connect to Mongodb"))
  .catch((ex) => console.log("Cannot connect to Mongodb...", ex));

// post use
app.use(express.json());
app.use("/api/customer", customer);
app.use("/", home);

// set prot environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}... `));
