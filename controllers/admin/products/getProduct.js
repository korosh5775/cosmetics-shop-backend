//import modules
const Product = require("../../../models/productsSchema");

const getProduct = async (req, res, next) => {
  try {
    //*getting product id from params
    const { productId } = req.params;
    const product = await Product.findById({ productId });
    //* checking product availability on the server.
    if (!product) {
      const err = new Error("there is no product");
      err.statusCode = 404; //* not found
      throw err;
    }
    //* send product details by json
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
module.exports = getProduct;
