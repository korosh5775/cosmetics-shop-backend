// Import Models
const multer = require("multer");

//define the storage destination for saving images
const storage = multer.diskStorage({
  //destination storage
  destination: "./public/images/",

  //create random file name for images
  filename: (req, file, cb) => {
    cb(null, file.filename + "_" + Date.now() + file.originalname);
  },
});

//set a limit for file size
const limits = { fileSize: 1000000 }; //*files up to 1mb can not upload

//set file format filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true); //*just jpeg and png formats can upload
  } else {
    cb(new Error("لطفا فقط از فرمت های jpeg و png استفاده کنید!"), false);
  }
};

//collect all functions in multer as options
const imageUpload = multer({
  storage,
  limits,
  fileFilter,
});

//export multer
module.exports = imageUpload;
