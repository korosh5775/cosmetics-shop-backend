// Import Modules
const Products = require("../../models/productsSchema");

const getBatchOfProduct = async (req, res, next) => {
  try {
  const { categoryId } = req.params;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10; //*Total products placed on each page

    const options = {
      page,
      limit,
      sort: { _id: -1 }, //*Sorting products from the newest to the oldest product
      lean: true,//*optimize query by converting MongoDB documents to plain javaScript objects
    };
    //*find and pagination products with their category
    const allBatchedProducts = await Products.paginate({ category: categoryId }, options);
    //*send products to user with json
    res.json(allBatchedProducts.docs);//* sending only the products without pagination data
  
  } catch (err) {
    next(err);
  } //*end of try catch block
};
//export module
module.exports = getBatchOfProduct;