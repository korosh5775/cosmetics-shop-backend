// Import the Joi validation library
// ------------------------------------------------
const Joi = require("joi");
// Define the user validation schema
// ------------------------------------------------
const userValidation = Joi.object({
  fullName: Joi.string()
    .min(4)
    .max(64)
    .required()
    .pattern(new RegExp("^[A-Za-z\\s]+$")) //*use english letters and no blank space accepted
    .trim(),
    
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required()
    .trim(),

  userName: Joi.string().alphanum().min(4).max(64).required().trim().pattern(new RegExp("^[A-Za-z1-9]+$")),

  password: Joi.string()
    .min(8)
    /*Use of lowercase English letters,
          use of uppercase English letters,
          use of numbers,
          use of special characters
          No blank spaces are accepted.*/
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])(?!.*\s).{8,}$/
      )
    )
    .required(),
});

// Define the validated middleware function
// ------------------------------------------------
const validated = async (req, res, next) => {
  try {
    // Validate the user data against the schema
    // ------------------------------------------------
    const { error } = await userValidation.validateAsync(req.body, {
      abortEarly: false,
    }); //* "abortEarly : false"=> It makes the program not stop after the first error and all input data is checked first.

    
   // Handle validation errors
   // ------------------------------------------------
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      const err = new Error(errorMessage);
      err.statusCode = 400;
      throw err;
    }

   // Proceed to the next middleware/route if validation passes
   // ------------------------------------------------
    next();
  } catch (error) {
    // Pass errors to error handling middleware
    // ------------------------------------------------
    next(error);
  }
};

// Export the validated middleware
// ------------------------------------------------
module.exports = validated;
