// Import necessary modules
// ------------------------------------------------
const User = require("../../../models/usersSchema");
const emailSender = require("../../../utils/emailSender");
const bcrypt = require("bcryptjs");

// Define the register function
// ------------------------------------------------
const register = async (req, res, next) => {
 try {
   // Extract user information from the request body
   // ------------------------------------------------
   const { fullName, email, userName, password } = req.body;

   // Hash the password for security
   // ------------------------------------------------
   const hashedPassword = await bcrypt.hash(password, 12);

   // Check for existing users with the same email or username
   // ------------------------------------------------
   const emailCheck = await User.findOne({ email: email });
   const userNameCheck = await User.findOne({ userName: userName });

   // Handle conflicts with existing users
   // ------------------------------------------------
   if (emailCheck || userNameCheck) {
     let message;
     if (emailCheck && !userNameCheck) {
       message = "Another user with this email was found";
     } else if (userNameCheck && !emailCheck) {
       message = "Another user with this username was found";
     } else {
       message = "Another user with this profile was found";
     }
     const error = new Error(message);
     error.statusCode = 409; // Conflict status code
     throw error;
   }

   // Create a new user object
   // ------------------------------------------------
   const user = new User({
     fullName,
     email,
     userName,
     password: hashedPassword,
   });

   // Save the user to the database
   // ------------------------------------------------
   const newUser = await user.save();

   // Send a welcome email to the user
   // ------------------------------------------------
   emailSender(
     email,
     "خوش آمدید",
     `${fullName} عزیز به اپلیکیشن خودت خوش آمدی. ثبت نام شما با موفقیت انجام شد.`
   );

   // Send a success response with the new user data
   // ------------------------------------------------
   res.status(201).json(newUser);
 } catch (error) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(error);
 }
};

// Export the register function
// ------------------------------------------------
module.exports = register;
