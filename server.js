//import moduls
const express = require("express");
const indexRoutes = require("./routes/index");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./utils/connection");

//*initialize app by express
const app = express();

//*use body parser to working with data by json
app.use(bodyParser.json());
//*call all http methodes
app.use("/", indexRoutes);

//*config port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
