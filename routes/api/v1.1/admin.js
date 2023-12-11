//import modules
const express = require('express');
const ImageUpload = require("../../../utils/multer")
const authenticated = require('../../../middlewares/authorization');
const newCategory = require("../../../controllers/admin/newCategory");
const newProduct = require('../../../controllers/admin/newProduct');
const removeProduct = require("../../../controllers/admin/removeProduct")

//*get router from express
const router = express.Router();

//*handle http methods for admin controller
router.post("/categories",authenticated, newCategory);
router.post("/product",ImageUpload.single("image"), newProduct);
router.delete("/remove/:productId", removeProduct);

 //exports router
module.exports = router;