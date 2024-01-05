// Import necessary modules
// ------------------------------------------------
const express = require("express");

// Import middlewares
// ------------------------------------------------
const ImageUpload = require("../../../utils/multer"); // Image upload handling
const authenticated = require("../../../middlewares/authorization"); // Authentication middleware
const isAdmin = require("../../../middlewares/isAdmin"); // Admin authorization middleware

// Import controllers for products
// ------------------------------------------------
const newProduct = require("../../../controllers/admin/products/newProduct");
const removeProduct = require("../../../controllers/admin/products/removeProduct");
const updateProduct = require("../../../controllers/admin/products/updateProduct");

// Import controllers for categories
// ------------------------------------------------
const getAllCategories = require("../../../controllers/admin/categories/getAllCategories");
const newCategory = require("../../../controllers/admin/categories/newCategory");
const updateCategory = require("../../../controllers/admin/categories/updateCategory");
const removeCategory = require("../../../controllers/admin/categories/removeCategory");

// Import controllers for orders
// ------------------------------------------------
const newOffCode = require("../../../controllers/admin/orders/offCodes");

//? ......................................................................................................

// Create an Express router
// ------------------------------------------------
const router = express.Router();

//? ......................................................................................................

// Define routes for admin categories
// ------------------------------------------------
router.get("/categories/fetch-data", authenticated, isAdmin, getAllCategories); // Get all categories
router.post("/categories/new", newCategory); // Create a new category
router.patch("/categories/update/:categoryId", authenticated, isAdmin, updateCategory); // Update a category
router.delete("/categories/remove/:categoryId", authenticated, isAdmin, removeCategory); // Delete a category

// Define routes for admin products
// ------------------------------------------------
router.post(
  "/products/new",
  ImageUpload.single("image"), // Handle image upload
  newProduct
); // Create a new product
router.patch(
  "/products/update/:productId",
  ImageUpload.single("image"), // Handle image upload
  authenticated,
  isAdmin,
  updateProduct
); // Update a product
router.delete("/products/remove/:productId", authenticated, isAdmin, removeProduct); // Delete a product

// Define routes for admin orders
// ------------------------------------------------
router.post("/orders/new-off-code", newOffCode); // Create a new discount code

// Export the router
// ------------------------------------------------
module.exports = router;
