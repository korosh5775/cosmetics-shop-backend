// Import modules
const Category = require("../../../models/categorySchema");
const Products = require('../../../models/productsSchema');
const fs = require("fs");
const path = require("path");

const removeCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    const products = await Products.find({ category: categoryId });

    if (!category) {
      const err = new Error("There is no category to remove.");
      err.statusCode = 404; // not found
      throw err;
    }

    // prepare for deleting all product images
    const deleteProductImages = products.map(product => {
      return new Promise((resolve, reject) => {
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "public",
          "images",
          product.image
        );

        fs.unlink(imagePath, err => {
          if (err) {
            reject(err); // reject the promise if unable to delete the image
          } else {
            resolve(); // resolve the promise if the image is deleted
          }
        });
      });
    });

    // wait for all product images to be deleted
    await Promise.all(deleteProductImages);

    // delete all products
    await Products.deleteMany({ category: categoryId });

    // delete the category
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json("Category and products have been removed.");
  } catch (err) {
    next(err);
  }
};

// Export removecategory
module.exports = removeCategory;



/* // Import modules
const Category = require("../../../models/categorySchema");
const Products = require('../../../models/productsSchema');
const fs = require("fs");
const path = require("path");

const removeCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    const products = await Products.find({category : categoryId})

    //* check if category doesn't exists
    if (!category) {
      const err = new Error("There is no category to remove.");
      err.statusCode = 404; //* not found
      throw err;
    }
    
     //* find image from public folder
     const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      products.image
    );
    fs.unlink(imagePath, async (err) => {
      if (err) {
        next(err); //* forward the error if unable to delete the image
      } else {
        //* if the product image is successfully deleted, the product will be deleted
        await Products.deleteMany(products);//* this will remove all products of the category deleted
        await Category.findByIdAndDelete(categoryId);
      }
    });

    
    res.status(200).json("category and products has been removed.");
  } catch (err) {
    next(err);
  }
};

// Export removecategory
module.exports = removeCategory;
 */