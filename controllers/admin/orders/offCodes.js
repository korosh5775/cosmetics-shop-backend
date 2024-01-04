//import modules
const OffCode = require("../../../models/offCodeSchema");

const createOffCode = async (req, res, next) => {
  try {
    const { code, items, percent, startDate, expireDate } = req.body;

    //* Check if code already exists
    const existingOffCode = await OffCode.findOne({ code });
    if (existingOffCode) {
      const err = new Error("OffCode already exists.");
      err.statusCode = 409; //*conflict
      throw err;
    }

    //* Check if percent is within 0-100 range
    if (percent < 0 && percent > 100) {
      const err = new Error("Invalid discount percent.");
      err.statusCode = 400; //* bad request
      throw err;
    }

    //* Check for expiration date validity
    if (new Date(expireDate) < new Date()) {
      const err = new Error("Invalid expiration date.");
      err.statusCode = 400; //* bad request
      throw err;
    }

    //* Check for start date validity
    if (new Date(startDate) <= new Date()) {
      const err = new Error("The start date cannot be in the past.");
      err.statusCode = 422; //* unprocessable Entity
      throw err;
    }

    //* Check for the expiration date is after the start date
    if (new Date(expireDate) <= new Date(startDate)) {
      const err = new Error(
        "The expiration date must be after the start date."
      );
      err.statusCode = 422; //* unprocessable Entity
      throw err;
    }

    //* Check for at least one item
    if (items && items.length === 0) {
      const err = new Error("No products associated with the offcode.");
      err.statusCode = 400; //* bad request
      throw err;
    }

    //* Creating a new offcode
    const newOffCode = new OffCode({
      code,
      items,
      percent,
      startDate: new Date(startDate),
      expireDate: new Date(expireDate),
    });

    //* Save the new offcode to the database
    const savedOffCode = await newOffCode.save();

    //* Successfully created the offcode
    return res.status(201).json(savedOffCode);
  } catch (error) {
    next(error);
  }
};
 //export create off code
 module.exports = createOffCode;