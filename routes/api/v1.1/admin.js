// Import modules
const express = require("express");

// Import modules - middlewares
const ImageUpload = require("../../../utils/multer");
const authenticated = require("../../../middlewares/authorization");
const isAdmin = require("../../../middlewares/isAdmin");

// Import modules - products
const newCategory = require("../../../controllers/admin/categories/newCategory");
const newProduct = require("../../../controllers/admin/products/newProduct");
const removeProduct = require("../../../controllers/admin/products/removeProduct");
const removeCategory = require("../../../controllers/admin/categories/removeCategory");
const updateProduct = require("../../../controllers/admin/products/updateProduct");

//.................................................................................................................

//*get router from express
const router = express.Router();

//*handle http methods for admin controller
router.post("/categories", authenticated, isAdmin, newCategory);
router.post(
  "/product",
  ImageUpload.single("image"),
  authenticated,
  isAdmin,
  newProduct
);
router.delete("/remove/:productId", authenticated, isAdmin, removeProduct);
router.delete("/remove/:categoryId", authenticated, isAdmin, removeCategory);
router.patch(
  "/update/:productId",
  ImageUpload.single("image"),
  authenticated,
  isAdmin,
  updateProduct
);

//................................................................................................................

//exports router
module.exports = router;
