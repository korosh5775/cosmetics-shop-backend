//import modules
const Cart = require("../../models/cartSchema");
const Product = require("../../models/productsSchema");

const newCart = async (req, res, next) => {
  try {
    const { items } = req.body;
    const userId = req.userId; // get user Id from req object that sent from token (authorization method);

    // check if the user ID is found.
    if (!userId) {
      const err = new Error("Please login first");
      err.statusCode = 401; // not authenticated
      throw err; // throw error to catch
    }

    //find user's cart from database by userId
    let cart = await Cart.findOne({ user: userId });

    // checking the stock before adding items to the cart
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        const err = new Error(`Product with ID ${item.product} not found`);
        err.statusCode = 404;//* not found
        throw err;
      }
      //* checks that the ordered goods are not more than the ones in the database.
      if (item.quantity > product.quantity) {
        const err = new Error(`Not enough stock for ${product.name}`);
        err.statusCode = 400; //* bad request
        throw err;
      }
      
    }

    // if user already had a cart...
    if (cart) {
      // checks if the new item added to the shopping cart was already available or not.
      items.forEach((newItem) => {
        let existingItem = cart.items.find(
          (cartItem) => cartItem.product.toString() === newItem.product // comparison after converting ObjectId to String
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          // if similar product is not found, add the new item to the cart
          cart.items.push(newItem);
        }
      });
    } else {
      // if the shopping cart was empty, create a new cart with the items
      cart = new Cart({
        user: userId,
        items,
      });
    }

    // save new or updated cart to database
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    next(error); // Make sure to handle the thrown errors in your error handling middleware
  }
};

//export new cart
module.exports = newCart;