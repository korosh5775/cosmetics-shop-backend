// Import Modules
const Products = require("../../../models/productsSchema");

const newProduct = async (req, res, next) => {
  try {
    //* destructuring the product details from request body
    const { name, price, description,quantity, category } = req.body;
    //* constructing image file path with the uploaded filename from the request
    const image = `${req.file.filename}`;

    //* creating a new instance of the Products model with the received data
    const newProduct = new Products({
      name,
      price,
      description,
      quantity,
      image,
      category,
    });

    //* saving the new product to the database
    const savedProduct = await newProduct.save();

    //* responding with a JSON containing the saved product data
    res.status(201).json(savedProduct);
  } catch (error) {
    //* passing any errors to the next middleware for error handling
    next(error);
  }
};

// exports newProduct
module.exports = newProduct;