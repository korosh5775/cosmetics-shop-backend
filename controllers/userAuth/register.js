//import modules
const User = require("../../models/usersSchema");
const emailSender = require("../../utils/emailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//handle register..........................................................................................
const register = async (req, res, next) => {
  try {
    const { fullName, email, userName, password } = req.body; //*get email, userName and pssword from user

    const hashedPassword = await bcrypt.hash(password, 12); //*hash password for security

    //*checking user is exist or not
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      const err = new Error("این ایمیل از قبل موجود است");
      err.statusCode = 422;
      throw err;
    } else {
      //*create new user
      const user = new User({
        fullName,
        email,
        userName,
        password: hashedPassword,
      });
      //*save created user in database
      const newUser = await user.save();

      //*send successfully register message to user by email
      emailSender(
        email,
        "خوش آمدید",
        `${fullName}عزیز به اپلیکیشن خودت خوش آمدی.ثبت نام شما با موفقیت انجام شد.`
      );

      res.status(201).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

//*export module
module.exports = register;

//end of register.........................................................................................
