const express = require("express");
const mongoose = require("mongoose");
const customer1 = require("./router/customer1");
const app = express();

// connect to Database
mongoose
  .connect("mongodb://localhost/api/customer")
  .then(() => console.log("Connect to Database...."))
  .catch((ex) => console.log("cannot connect to Database...", ex));

// app use
app.use(express.json());
app.use("/api/customer", customer1);

//port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on prot ${port}...`));
