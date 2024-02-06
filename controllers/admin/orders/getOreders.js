const Orders = require('../../../models/orderSchema');

const getOrders = async (req, res, next)=>{
    try {
        const orders = await Orders.find();
        if(!orders){
            const err = new Error("there is no orders");
            err.statusCode = 404; // not found
            throw err;
        }
        res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
}
module.exports = getOrders;