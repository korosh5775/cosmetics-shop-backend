// Import necessary modules
// ------------------------------------------------
const User = require("../../../models/usersSchema");
const emailSender = require("../../../utils/emailSender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Define the changePassword function
// ------------------------------------------------
const changePassword = async (req, res, next) => {
 try {
   // Extract the token from request parameters
   // ------------------------------------------------
   const token = req.params.token;

   // Decode the token using the JWT secret
   // ------------------------------------------------
   const dToken = jwt.verify(token, process.env.JWT_SECRET);

   // Handle invalid tokens
   // ------------------------------------------------
   if (!dToken) {
     const err = new Error("Invalid token"); // Clearer error message
     err.statusCode = 401; // Unauthorized status code
     throw err; // Throw the error for handling
   }

   // Find the user based on the user ID from the token
   // ------------------------------------------------
   const user = await User.findOne({ _id: dToken.userId });

   // Handle user not found
   // ------------------------------------------------
   if (!user) {
     const err = new Error("User not found"); // Clearer error message
     err.statusCode = 401; // Unauthorized status code
     throw err; // Throw the error for handling
   }

   // Hash the new password for security
   // ------------------------------------------------
   const newPassword = await bcrypt.hash(req.body.password, 12); // Adjust salt rounds as needed

   // Update the user's password in the database
   // ------------------------------------------------
   user.password = newPassword;
   await user.save();

   // Send a confirmation email to the user
   // ------------------------------------------------
   emailSender(dToken.email, "تغییرات در پروفایل", "کاربر گرامی رمز عبور شما با موفقیت تغییر یافت");

   // Send a success response to the client
   // ------------------------------------------------
   res.status(200).json({ message: "Password has been changed" });
 } catch (err) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(err);
 }
};

// Export the changePassword function
// ------------------------------------------------
module.exports = changePassword;
