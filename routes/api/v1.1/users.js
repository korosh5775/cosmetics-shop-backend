// Import Models
const express = require("express");
const register = require("../../../controllers/userAuth/register");
const login = require("../../../controllers/userAuth/login");
const forgetPassword = require("../../../controllers/userAuth/forgetPassword");
const changePassword = require("../../../controllers/userAuth/changePassword");

//*get router from express
const router = express.Router();

//*handle http methods
router.post("/register", register)
router.post("/login", login)
router.post("/forget_password", forgetPassword)
router.post("/change_password/:token", changePassword)

//*export router
module.exports = router;
