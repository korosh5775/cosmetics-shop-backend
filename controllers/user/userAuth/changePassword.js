// Import Modules
const User = require("../../../models/usersSchema");
const emailSender = require("../../../utils/emailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//handle change password.........................................................................................
const changePassword = async (req, res, next) => {
  try {
    const token = req.params.token; //*get token from params

    const dToken = jwt.verify(token, process.env.JWT_SECRET); //*decode token by jwt key

    if (!dToken) {
      //*if token was fake
      const err = new Error("شما مجوز انجام این کار را ندارید");
      err.statusCode = 401;
      throw err;
    }

    //*get userId from token payload and find user from database
    const user = await User.findOne({ _id: dToken.userId });
    if (!user) {
      //*if user dos not exist in the database
      const err = new Error("شما محوز انجام این کار را ندارید");
      err.statusCode = 401;
      throw err;
    }

    //*get new password from user and hash it to more security
    const newPassword = await bcrypt.hash(req.body.password, 12);

    //*set new password for user
    user.password = newPassword;
    await user.save();

    //*send successfully email to user
    emailSender(
      dToken.email,
      "تغییرات در پروفایل",
      "کاربر گرامی رمز عبور شما با موفقیت تغییر یافت"
    );
    res.status(200).json({ message: "رمز عبور جدید با موفقیت ثبت شد" });
  } catch (err) {
    next(err);
  }
};

//end of change password...........................................................................................

//*export change password
module.exports = changePassword;

