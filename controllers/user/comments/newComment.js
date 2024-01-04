// import modules
const Comments = require("../../../models/commentsSchema");
const Oredr = require('../../../models/orderSchema');

const newComment = async (req, res, next) => {
  try {
    const { comment, rate } = req.body;
    const { productId } = req.params;
    const user = req.userId;
    const productExists = await Product.findById(productId);
    if (!productExists) {
      const err = new Error("the product dos not fount");
      err.statusCode = 404; //* not found
      throw err;
    }

    const userHasPurchased = await Order.findOne({
        user: userId,
        'items.product': productId
      });
  
      if (!userHasPurchased) {
        return res.status(403).json({ message: 'شما نمی‌توانید برای محصولی که خریداری نکرده‌اید نظر دهید.' });
      }
    const newComment = new Comments({
      user,
      product: productId,
      comment,
      rate,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

//export new comment
module.exports = newComment;
