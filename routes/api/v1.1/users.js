// Import moduls
const express = require("express");

// Import modules - middlewares
const validated = require("../../../middlewares/validator");
const authenticated = require("../../../middlewares/authorization");

// Import modules - authorization
const register = require("../../../controllers/user/userAuth/register");
const login = require("../../../controllers/user/userAuth/login");
const forgetPassword = require("../../../controllers/user/userAuth/forgetPassword");
const changePassword = require("../../../controllers/user/userAuth/changePassword");

// Import modules - products
const batchedProducts = require("../../../controllers/user/products/getBatchOfProduct");
const allProducts = require("../../../controllers/user/products/getAllProducts");

//Import modules - order
const newCart = require("../../../controllers/user/cart/newCart");
const newOrder = require("../../../controllers/user/order/newOrder"); 

//.........................................................................................................

//*get router from express
const router = express.Router();

//*handle http methods for user authorization
router.post("/auth/register", validated, register);
router.post("/auth/login", login);
router.post("/auth/forget_password", forgetPassword);
router.post("/auth/change_password/:token", changePassword);

//*handle http methods for product's datas
router.get("/BatchedProducts/:categoryId", batchedProducts);
router.get("/allProducts", allProducts); //*this will be main page in frontend

//*handle http methods for handle orders
router.post("/addToCart", authenticated, newCart);
router.post("/addToOrder", authenticated, newOrder);

//............................................................................................................

//*export router
module.exports = router;
