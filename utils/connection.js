// Import Models
const mongoose = require("mongoose");

//create connection
mongoose
  .connect("mongodb://localhost/cosmeticsShop")
  .then(() => {
    console.log("connected to db");
  });
