//import moduls
const User = require("../../models/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//handle login............................................................................................
const login = async (req, res, next) => {
    try {
      const { email, password } = req.body; //*get email and password from database
  
      //*checking user is exist or not
      const userCheck = await User.findOne({ email });
      if (!userCheck) {
        const err = new Error("ایمیل یا پسورد اشتباه است");
        err.statusCode = 404;
        throw err;
      } 
  
      //*check entered password is equal to user's password or not
      const passwordCheck = await bcrypt.compare(password, userCheck.password);
  
      if (passwordCheck) {
        //* the user informations for token payload
        const user = {
          userId: userCheck._id.toString(),
          email: userCheck.email,
          userName: userCheck.userName,
        };
  
        //*create token signature
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12h" });
        res.status(200).json(token);
      } else {
        //* if password is not true
        const err = new Error("ایمیل یا پسورد اشتباه است");
        err.statusCode = 422;
        throw err;
      }
    } catch (err) {
      next(err);
    }
  };

  //*export module
  module.exports = login;
  //end of login.............................................................................................
  