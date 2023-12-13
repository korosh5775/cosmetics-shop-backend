const Joi = require("joi");

const userValidation = Joi.object({
  fullName: Joi.string()
    .min(4)
    .max(64)
    .required()
    .pattern(new RegExp("^[A-Za-z\\s]+$"))
    .trim(),

  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required()
    .trim(),

  userName: Joi.string().alphanum().min(4).max(64).required().trim(),

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
const validated = async (req, res, next) => {
  try {
    const { error } = await userValidation.validateAsync(req.body, {
      abortEarly: false,
    }); //* "abortEarly : false"=> It makes the program not stop after the first error and all input data is checked first.

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      const err = new Error(errorMessage);
      err.statusCode = 400;
      throw err;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validated;
