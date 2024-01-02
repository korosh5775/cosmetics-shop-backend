// Import modules
const Order = require('../../../models/orderSchema');
const Cart = require('../../../models/cartSchema');
const Product = require('../../../models/productsSchema');
const OffCode = require('../../../models/offCodeSchema');
const { pqcontrol } = require('../../../utils/pQControler');

const newOrder = async (req, res, next) => {
  try {
    // Extracting required fields from request body
    const { userName, location, phone, offCode } = req.body;

    // userID is coming from request, assumed to be set from an authorization middleware
    const userId = req.userId;
    
    // Throw error if user is not logged in (i.e., no userID found)
    if (!userId) {
      const err = new Error('Please login first');
      err.statusCode = 401; // Unauthorized
      throw err;
    }

    // Find user's cart and populate products details
    const cart = await Cart.findOne({ user: userId }).populate('items.product').lean();

    // Check if the cart exists
    if (!cart) {
      const err = new Error('You have no cart');
      err.statusCode = 404; // Not found
      throw err;
    }
    
    // Obtain cart ID
    const cartId = cart._id;
    
    // Checking if offCode provided exists
    const existCode = await OffCode.findOne({ code: offCode }).lean();
    if (!existCode) {
      const err = new Error('Off code not found');
      err.statusCode = 404; // Not found
      throw err;
    }

    // List of valid products for the offCode
    const validProducts = existCode.items.map(item => item.product.toString());

    // Initialize total price
    let totalPrice = 0;

    // Loop through cart items
    for (let item of cart.items) {
      // Fetch current product details
      const product = await Product.findById(item.product).lean();

      if (!product) {
        // Handle error if the product doesn't exist anymore
        const err = new Error(`Product not found`);
        err.statusCode = 404; // Not found
        throw err;
      }

      const productIdString = item.product._id.toString();

      // Calculate total price considering offCode validity
      if (!validProducts.includes(productIdString)) {
        totalPrice += product.price * item.quantity;
      } else {
        // Apply offCode discount if product is valid
        const discount = existCode.percent / 100 * product.price;
        totalPrice += (product.price - discount) * item.quantity;
      }
    }

    // Create new order instance
    const order = new Order({
      user: userId,
      userName,
      location,
      phone,
      cart: cartId,
      totalPrice,
      offCode,
    });

    // Decrease the quantity of products
    await pqcontrol(cart);

    // Save new order to database
    await order.save();

    // Remove user's cart as the order is confirmed
    await Cart.deleteMany({ _id: cartId });

    // Return successful response
    res.status(200).json({ message: 'Order saved and cart has been removed', order });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
};

// Export the newOrder function so it can be used in other parts of the application
module.exports = newOrder;
