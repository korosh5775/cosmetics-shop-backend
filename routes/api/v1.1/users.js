// Import modules - authorization
const express = require("express");
const validated = require('../../../middlewares/validator');
const register = require("../../../controllers/userAuth/register");
const login = require("../../../controllers/userAuth/login");
const forgetPassword = require("../../../controllers/userAuth/forgetPassword");
const changePassword = require("../../../controllers/userAuth/changePassword");
// Import modules - products
const batchedProducts = require("../../../controllers/user/getBatchOfProduct");
const allProducts = require("../../../controllers/user/getAllProducts");

//*get router from express
const router = express.Router();

//*handle http methods for user authorization
router.post("/auth/register",validated, register);
router.post("/auth/login", login);
router.post("/auth/forget_password", forgetPassword);
router.post("/auth/change_password/:token", changePassword);

//*handle http methods for product's datas
router.get("/BatchedProducts/:categoryId", batchedProducts);
router.get("/allProducts", allProducts);//*this will be main page in frontend

//*export router
module.exports = router;
