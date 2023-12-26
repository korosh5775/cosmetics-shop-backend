// Import Modules
const Category = require("../../../models/categorySchema");

const newCategory = async (req, res, next) => {
  try {
    const createCategory = new Category({
      name: req.body.name,
    });
    savedCategory = await createCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};
//export new category
module.exports = newCategory;