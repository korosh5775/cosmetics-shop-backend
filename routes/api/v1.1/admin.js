//import modules
const express = require('express');
const ImageUpload = require("../../../utils/multer")
const authenticated = require('../../../middlewares/authorization');
const isAdmin = require('../../../middlewares/isAdmin');
const newCategory = require("../../../controllers/admin/newCategory");
const newProduct = require('../../../controllers/admin/newProduct');
const removeProduct = require("../../../controllers/admin/removeProduct")
const updateProduct = require("../../../controllers/admin/updateProduct")

//*get router from express
const router = express.Router();

//*handle http methods for admin controller
router.post("/categories",authenticated,isAdmin, newCategory);
router.post("/product",ImageUpload.single("image"),authenticated, isAdmin, newProduct);
router.delete("/remove/:productId",authenticated,isAdmin, removeProduct);
router.patch("/update/:productId",ImageUpload.single("image"),authenticated,isAdmin, updateProduct);

 //exports router
module.exports = router;