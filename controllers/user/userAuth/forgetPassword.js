// Import necessary modules
// ------------------------------------------------
const User = require("../../../models/usersSchema");
const emailSender = require("../../../utils/emailSender");
const jwt = require("jsonwebtoken");

// Define the forgetPassword function
// ------------------------------------------------
const forgetPassword = async (req, res, next) => {
 try {
   // Extract the email from the request body
   // ------------------------------------------------
   const { email } = req.body;

   // Find the user with the provided email
   // ------------------------------------------------
   const user = await User.findOne({ email });

   // Handle user not found
   // ------------------------------------------------
   if (!user) {
     const err = new Error("User with this email was not found");
     err.statusCode = 404; // Not Found status code
     throw err; // Throw the error for handling
   }

   // Generate a JWT token with user ID and email, expiring in 1 hour
   // ------------------------------------------------
   const token = await jwt.sign(
     { userId: user._id, email: user.email },
     process.env.JWT_SECRET,
     { expiresIn: "1h" }
   );

   // Construct the password reset link with the token
   // ------------------------------------------------
   const changePasswordUrl = `http://localhost:8000/user/change_password/${token}`;

   // Send an email with the password reset link
   // ------------------------------------------------
   emailSender(
     email,
     "تغییر رمز عبور",
     `جهت تغییر رمز عبور روی لینک زیر کلیک کنید \n ${changePasswordUrl} \n این لینک تا یک ساعت دیگر معتبر است.`
   );

   // Send a success response to the client
   // ------------------------------------------------
   res.status(200).json({ message: "Go to your email to recover your password" });
 } catch (err) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(err);
 }
};

// Export the forgetPassword function
// ------------------------------------------------
module.exports = forgetPassword;
