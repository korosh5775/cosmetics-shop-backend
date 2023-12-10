// Import modules
const express = require("express");

//*get router from express
const router = express.Router();

//*versions of userAuth
const userAuthV_1_1 = require("./api/v1.1/users");
router.use("/userAuth/v1.1", userAuthV_1_1);

//*export router
module.exports = router;