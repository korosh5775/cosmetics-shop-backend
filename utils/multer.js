// Import necessary modules
// ------------------------------------------------
const multer = require("multer"); // Library for file uploading

// Define storage destination for saving images
// ------------------------------------------------
const storage = multer.diskStorage({
  // Destination storage
  destination: "./public/images/", // Save images to the `public/images` directory

  // Create random file name for images
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname); // Generate a random file name for each image
  },
});

// Set a limit for file size
// ------------------------------------------------
const limits = { fileSize: 1000000 }; // Files larger than 1 MB cannot be uploaded

// Set file format filter
// ------------------------------------------------
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true); // Only JPEG and PNG formats can be uploaded
  } else {
    cb(new Error("you can use jpeg and png images formats"), false); // Return an error for other formats
  }
};

// Collect all functions in multer as options
// ------------------------------------------------
const imageUpload = multer({
  storage,
  limits,
  fileFilter,
});

// Export multer
// ------------------------------------------------
module.exports = imageUpload;
