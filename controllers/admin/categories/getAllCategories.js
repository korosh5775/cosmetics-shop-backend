// Import Modules
const Category = require('../../../models/categorySchema');

//get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error)
  }
};
//export moduls
module.exports = getCategories;