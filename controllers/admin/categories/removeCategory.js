// Import modules
const Category = require("../../../models/categorySchema");

const removeCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);

    //* check if category doesn't exists
    if (!category) {
      const err = new Error("There is no category to remove.");
      err.statusCode = 404; //* not found
      throw err;
    }
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json("category removed.");
  } catch (err) {
    next(err);
  }
};

// Export removecategory
module.exports = removeCategory;
