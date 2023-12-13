// Import Modules
const User = require("../../models/usersSchema");
const emailSender = require("../../utils/emailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//handle register..........................................................................................
const register = async (req, res, next) => {
  try {
    const { fullName, email, userName, password } = req.body; //*get email, userName and pssword from user

    const hashedPassword = await bcrypt.hash(password, 12); //*hash password for security
    //*finding user by email and user name to validate datas
    const emailCheck = await User.findOne({ email: email });
    const userNameCheck = await User.findOne({ userName: userName });

    //* Checking if email or username already exists.
    if (emailCheck || userNameCheck) {
      var message;
      if (emailCheck && !userNameCheck) {
        message = "Another user with this email was found";
      } else if (userNameCheck && !emailCheck) {
        message = "Another user with this user name was found";
      } else {
        message = "Another user with this profile was found";
      }
      const error = new Error(message);
      error.statusCode = 409 //*conflict to another user
      throw error;
    }

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
  } catch (error) {
    next(error);
  }
};

//*export registerHandler
module.exports = register;

//end of register.........................................................................................
