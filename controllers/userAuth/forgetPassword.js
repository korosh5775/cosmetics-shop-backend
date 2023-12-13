// Import Modules
const User = require("../../models/usersSchema");
const emailSender = require("../../utils/emailSender");
const jwt = require("jsonwebtoken");

//handle forget password...................................................................................
const forgetPassword = async (req, res, next) => {
    try {
      const { email } = req.body; //*get email from user
  
      const user = await User.findOne({ email }); //*checking the database to see if the email exists or not
  
      if (!user) {
        //* if user dos not exist
        const err = new Error("کاربری با این ایمیل یافت نشد.");
        err.statusCode = 404;
        throw err;
      }
  
      //*create a token that carries userId and email gives the user access to change his password and expire link after certain period of time
      const token = await jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      //*putting the token after the change password url
      const change_password = `http://localhost:8000/user/change_password/${token}`;
  
      //*send change password link to user by email
      emailSender(
        email,
        "تغییر رمز عبور",
        `جهت تغییر رمز عبور روی لینک زیر کلیک کنید \n ${change_password} \n این لینک تا یک ساعت دیگر معتبر است.`
      );
  
      res
        .status(200)
        .json({ message: "جهت بازیابی کلمه عبور به ایمیل خود مراجعه کنید" });
    } catch (err) {
      next(err);
    }
  };

  //end of forget password.........................................................................................
  
  //*export forget password
  module.exports = forgetPassword;
  
  