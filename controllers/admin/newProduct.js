// Import Modules
const Products = require("../../models/productsSchema");

const newProduct = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;
    const image = `productImages/${req.file.filename}`;

    const newProduct = new Products({
      name,
      price,
      description,
      image,
      category,
    });

    const savedProduct = await newProduct.save();

    res.json(savedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = newProduct;
