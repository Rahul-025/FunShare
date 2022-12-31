const path = require("path");
const multer = require("multer");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    const name = file.originalname.split(".")[0];
    const fName = `${name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fName);
  },
});

const upload = multer({
  storage,
  limits: {
    //        1kb     1mb
    fileSize: 1024 * 1024 * 100,
  },
}).single("file");

module.exports = upload;
