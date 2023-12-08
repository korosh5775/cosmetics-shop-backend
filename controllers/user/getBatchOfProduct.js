//import moduls
const Products = require("../../models/productsSchema");

const getBatchOfProduct = async (req, res, next) => {
  try {
  const { categoryId } = req.params;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; 

    const options = {
      page,
      limit,
      sort: { _id: -1 }, 
      lean: true,
    };
    const allBatchedProducts = await Products.paginate({ category: categoryId }, options);
    res.json(allBatchedProducts);
  
  } catch (err) {
    next(err);
  } //*end of try catch block
};
//export module
module.exports = getBatchOfProduct;