// Import necessary modules
// ------------------------------------------------
const express = require("express");

// Import middlewares
// ------------------------------------------------
const validated = require("../../../middlewares/validator"); // Data validation middleware
const authenticated = require("../../../middlewares/authorization"); // Authentication middleware

// Import controllers for user authorization
// ------------------------------------------------
const register = require("../../../controllers/user/userAuth/register");
const login = require("../../../controllers/user/userAuth/login");
const forgetPassword = require("../../../controllers/user/userAuth/forgetPassword");
const changePassword = require("../../../controllers/user/userAuth/changePassword");

// Import controllers for products
// ------------------------------------------------
const getProduct = require("../../../controllers/user/products/getProduct");
const batchedProducts = require("../../../controllers/user/products/getBatchOfProduct");
const allProducts = require("../../../controllers/user/products/getOneAllProducts");

// Import controllers for orders
// ------------------------------------------------
const newCart = require("../../../controllers/user/cart/newCart");
const newOrder = require("../../../controllers/user/order/newOrder");
const getOrders = require("../../../controllers/user/order/getOrders");

// Import controllers for comments
// ------------------------------------------------
const newComments = require('../../../controllers/user/comments/newComment');

//? ...........................................................................................................

// Create an Express router
// ------------------------------------------------
const router = express.Router();

//? ...........................................................................................................

// Define routes for user authorization
// ------------------------------------------------
router.post("/auth/register", validated, register); // Register a new user
router.post("/auth/login", login); // Log in a user
router.post("/auth/forget_password", forgetPassword); // Handle forgotten passwords
router.post("/auth/change_password/:token", changePassword); // Change a user's password

// Define routes for product data
// ------------------------------------------------
router.get("/product/:productId", getProduct); // Get a specific product
router.get("/batched-products/:categoryId", batchedProducts); // Get a batch of products by category
router.get("/all-products", allProducts); // Get all products (used for the main page)

// Define routes for handling orders
// ------------------------------------------------
router.post("/add-to-cart", authenticated, newCart); // Add a product to the cart
router.post("/add-to-order", authenticated, newOrder); // Create a new order
router.get("/get-orders", authenticated, getOrders); // Get a user's orders


// Define routes for comments
// ------------------------------------------------
router.post("/new-comments/:productId", authenticated, newComments); // Add a new comment

// Export the router
// ------------------------------------------------
module.exports = router;
