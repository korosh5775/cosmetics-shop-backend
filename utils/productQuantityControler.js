//this utility created for manage products quantity after creating an order
//and it will use in new order
const Product = require('../models/productsSchema');
exports.pqcontrol = async(cart)=>{
    for (let item of cart.items) {
    //* fetch the product to get the current price
    const product = await Product.findById(item.product._id);

    if (!product) {
      //* handle error if the product doesn't exist anymore
      const err = new Error(`${item.product.name} not found`);
      err.statusCode = 404; //*not found
      throw err;
    }

    //* calculating new product quantity after creating an order
    product.quantity -= item.quantity;

    //* checks that the quantity of the ordered product is not more than the stock
    if (product.quantity < 0) {
        const err = new Error(`Not enough stock for ${item.product.name}`);
        err.statusCode = 400;//*bad request
        throw err;
      }
  
      //* if every things was ok new product with new quantity will be saved in database.
      await product.save();
  }
}

