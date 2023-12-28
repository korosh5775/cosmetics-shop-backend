//import core modules and application routes
const express = require("express");            //* importing Express framework
const indexRoutes = require("./routes/index"); // * importing main routes for the application
const bodyParser = require("body-parser");     //* importing body parser middleware to parse request bodies
const deleteExpiredOffCodes = require('./cronJobs');    //* importing delete expired offcodes for remove expired offcodes daily
require("dotenv").config(); //* load environment variables from .env file
require("./utils/connection"); //* establish database connection



//* initialize Express application instance
const app = express();

//* use bodyParser middleware to parse json requests
app.use(bodyParser.json());

///* set up root route
app.use("/", indexRoutes);

deleteExpiredOffCodes();//*this will remove all expired offCodes daily


//* configure the server port
const port = process.env.PORT || 3000; //*use environment variable or default to 3000
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
