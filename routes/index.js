// Import modules
const express = require("express");

//*get router from express
const router = express.Router();

//*versions of users
const usersV_1_1 = require("./api/v1.1/users");
router.use("/v1.1/users", usersV_1_1);

//*versions of admin
const adminV1_1 = require('./api/v1.1/admin');
router.use("/v1.1/admin",adminV1_1);

//*export router
module.exports = router;