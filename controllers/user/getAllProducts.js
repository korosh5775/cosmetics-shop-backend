//import modules
const Products = require("../../models/productsSchema");
const ProductsCategories = require("../../models/productsCategory");

const getAllProducts = async (req, res, next) => {
  try {
    const getAllProductsCategories = await ProductsCategories.find();

    const mappingFanction = async (category) => {
      const products = await Products.find({ category: category._id })
        .limit(5)
        .lean()
      return {
        ...category,
        products, 
      }; //*end of return
    }; //*end of categories and products function block

    const categoriesWithFiveProducts = getAllProductsCategories.map(mappingFanction);
    const getAllCategoriesWithFiveProducts = await Promise.all(categoriesWithFiveProducts);
    res.json(getAllCategoriesWithFiveProducts)
  } catch (err) {
    next(err);
  } //*end of try catch block
};

//export module
module.exports = getAllProducts;
