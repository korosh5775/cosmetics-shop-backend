// Import modules
const express = require("express");

// Import modules - middlewares
const ImageUpload = require("../../../utils/multer");
const authenticated = require("../../../middlewares/authorization");
const isAdmin = require("../../../middlewares/isAdmin");

// Import modules - products
const newProduct = require("../../../controllers/admin/products/newProduct");
const removeProduct = require("../../../controllers/admin/products/removeProduct");
const updateProduct = require("../../../controllers/admin/products/updateProduct");

// Import modules - categories
const getAllCategories = require('../../../controllers/admin/categories/getAllCategories');
const newCategory = require("../../../controllers/admin/categories/newCategory");
const updateCategory = require('../../../controllers/admin/categories/updateCategory');
const removeCategory = require("../../../controllers/admin/categories/removeCategory");

//.................................................................................................................

//*get router from express
const router = express.Router();


//*handle http methods for admin controller - categories
router.get("/categories/fetch-data", authenticated, isAdmin, getAllCategories)
router.post("/categories/new", authenticated, isAdmin, newCategory);
router.patch("/categories/update/:categoryId", authenticated, isAdmin, updateCategory);
router.delete("/categories/remove/:categoryId", authenticated, isAdmin, removeCategory);

//*handle http methods for admin controller - products
router.post(
  "/products/new",
  ImageUpload.single("image"),
  authenticated,
  isAdmin,
  newProduct
);
router.patch(
  "/products/update/:productId",
  ImageUpload.single("image"),
  authenticated,
  isAdmin,
  updateProduct
);
router.delete("/products/remove/:productId", authenticated, isAdmin, removeProduct);


//................................................................................................................

//exports router
module.exports = router;
