const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const lastIndex = file.originalname.lastIndexOf(".");
    cb(null, `${Date.now()}.${file.originalname.slice(lastIndex + 1)}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
