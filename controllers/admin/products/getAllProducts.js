//import modules
const Product = require("../../../models/productsSchema");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    //* checking product availability on the server.
    if (!products) {
      const err = new Error("there is no product");
      err.statusCode = 404; //* not found
      throw err;
    }
    //* send product details by json
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllProducts;
