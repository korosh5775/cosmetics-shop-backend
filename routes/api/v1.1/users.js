// Import modules
const express = require("express");
const register = require("../../../controllers/userAuth/register");
const login = require("../../../controllers/userAuth/login");
const forgetPassword = require("../../../controllers/userAuth/forgetPassword");
const changePassword = require("../../../controllers/userAuth/changePassword");

const batchedProducts = require("../../../controllers/user/getBatchOfProduct");
const allProducts = require("../../../controllers/user/getAllProducts");

//*get router from express
const router = express.Router();

//*handle http methods for user authorization
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forget_password", forgetPassword);
router.post("/auth/change_password/:token", changePassword);

//*handle http methods for product's datas
router.get("/BatchedProducts", batchedProducts);
router.get("/allProducts", allProducts);//*this will be main page in frontend

//*export router
module.exports = router;
