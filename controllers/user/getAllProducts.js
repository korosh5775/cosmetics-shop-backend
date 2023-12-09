// Import Models
const Products = require("../../models/productsSchema");
const ProductsCategories = require("../../models/productsCategory");

const getAllProducts = async (req, res, next) => {
  try {
    const getAllProductsCategories = await ProductsCategories.find();

    /* Separate the products of each category by the ID of the categories and
    display only 5 products from each category and 
    return the products that are grouped according to their category.
    this function returns a promise. */
    const mappingFunction = async (category) => {
      const products = await Products.find({ category: category._id })
        .limit(5)
        .lean();// optimize query by converting MongoDB documents to plain javaScript objects

      return {
        ...category._doc,
        products,
      };
    };

     /* Receive each of the elements of the category array and
     merge each with 5 examples of products related to that category */
    const categoriesWithFiveProducts =
      getAllProductsCategories.map(mappingFunction);

      /* waiting for Fulfillment all the promises
       made in the previous function and return a promise.
       With await, the app waits for this promise to be resolved and if this promise is resolved,
       the data we need will be returned as we want.
       */
    const getAllCategoriesWithFiveProducts = await Promise.all(
      categoriesWithFiveProducts
    );

    //*send categuries with their products  to user by json
    res.json(getAllCategoriesWithFiveProducts);
  } catch (err) {
    next(err);
  }
};

// Export getAllProducts
module.exports = getAllProducts;
