// Import modules
const Products = require("../../models/productsSchema");
const fs = require("fs");
const path = require("path");

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, price, description, category } = req.body;
    const image = `${req.file.filename}`;
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


    await Products.updateOne(
      {_id:productId},
      {
        $set: {
          name,
          price,
          description,
          image,
          category,
        },
      },
    );

    res.status(200).json("prodact updated");
  } catch (err) {
    next(err);
  }
};

// Export updateProduct
module.exports = updateProduct;
