// Import modules
const Products = require("../../models/productsSchema");
const fs = require("fs");
const path = require("path");

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, price, description, category } = req.body;
    const product = await Products.findById(productId);

    if (!product) {
      const err = new Error("Product not found.");
      err.statusCode = 404;
      throw err;
    }

    const currentImagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      product.image
    );

    if (req.file && currentImagePath && fs.existsSync(currentImagePath)) {
      fs.unlinkSync(currentImagePath); 
    }

    product.name = name  ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.image = req.file ? req.file.filename : product.image;


    console.log(product)

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Export updateProduct
module.exports = updateProduct;
