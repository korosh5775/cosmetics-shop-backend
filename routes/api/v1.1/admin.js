//import modules
const express = require('express');
const ImageUpload = require("../../../utils/multer")
const authenticated = require('../../../middlewares/authorization');
const newCategory = require("../../../controllers/admin/newCategory");
const newProduct = require('../../../controllers/admin/newProduct');

//*get router from express
const router = express.Router();

//*handle http methods for admin controller
router.post("/categories",authenticated, newCategory);
router.post("/product",authenticated,ImageUpload.single("image"), newProduct);

 //exports router
module.exports = router;