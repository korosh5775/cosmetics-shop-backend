//import modulies
const Orders = require('../../../models/orderSchema');

const getOrders = async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    const err = new Error("please login first");
    err.statusCode = 401; //*not authenticated
    throw err; //*throw error to catch
  }
  const orders = Orders.find({user: userId});

  if (!orders) {
    const err = new Error("there is no order to show");
    err.statusCode = 404; //*not found
    throw err; //*throw error to catch
  }

  res.status(200).json(orders);
};

module.exports = getOrders;
