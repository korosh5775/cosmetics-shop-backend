//Import modules
const Order = require("../../models/orderSchema");
const Cart = require("../../models/cartSchema");
const Product = require("../../models/productsSchema");
const {pqcontrol} = require('../../utils/productQuantityControler');

const newOrder = async (req, res, next) => {
  try {
    const { userName, location, phone, offCode } = req.body;
    const userId = req.userId; //* get user Id from req object that sent from token(authorization method);
    //* check if the user ID is found.
    if (!userId) {
      const err = new Error("please login first");
      err.statusCode = 401; //*not authenticated
      throw err; //*throw error to catch
    }
    //*finding user's cart and get products details by populate methode
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    //* checking for existing cart
    if (!cart) {
      const err = new Error("you have not any cart");
      err.statusCode = 404; //*not found
      throw err; //*throw error to catch
    }
    //* get cart id
    const cartId = cart._id;

    //* set default total price number
    let totalPrice = 0;

    //* loop through items in the cart
    for (let item of cart.items) {
      //* fetch the product to get the current price
      const product = await Product.findById(item.product._id);

      if (!product) {
        //* handle error if the product doesn't exist anymore
        const err = new Error(`${item.product.name} not found`);
        err.statusCode = 404; //*not found
        throw err;
      }

      //* calculate total price
      totalPrice += product.price * item.quantity;
    }
    //*creating new order
    const order = new Order({
      user: userId,
      userName,
      location,
      phone,
      cart: cartId,
      totalPrice,
      offCode,
    });

    //*decrease the quantity of products after created new order
    //*and it will checks that the quantity of the ordered product is not more than the stock
    await pqcontrol(cart);

    //*saving new order in database
    await order.save();
    
    //*remove cart after created new order
    await Cart.deleteMany({ _id: cartId });
    
    //*sending successfully message
    res
      .status(200)
      .json({ message: "order saved and cart has been reoved", order });
  } catch (error) {
    next(error);
  }
};
//export newOrder
module.exports = newOrder;
