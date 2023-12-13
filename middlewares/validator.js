const Joi = require("joi");
const User = require("../models/usersSchema");

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
    .trim()
    .external(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        const error = new Error("this email is exists");
        error.statusCode = 400;
        throw error;
      }
    }),

  userName: Joi.string()
    .alphanum()
    .min(4)
    .max(64)
    .required()
    .trim()
    .external(async (value) => {
      const user = await User.findOne({ userName: value });
      if (user) {
        const error = new Error("this userName is exists");
        error.statusCode = 400;
        throw error;
      }
    }),

  password: Joi.string()
    .min(8)
    /*Use of lowercase English letters,
          use of uppercase English letters,
          use of numbers,
          use of special characters
          No blank spaces are accepted.
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+-=])(?!.*\\s)$"
          )
        )*/
    .required(),
});
const validated = async(req, res, next) => {
  try {
    const { error } =await userValidation.validateAsync(req.body, {
      abortEarly: false,
    }); //* "abortEarly : false"=> It makes the program not stop after the first error and all input data is checked first.

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      const error = new Error(errorMessage);
      error.statusCode = 400;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validated;
