// Import modules
const Category = require("../../../models/categorySchema");

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    //*finding the category from database
    const category = await Category.findById( categoryId );

    //* checking if category exists
    if (!category) {
      const err = new Error("there is no category to edit");
      err.statusCode = 404; //* not fount
      throw err;
    }

    //*updating category
    await Category.updateOne({ _id: categoryId }, { $set: { name } });

    //*send successfully message
    res.status(200).json("category has been updated");
  } catch (error) {
    next(error);
  }
};
//export updateCategory
module.exports = updateCategory;
