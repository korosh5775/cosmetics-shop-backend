//import moduls
const Cart = require("../../models/cartSchema");
const jwt = require('jsonwebtoken');

const newCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    const userId = req.userId;//* get user Id from req object that sent from token(authorization method);

    //* check if the user ID is found.
    if(!userId){
      const err = new Error("please login first");
      err.statusCode = 403; //*forbiden
      throw err; //*throw error to catch
    }

    //*find user's cart from database by userId
    let cart = await Cart.findOne({ user: userId });

    //* it is checked whether the user already had items in the shopping cart or not.
    if (cart) {
      //* checks if the new item added to the shopping cart was already available or not.
      //* this operation is performed using a forEach loop, in which all the products in the shopping cart are compared with the new product.
      items.forEach((item) => {
        const existingItem = cart.items.find(
          (ci) => ci.product.toString() === item.product //*we used .toString to change objectId to String
        );
        //* if a similar product is found, the number of the new order will be adjusted to the number of the previous order of the product.
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          //* if a similar product is not found, add the new order to other orders
          cart.items.push(item);
        }
      });
    } else {
      //* if the shopping cart was empty
      cart = new Cart({
        user: userId,
        items,
      });
    }
    //* save new cart to database
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    next(error);
  }
};
//export new cart
module.exports = newCart;
