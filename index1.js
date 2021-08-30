const express = require("express");
const mongoose = require("mongoose");
const customer1 = require("./router/customer1");
const app = express();

// app use
app.use(express.json());
app.use("/api/customer1", customer1);
// connect to database
mongoose
  .connect("mongodb://localhost/cAPI")
  .then(() => console.log("connect to MongoDB"))
  .catch((ex) => console.error("cannot connect to MongoDB...", ex));

//setting port environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on ${port}...`));
